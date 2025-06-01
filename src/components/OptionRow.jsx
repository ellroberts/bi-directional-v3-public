import React, { useState, useEffect } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash } from "react-icons/fa";

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
    <div className="flex items-center gap-2 my-2">
      <div className="flex gap-2 items-center border px-2 py-1 rounded">
        <button onClick={() => handleUpdate(Math.max(0, qty - 1))}>−</button>
        <span>{qty}</span>
        <button onClick={() => handleUpdate(qty + 1)}>+</button>
      </div>
      <span>£{option.price}</span>
      {current ? (
        <button
          className="w-[64px] ml-auto flex items-center justify-center text-sm px-4 py-2 rounded-md border border-gray-300 bg-white"
          onClick={() => handleUpdate(0)}
          title="Remove"
        >
          <FaTrash className="text-red-500 text-sm" />
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
