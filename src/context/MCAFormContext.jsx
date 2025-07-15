import React, { createContext, useState } from "react";

export const MCAFormContext = createContext();

export function MCAFormProvider({ children }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateAgreed, setDateAgreed] = useState("");

  return (
    <MCAFormContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        dateAgreed,
        setDateAgreed,
      }}
    >
      {children}
    </MCAFormContext.Provider>
  );
}
