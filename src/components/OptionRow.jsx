import React, { useState, useEffect } from "react";
import { usePlan } from "./PlanContext";

export default function OptionRow({ groupId, option }) {
  const { selected, addOrUpdate, remove } = usePlan();
  const current = selected[groupId]?.[option.id];

  const [qty, setQty] = useState(current?.qty || 0);

  useEffect(() => {
    if (!current && qty !== 0) {
      setQty(0);
    } else if (current && current.qty !== qty) {
      setQty(current.qty);
    }
  }, [current]);

  const handleUpdate = (newQty) => {
    setQty(newQty);
    if (newQty > 0) {
      addOrUpdate(groupId, option.id, { ...option, qty: newQty });
    } else {
      remove(groupId, option.id);
    }
  };

  return (
    <div className="flex items-center gap-4 my-2">
      {/* Quantity Controls */}
      <div className="flex gap-2 items-center border px-2 py-1 rounded">
        <button onClick={() => handleUpdate(Math.max(0, qty - 1))}>−</button>
        <span>{qty}</span>
        <button onClick={() => handleUpdate(qty + 1)}>+</button>
      </div>

      {/* Price + Tooltip */}
      <div className="flex items-center gap-1 relative">
        <span>£{option.price}</span>

        {/* Tooltip Wrapper */}
        <div className="group relative">
          <i className="fa-regular fa-circle-info text-gray-400 hover:text-gray-600 cursor-pointer" />

          {option.description && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                            bg-black text-white text-xs rounded px-2 py-1 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                            pointer-events-auto z-50 whitespace-nowrap shadow-lg">
              {option.description}
            </div>
          )}
        </div>
      </div>

      {/* Add or Remove Button */}
      {current ? (
        <button
          className="w-[64px] ml-auto flex items-center justify-center text-sm px-4 py-2 rounded-md border border-gray-300 bg-white"
          onClick={() => handleUpdate(0)}
          title="Remove"
        >
          <i className="fa-solid fa-trash text-red-500 text-sm" />
        </button>
      ) : (
        <button
          className="w-[64px] ml-auto text-sm text-white px-4 py-2 rounded-md"
          style={{ backgroundColor: '#A34796' }}
          onClick={() => handleUpdate(option.min || 1)}
        >
          Add
        </button>
      )}
    </div>
  );
}
