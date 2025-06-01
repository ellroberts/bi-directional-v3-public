import React, { useEffect } from "react";
import { usePlan } from "./PlanContext";
import { useDebug } from "./DebugContext";
import { FaTrash } from "react-icons/fa";

export default function AddonTableRow({ option, index, groupId, isLast }) {
  const { selected, addOrUpdate, remove } = usePlan();
  const { isDebug } = useDebug();
  const current = selected[groupId]?.[option.id];
  const minQty = option.min || 0;
  const qty = current?.qty ?? minQty;

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
    <div className={`flex items-center py-3 text-sm ${!isLast ? "border-b" : ""} ${isDebug ? "debug-border" : ""}`}>
      <div className="w-[72px] px-1">{index + 1}</div>
      <div className="w-[80px] px-1">{option.term}</div>
      <div className="w-[80px] px-1">{option.billing}</div>
      <div className="flex items-center gap-2 flex-grow px-1">
        <div className="flex items-center rounded-md border border-black overflow-hidden text-sm h-[32px]">
          <button
          disabled={qty <= minQty}
          onClick={() => updateQty(qty - 1)}
          className={`px-2 text-sm h-full bg-white ${
          qty <= minQty ? "text-gray-300 cursor-not-allowed" : "text-gray-500"
          }`}
          >
          −
          </button>

          <div className="h-full w-[52px] text-sm border-x border-black font-medium flex items-center justify-center text-center bg-white">{qty}</div>
          <button onClick={() => updateQty(qty + 1)} className="px-2 text-sm text-black h-full bg-white">+</button>
        </div>
        {option.min ? <div className="text-xs text-gray-500 whitespace-nowrap">Min {option.min}</div> : null}
      </div>
      <div className="w-[48px] ml-2 mr-4 text-right px-1">£{option.price}</div>
      <div className="w-[88px] px-1">
        {current ? (
          <button className="w-full h-[32px] flex items-center justify-center text-sm px-2 rounded-md border border-gray-300 bg-white" onClick={() => updateQty(0)} title="Remove">
            <FaTrash className="text-red-500 text-[14px]" />
          </button>
        ) : (
          <button className="w-full h-[32px] text-sm text-white px-2 rounded-md" style={{ backgroundColor: "#A34796" }} onClick={() => updateQty(option.min || 1)}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}
