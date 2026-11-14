"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import BookingDialog from "./BookingDialog";

const BookingContext = createContext({ openBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

/** Renders the booking popup once for the whole site and exposes `openBooking()`. */
export default function BookingProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const bookedRef = useRef(false);

  const openBooking = useCallback(() => {
    // Start fresh if the previous session ended in a booking.
    if (bookedRef.current) {
      bookedRef.current = false;
      setSessionKey((k) => k + 1);
    }
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog
        key={sessionKey}
        open={open}
        onClose={() => setOpen(false)}
        onBooked={() => {
          bookedRef.current = true;
        }}
      />
    </BookingContext.Provider>
  );
}
