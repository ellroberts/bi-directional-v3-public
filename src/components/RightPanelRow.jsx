import React, { useState, useEffect } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash } from "react-icons/fa";

export default function RightPanelRow({ groupId, optionId, opt, isDebug }) {
  const { addOrUpdate, remove } = usePlan();

  // Use EXACT same logic as left panel
  const minQty = opt.min || 0;
  const committedQty = opt.qty ?? null;
  const [inputQty, setInputQty] = useState(committedQty ?? minQty);

  useEffect(() => {
    const fallback = opt.min || 0;
    setInputQty(committedQty ?? fallback);
  }, [committedQty, opt.min]);

  // EXACT same logic as left panel
  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  const isValid = isQtyNumber && parsedQty >= minQty;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;
  const isSelected = !!committedQty;

  const handleSave = () => {
    const newQty = parsedQty === 0 && !committedQty ? 1 : parsedQty;
    if (isQtyNumber && newQty >= minQty) {
      addOrUpdate(groupId, optionId, {
        ...opt,
        qty: newQty,
      });
      setInputQty(newQty);
    }
  };

  const handleRemove = () => {
    remove(groupId, optionId);
  };

  return (
    <div className={`mt-3 ${isDebug ? "debug-border" : ""}`}>
      <div className="text-sm text-gray-700">
        Option {optionId} - <span className="font-bold text-gray-800">£{opt.price}</span>
      </div>
      <div className="text-sm text-gray-500">
        {opt.term} / {opt.billing === "Free" ? (
          <span className="inline-block px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-medium ml-1">
            Free
          </span>
        ) : (
          opt.billing
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        {/* License control - EXACT copy from left panel */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 p-1 rounded-lg border-2 border-gray-300 bg-white">
            {/* Minus button - EXACT copy from left panel */}
            <button
              disabled={!isQtyNumber || parsedQty <= minQty}
              onClick={() => {
                if (!isQtyNumber) return;
                const newQty = parsedQty - 1;
                setInputQty(newQty);
                // Auto-save when using +/- buttons, or remove if going below minimum
                if (newQty >= minQty) {
                  addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: newQty,
                  });
                } else if (newQty < minQty && committedQty) {
                  // Remove the item if quantity goes below minimum
                  remove(groupId, optionId);
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-medium ${
                !isQtyNumber || parsedQty <= minQty
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              −
            </button>

            {/* Input field - EXACT copy from left panel */}
            <input
              type="number"
              inputMode="numeric"
              value={inputQty}
              onChange={(e) => setInputQty(e.target.value)}
              onBlur={() => {
                // Auto-save when user finishes typing (loses focus)
                if (isQtyNumber && parsedQty >= minQty) {
                  addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: parsedQty,
                  });
                } else if (parsedQty < minQty && committedQty) {
                  // Remove if below minimum
                  remove(groupId, optionId);
                }
              }}
              onKeyDown={(e) => {
                // Auto-save when user presses Enter
                if (e.key === 'Enter') {
                  e.target.blur(); // This will trigger onBlur
                }
              }}
              className="w-8 text-center text-sm font-bold text-gray-800 bg-transparent border-none focus:outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            {/* Plus button - EXACT copy from left panel */}
            <button
              disabled={
                !isQtyNumber ||
                (typeof opt.max === "number" && parsedQty >= opt.max)
              }
              onClick={() => {
                if (!isQtyNumber) return;
                if (typeof opt.max === "number" && parsedQty >= opt.max) return;
                const newQty = parsedQty + 1;
                setInputQty(newQty);
                // Auto-save when using +/- buttons
                if (newQty >= minQty) {
                  addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: newQty,
                  });
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-medium ${
                !isQtyNumber || (typeof opt.max === "number" && parsedQty >= opt.max)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              +
            </button>
          </div>

          {(opt.min > 0 || opt.max > 0) && (
            <div className="text-xs text-gray-500 leading-tight whitespace-nowrap">
              {opt.min > 0 && <div>Min {opt.min}</div>}
              {opt.max > 0 && <div>Max {opt.max}</div>}
            </div>
          )}
        </div>

        {/* Buttons - moved to right side */}
        <div className="flex gap-2">
          {hasChanged ? (
            <button
              className="px-3 py-1.5 flex items-center justify-center text-white rounded-md text-sm font-medium min-w-[50px] h-[32px]"
              style={{ backgroundColor: "#A34796" }}
              onClick={handleSave}
              disabled={!isValid}
            >
              Update
            </button>
          ) : (
            <button
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-md border bg-white flex-shrink-0 ${
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
          )}
        </div>
      </div>
    </div>
  );
}