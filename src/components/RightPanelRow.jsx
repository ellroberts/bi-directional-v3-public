import React, { useState, useEffect } from "react";
import { usePlan } from "./PlanContext";

export default function RightPanelRow({ groupId, optionId, opt, isDebug }) {
  const { addOrUpdate, remove } = usePlan();

  const getOptionDisplayNumber = () => {
    if (typeof optionId === 'string' && optionId.includes('-')) {
      const parts = optionId.split('-');
      return parts[parts.length - 1];
    }
    return optionId;
  };

  const displayNumber = getOptionDisplayNumber();
  const minQty = opt.min || 0;
  const maxQty = opt.max;
  const committedQty = opt.qty ?? null;
  const [inputQty, setInputQty] = useState(committedQty ?? minQty);

  useEffect(() => {
    const fallback = opt.min || 0;
    setInputQty(committedQty ?? fallback);
  }, [committedQty, opt.min]);

  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  const isWithinRange = isQtyNumber && parsedQty >= minQty && (maxQty === undefined || parsedQty <= maxQty);
  const isValid = isWithinRange;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;
  const isSelected = !!committedQty;
  const isFreeTrialOption = opt.billing && opt.billing.includes("Free trial");

  const handleSave = () => {
    if (!isValid) return;
    const newQty = parsedQty === 0 && !committedQty ? (minQty || 1) : parsedQty;
    if (isQtyNumber && newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
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

  const showValidationError = isQtyNumber && !isWithinRange;
  let validationMessage = "";
  if (showValidationError) {
    if (parsedQty < minQty) {
      validationMessage = `Minimum ${minQty} required`;
    } else if (maxQty && parsedQty > maxQty) {
      validationMessage = `Maximum ${maxQty} allowed`;
    }
  }

  return (
    <div className={`mt-3 ${isDebug ? "debug-border" : ""}`}>
      <div className="text-sm text-gray-700">
        Option {displayNumber} - <span className="font-bold text-gray-800">£{opt.price}</span>
      </div>
      <div className="text-sm text-gray-500">
        {opt.term} / {isFreeTrialOption ? "Free" : opt.billing}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 p-1 rounded-lg border-2 border-gray-300 bg-white">
            <button
              disabled={!isQtyNumber || parsedQty <= minQty}
              onClick={() => {
                if (!isQtyNumber) return;
                const newQty = parsedQty - 1;
                setInputQty(newQty);
                if (newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
                  addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: newQty,
                  });
                } else if (newQty < minQty && committedQty) {
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

            <input
              type="number"
              inputMode="numeric"
              value={inputQty}
              onChange={(e) => setInputQty(e.target.value)}
              onBlur={() => {
                if (isQtyNumber && isWithinRange) {
                  addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: parsedQty,
                  });
                } else if (parsedQty < minQty && committedQty) {
                  remove(groupId, optionId);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
              className={`w-8 text-center text-sm font-bold bg-transparent border-none focus:outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                ${showValidationError ? 'text-red-600' : 'text-gray-800'}`}
            />

            <button
              disabled={
                !isQtyNumber ||
                (typeof maxQty === "number" && parsedQty >= maxQty)
              }
              onClick={() => {
                if (!isQtyNumber) return;
                if (typeof maxQty === "number" && parsedQty >= maxQty) return;
                const newQty = parsedQty + 1;
                setInputQty(newQty);
                if (newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
                  addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: newQty,
                  });
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-medium ${
                !isQtyNumber || (typeof maxQty === "number" && parsedQty >= maxQty)
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

        <div className="flex gap-2">
          {hasChanged ? (
            <button
              className={`px-3 py-1.5 flex items-center justify-center text-white rounded-md text-sm font-medium min-w-[50px] h-[32px] ${
                isValid ? 'bg-[#A34796] hover:bg-[#8a3985]' : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSave}
              disabled={!isValid}
              title={!isValid ? validationMessage : ""}
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
              <i className="fa-solid fa-trash text-sm" />
            </button>
          )}
        </div>
      </div>

      {showValidationError && (
        <div className="text-xs text-red-600 mt-1">
          {validationMessage}
        </div>
      )}
    </div>
  );
}
