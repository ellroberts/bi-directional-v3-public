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
    <div className="flex items-center justify-between border p-4 rounded shadow-sm bg-white max-w-xl mb-4">
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{option.name}</h3>
        <p className="text-sm text-gray-600">ID: {option.id}</p>
        <p className="text-sm text-gray-600">Price: £{option.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Min: {option.min}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleUpdate(Math.max(0, qty - 1))}
          className="px-3 py-1 text-sm font-medium bg-gray-200 rounded hover:bg-gray-500"
        >
          –
        </button>
        <span className="px-3 text-sm font-semibold">{qty}</span>
        <button
          onClick={() => handleUpdate(qty + 1)}
          className="px-3 py-1 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
        {qty > 0 && (
          <button
            onClick={() => handleUpdate(0)}
            className="text-red-500 ml-2"
            title="Remove"
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}