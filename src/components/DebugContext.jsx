import React, { createContext, useContext, useState } from "react";

const DebugContext = createContext(false);

export const useDebug = () => useContext(DebugContext);

export function DebugProvider({ children }) {
  const [isDebug, setIsDebug] = useState(false);

  return (
    <DebugContext.Provider value={{ isDebug, setIsDebug }}>
      {children}
    </DebugContext.Provider>
  );
}
