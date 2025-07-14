import React, { createContext, useState } from "react";

export const FooterNavContext = createContext();

export function FooterNavProvider({ children }) {
  const [canContinue, setCanContinue] = useState(false);
  const [onContinue, setOnContinue] = useState(() => () => {});
  const [showBack, setShowBack] = useState(false);
  const [onBack, setOnBack] = useState(() => () => {});

  return (
    <FooterNavContext.Provider
      value={{
        canContinue,
        setCanContinue,
        onContinue,
        setOnContinue,
        showBack,
        setShowBack,
        onBack,
        setOnBack,
      }}
    >
      {children}
    </FooterNavContext.Provider>
  );
}
