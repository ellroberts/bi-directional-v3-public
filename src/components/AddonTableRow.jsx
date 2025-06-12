import React, { useEffect, useState } from "react";
import { usePlan } from "./PlanContext";
import {
  FaBookmark,
  FaRegBookmark,
  FaPlus,
  FaCheck,
  FaSyncAlt,
} from "react-icons/fa";

export default function AddonTableRow({ option, index, groupId, isLast, togglePin }) {
  const { selected, addOrUpdate, remove } = usePlan();

  const current = selected[groupId]?.[option.id];
  const minQty = option.min || 0;
  const committedQty = current?.qty ?? null;
  const [inputQty, setInputQty] = useState(committedQty ?? minQty);

  useEffect(() => {
    const fallback = option.min || 0;
    setInputQty(committedQty ?? fallback);
  }, [committedQty, option.min]);

  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  const isValid = isQtyNumber && parsedQty >= minQty;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;

  const handleSave = () => {
    const newQty = parsedQty === 0 && !current ? 1 : parsedQty;
    if (isQtyNumber && newQty >= minQty) {
      addOrUpdate(groupId, option.id, {
        ...option,
        qty: newQty,
      });
    }
  };

  const handleRemove = () => {
    remove(groupId, option.id);
  };

  return (
    <div className="grid grid-cols-6 lg:grid-cols-[64px_110px_90px_1fr_70px_80px] gap-2 px-4 items-center text-sm py-3">
      <div>{index + 1}</div>
      <div>{option.term}</div>
      <div>{option.billing}</div>

      {/* Licence control */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-black overflow-hidden text-sm h-[32px]">
          <button
            disabled={!isQtyNumber || parsedQty <= minQty}
            onClick={() => isQtyNumber && setInputQty(parsedQty - 1)}
            className={`px-2 text-sm h-full bg-white ${
              !isQtyNumber || parsedQty <= minQty
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500"
            }`}
          >
            −
          </button>

          <input
            type="number"
            inputMode="numeric"
            value={inputQty}
            onChange={(e) => setInputQty(e.target.value)}
            className="h-full w-[52px] text-center border-x border-black bg-white text-sm font-medium focus:outline-none
              [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button
            disabled={
              !isQtyNumber ||
              (typeof option.max === "number" && parsedQty >= option.max)
            }
            onClick={() => {
              if (!isQtyNumber) return;
              if (typeof option.max === "number" && parsedQty >= option.max) return;
              setInputQty(parsedQty + 1);
            }}
            className={`px-2 text-sm h-full bg-white ${
              !isQtyNumber ||
              (typeof option.max === "number" && parsedQty >= option.max)
                ? "text-gray-300 cursor-not-allowed"
                : "text-black"
            }`}
          >
            +
          </button>
        </div>

        {(option.min > 0 || option.max > 0) && (
          <div className="text-xs text-gray-500 leading-tight whitespace-nowrap">
            {option.min > 0 && <div>Min {option.min}</div>}
            {option.max > 0 && <div>Max {option.max}</div>}
          </div>
        )}
      </div>

      <div className="text-left">£{option.price}</div>

      <div className="flex gap-2 justify-end">
  {/* Add / Tick / Update */}
  <button
    onClick={current ? (hasChanged ? handleSave : handleRemove) : handleSave}
    disabled={!isValid && !current}
    className={`w-[32px] h-[32px] flex items-center justify-center rounded-md border-2 transition
      ${
        current
          ? hasChanged
            ? "bg-[#A34796] text-white border-transparent" // updated
            : "bg-[#100135] text-white border-transparent" // confirmed
          : isValid
          ? "bg-white text-[#A34796] border-[#A34796] hover:bg-[#fdf0fa]"
          : "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
      }`}
    title={
      current ? (hasChanged ? "Update quantity" : "Remove") : "Add"
    }
  >
    {current
      ? hasChanged
        ? <FaSyncAlt />
        : <FaCheck />
      : <FaPlus />}
  </button>

  {/* Pin Button */}
  <button
    onClick={() => togglePin(groupId, option.id)}
    className={`w-[32px] h-[32px] flex items-center justify-center rounded-md border-2 transition
      ${
        option.isPinned
          ? "bg-[#100135] text-white border-transparent"
          : "bg-white text-[#A34796] border-[#A34796] hover:bg-[#fdf0fa]"
      }`}
    title={option.isPinned ? "Unpin" : "Pin"}
  >
    {option.isPinned ? <FaBookmark /> : <FaRegBookmark />}
  </button>
</div>
    </div>
  );
}
