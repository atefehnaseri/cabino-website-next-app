"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationContextProvider({ children }) {
  const [dateRange, setDateRange] = useState(initialState);

  const resetRange = () => setDateRange(initialState);

  return (
    <ReservationContext.Provider
      value={{ dateRange, setDateRange, resetRange }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error("The context must be used in ReservationContext provider");
  return context;
};

export default ReservationContextProvider;
