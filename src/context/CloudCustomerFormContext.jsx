import React, { createContext, useState } from "react";

export const CloudCustomerFormContext = createContext();

export function CloudCustomerFormProvider({ children }) {
  const [customerType, setCustomerType] = useState("existing");
  const [selectedExistingCustomer, setSelectedExistingCustomer] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [msCustomerTypes, setMsCustomerTypes] = useState({
    commercial: true,
    education: false,
    government: false,
    nonprofit: false,
  });

  return (
    <CloudCustomerFormContext.Provider
      value={{
        customerType,
        setCustomerType,
        selectedExistingCustomer,
        setSelectedExistingCustomer,
        customerName,
        setCustomerName,
        msCustomerTypes,
        setMsCustomerTypes,
      }}
    >
      {children}
    </CloudCustomerFormContext.Provider>
  );
}
