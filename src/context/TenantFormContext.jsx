import React, { createContext, useState } from "react";

export const TenantFormContext = createContext();

export function TenantFormProvider({ children }) {
  const [tenantType, setTenantType] = useState("new"); // "new" or "existing"
  const [domainPrefix, setDomainPrefix] = useState("");
  const [acceptedAffiliation, setAcceptedAffiliation] = useState(false);

  return (
    <TenantFormContext.Provider
      value={{
        tenantType,
        setTenantType,
        domainPrefix,
        setDomainPrefix,
        acceptedAffiliation,
        setAcceptedAffiliation,
      }}
    >
      {children}
    </TenantFormContext.Provider>
  );
}
