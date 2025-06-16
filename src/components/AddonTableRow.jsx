import React, { useEffect, useState } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash, FaCheck, FaPlus } from "react-icons/fa";

export default function AddonTableRow({ option, index, groupId, isLast }) {
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
  const isSelected = !!current;

  // Determine if input should be styled as disabled (when qty is 0 or at minimum)
  const isInputDisabled = !isQtyNumber || parsedQty <= 0;

  const handleSave = () => {
    const newQty = parsedQty === 0 && !current ? 1 : parsedQty;
    if (isQtyNumber && newQty >= minQty) {
      addOrUpdate(groupId, option.id, {
        ...option,
        qty: newQty,
      });
      // Update the input to reflect the saved quantity
      setInputQty(newQty);
    }
  };

  const handleRemove = () => {
    remove(groupId, option.id);
  };

  return (
    <div
      className={`grid grid-cols-6 lg:grid-cols-[64px_110px_90px_1fr_70px_72px] gap-2 items-center text-sm py-1 px-1 rounded-md mb-1 ${
        isSelected ? "bg-[#F3F2F5]" : "bg-white"
      }`}
    >
      <div className="pl-4">{index + 1}</div>
      <div className="pl-2">{option.term}</div>
      
      {/* Billing column with badge for Free */}
      <div>
        {option.billing === "Free" ? (
          <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
            Free
          </span>
        ) : (
          option.billing
        )}
      </div>

      {/* Licence control */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border-2 border-gray-300 overflow-hidden text-sm h-[32px]">
          {/* Minus button */}
          <button
            disabled={!isQtyNumber || parsedQty <= minQty}
            onClick={() => {
              if (!isQtyNumber) return;
              const newQty = parsedQty - 1;
              setInputQty(newQty);
              // Auto-save when using +/- buttons, or remove if going below minimum
              if (newQty >= minQty) {
                addOrUpdate(groupId, option.id, {
                  ...option,
                  qty: newQty,
                });
              } else if (newQty < minQty && current) {
                // Remove the item if quantity goes below minimum
                remove(groupId, option.id);
              }
            }}
            className={`px-2 text-sm h-full ${
              !isQtyNumber || parsedQty <= minQty
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#222222] hover:bg-gray-50"
            }`}
          >
            −
          </button>

          {/* Input field */}
          <input
            type="number"
            inputMode="numeric"
            value={inputQty}
            onChange={(e) => setInputQty(e.target.value)}
            className={`h-full w-[52px] text-center border-x border-gray-300 text-sm font-medium focus:outline-none
              [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
              isInputDisabled
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-[#222222]"
            }`}
          />

          {/* Plus button */}
          <button
            disabled={
              !isQtyNumber ||
              (typeof option.max === "number" && parsedQty >= option.max)
            }
            onClick={() => {
              if (!isQtyNumber) return;
              if (typeof option.max === "number" && parsedQty >= option.max) return;
              const newQty = parsedQty + 1;
              setInputQty(newQty);
              // Auto-save when using +/- buttons
              if (newQty >= minQty) {
                addOrUpdate(groupId, option.id, {
                  ...option,
                  qty: newQty,
                });
              }
            }}
            className={`px-2 text-sm h-full ${
              !isQtyNumber || (typeof option.max === "number" && parsedQty >= option.max)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#222222] hover:bg-gray-50"
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

      {/* Price column */}
      <div className="text-left">
        {option.billing === "Free" ? "/" : `£${option.price}`}
      </div>

      {/* Buttons container */}
      <div className="flex justify-end gap-2">
        {/* Add/Update button */}
        {current && hasChanged ? (
          <button
            className="w-[32px] h-[32px] flex items-center justify-center text-white rounded-md"
            style={{ backgroundColor: "#A34796" }}
            onClick={handleSave}
            disabled={!isValid}
          >
            <FaCheck className="text-sm" />
          </button>
        ) : current ? (
          <button
            className="w-[32px] h-[32px] flex items-center justify-center text-white rounded-md"
            style={{ backgroundColor: "#A34796" }}
            onClick={handleRemove}
          >
            <FaCheck className="text-sm" />
          </button>
        ) : (
          <button
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-md border-2 ${
              isValid
                ? "border-[#A34796] text-[#A34796] hover:bg-[#fdf0fa]"
                : "border-gray-300 text-gray-400"
            }`}
            onClick={handleSave}
            disabled={!isValid}
          >
            <FaPlus className="text-sm" />
          </button>
        )}

        {/* Remove button */}
        <button
          className={`w-[32px] h-[32px] flex items-center justify-center rounded-md border bg-white ${
            isSelected
              ? "border-gray-300 text-[#383838] hover:bg-gray-50"
              : "border-gray-200 text-gray-300 cursor-not-allowed"
          }`}
          onClick={handleRemove}
          disabled={!isSelected}
          title="Remove"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
}