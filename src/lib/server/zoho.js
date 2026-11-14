import "server-only";
import { SLOT_MS, formatZohoStartTime } from "@/lib/booking/slots";

/**
 * Minimal Zoho Meeting client (server only). Credentials come from .env, which
 * Next.js loads automatically on the server. Never import this from a client
 * component; `server-only` makes the build fail if that happens.
 */

const REQUIRED_ENV = ["ZOHO_CLIENT_ID", "ZOHO_CLIENT_SECRET", "ZOHO_REFRESH_TOKEN", "ZOHO_DC", "ZOHO_MEETING_ZSOID"];
const TOKEN_SAFETY_MS = 60 * 1000;
const BUSY_TTL_MS = 60 * 1000;
const PAGE_SIZE = 100;
const MAX_PAGES = 20;

export class ZohoError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "ZohoError";
    this.status = status;
    this.code = code;
  }
}

/** Names of required Zoho env vars that are empty or missing. */
export function missingZohoEnv() {
  return REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
}

function dc() {
  const value = process.env.ZOHO_DC.trim().replace(/^\./, "");
  if (!/^[a-z.]+$/i.test(value)) throw new ZohoError("ZOHO_DC is not a valid data-center suffix (e.g. \"in\").");
  return value;
}

const apiBase = () => `https://meeting.zoho.${dc()}/api/v2`;
const zsoid = () => encodeURIComponent(process.env.ZOHO_MEETING_ZSOID.trim());

/** Zoho sometimes answers HTTP 200 with `{ error: ... }`; treat that as a failure. */
function describeZohoError(data) {
  const err = data?.error;
  if (!err) return null;
  if (typeof err === "string") return { message: err };
  return { message: err.message || JSON.stringify(err), code: err.code };
}

async function readJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new ZohoError(`Zoho returned non-JSON (HTTP ${res.status})`, { status: res.status });
  }
}

// ---- Access token (cached in memory; Zoho rate-limits token generation) ----

let tokenCache = null; // { token, expiresAt }
let tokenInflight = null;

async function fetchAccessToken() {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.ZOHO_CLIENT_ID.trim(),
    client_secret: process.env.ZOHO_CLIENT_SECRET.trim(),
    refresh_token: process.env.ZOHO_REFRESH_TOKEN.trim(),
  });
  const res = await fetch(`https://accounts.zoho.${dc()}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const data = await readJson(res);
  const err = describeZohoError(data);
  if (!res.ok || err || !data.access_token) {
    throw new ZohoError(`Zoho token request failed: ${err?.message || `HTTP ${res.status}`}`, { status: res.status });
  }
  const ttlMs = (Number(data.expires_in) || 3600) * 1000;
  tokenCache = { token: data.access_token, expiresAt: Date.now() + ttlMs - TOKEN_SAFETY_MS };
  return tokenCache.token;
}

async function getAccessToken() {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.token;
  // Share one in-flight refresh between concurrent requests.
  tokenInflight ??= fetchAccessToken().finally(() => {
    tokenInflight = null;
  });
  return tokenInflight;
}

async function zohoFetch(path, { method = "GET", body } = {}, retried = false) {
  const token = await getAccessToken();
  const res = await fetch(`${apiBase()}${path}`, {
    method,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (res.status === 401 && !retried) {
    // Cached token was rejected (revoked/expired early): refresh once.
    tokenCache = null;
    return zohoFetch(path, { method, body }, true);
  }
  const data = await readJson(res);
  const err = describeZohoError(data);
  if (!res.ok || err) {
    throw new ZohoError(`Zoho ${method} ${path.split("?")[0]} failed: ${err?.message || `HTTP ${res.status}`}`, {
      status: res.status,
      code: err?.code,
    });
  }
  return data;
}

// ---- Presenter ZUID --------------------------------------------------------

let presenterCache = null;

async function getPresenterZuid() {
  const fromEnv = process.env.ZOHO_PRESENTER_ZUID?.trim();
  if (fromEnv) return Number(fromEnv);
  if (presenterCache) return presenterCache;
  const data = await zohoFetch("/user.json");
  const zuid = Number(data?.userDetails?.zuid);
  if (!zuid) throw new ZohoError("Could not read userDetails.zuid from Zoho /user.json");
  presenterCache = zuid;
  return zuid;
}

// ---- Busy times ------------------------------------------------------------

let busyCache = null; // { ranges, expiresAt }

async function fetchBusyRanges() {
  const ranges = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const index = page * PAGE_SIZE + 1;
    const data = await zohoFetch(`/${zsoid()}/sessions.json?listtype=upcoming&index=${index}&count=${PAGE_SIZE}`);
    const items = Array.isArray(data?.session) ? data.session : [];
    for (const item of items) {
      const start = Number(item.startTimeMillisec);
      const duration = Number(item.duration);
      if (Number.isFinite(start) && Number.isFinite(duration) && duration > 0) {
        ranges.push({ start, end: start + duration });
      }
    }
    if (items.length < PAGE_SIZE) break;
  }
  return ranges;
}

/** Busy [start, end) ranges from upcoming Zoho meetings. Cached 60s unless `fresh`. */
export async function getBusyRanges({ fresh = false } = {}) {
  if (!fresh && busyCache && Date.now() < busyCache.expiresAt) return busyCache.ranges;
  const ranges = await fetchBusyRanges();
  busyCache = { ranges, expiresAt: Date.now() + BUSY_TTL_MS };
  return ranges;
}

export function clearBusyCache() {
  busyCache = null;
}

// ---- Create meeting --------------------------------------------------------

/**
 * Create a 30-minute Zoho meeting. Returns only visitor-safe fields;
 * the host `startLink` is deliberately dropped here.
 */
export async function createMeeting({ topic, agenda, start, email }) {
  const presenter = await getPresenterZuid();
  const data = await zohoFetch(`/${zsoid()}/sessions.json`, {
    method: "POST",
    body: {
      session: {
        topic,
        agenda,
        presenter,
        startTime: formatZohoStartTime(start),
        duration: SLOT_MS,
        timezone: "Asia/Calcutta",
        participants: [{ email }],
      },
    },
  });
  const session = data?.session;
  if (!session?.joinLink) throw new ZohoError("Zoho created no joinLink in its response");
  return {
    joinLink: session.joinLink,
    password: session.pwd || "",
    meetingKey: session.meetingKey ? String(session.meetingKey) : "",
  };
}
