import React, { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [selected, setSelected] = useState({});

  const addOrUpdate = (group, optionId, option) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (!next[group]) next[group] = {};
      next[group][optionId] = option;
      return next;
    });
  };

  const remove = (group, optionId) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[group]) {
        delete next[group][optionId];
        if (Object.keys(next[group]).length === 0) delete next[group];
      }
      return next;
    });
  };

  return (
    <PlanContext.Provider value={{ selected, addOrUpdate, remove }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
