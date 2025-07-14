import React, { createContext, useState } from "react";

export const ResellerFormContext = createContext();

export function ResellerFormProvider({ children }) {
  const [partnerId, setPartnerId] = useState("");

  return (
    <ResellerFormContext.Provider
      value={{
        partnerId,
        setPartnerId,
      }}
    >
      {children}
    </ResellerFormContext.Provider>
  );
}
