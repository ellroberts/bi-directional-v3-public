import React, { createContext, useContext, useState } from "react";

const DebugContext = createContext();

export const useDebug = () => useContext(DebugContext);

export function DebugProvider({ children }) {
  const [isRedline, setIsRedline] = useState(false); // ✅ Redlines only

  return (
    <DebugContext.Provider value={{ isRedline, setIsRedline }}>
      {children}
    </DebugContext.Provider>
  );
}
