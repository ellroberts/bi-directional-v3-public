import React, { useEffect } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash } from "react-icons/fa";

export default function AddonTableRow({ option, index, groupId, isLast }) {
  const { selected, addOrUpdate, remove } = usePlan();
  const current = selected[groupId]?.[option.id];
  const qty = current?.qty || 0;

  useEffect(() => {
    if (option.min && qty < option.min) {
      addOrUpdate(groupId, option.id, { ...option, qty: option.min });
    }
  }, []);

  const updateQty = (newQty) => {
    if (newQty > 0) {
      addOrUpdate(groupId, option.id, { ...option, qty: newQty });
    } else {
      remove(groupId, option.id);
    }
  };

  return (
    <div className={`grid grid-cols-[60px_120px_120px_1fr_80px_80px] gap-4 items-center py-3 ${!isLast ? 'border-b' : ''}`}>
      <div>{index + 1}</div>
      <div>{option.term}</div>
      <div>{option.billing}</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-black overflow-hidden text-sm h-[32px]">
          <button
            onClick={() => updateQty(Math.max(0, qty - 1))}
            className="px-2 text-sm text-gray-500 h-full"
          >
            −
          </button>
          <div className="h-full w-[52px] text-sm border-x border-black font-medium flex items-center justify-center text-center">
            {qty}
          </div>
          <button
            onClick={() => updateQty(qty + 1)}
            className="px-2 text-sm text-black h-full"
          >
            +
          </button>
        </div>
        {option.min ? (
          <div className="text-xs text-gray-500 whitespace-nowrap">Min {option.min}</div>
        ) : null}
      </div>
      <div className="text-right">£{option.price}</div>
      <div>
        <div className="w-[88px] h-[32px]">
          {current ? (
            <button
              className="w-full h-full flex items-center justify-center text-sm px-2 rounded-md border border-gray-300 bg-white"
              onClick={() => updateQty(0)}
              title="Remove"
            >
              <FaTrash className="text-red-500 text-[14px]" />
            </button>
          ) : (
            <button
              className="w-full h-full text-sm text-white px-2 rounded-md"
              style={{ backgroundColor: '#A34796' }}
              onClick={() => updateQty(option.min || 1)}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
