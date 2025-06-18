import React, { useEffect, useState } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash, FaCheck, FaPlus } from "react-icons/fa";

export default function AddonTableRow({ option, index, groupId, isLast }) {
  const { selected, addOrUpdate, remove } = usePlan();

  // Add safety checks for option prop
  if (!option) {
    console.error('AddonTableRow: option prop is undefined');
    return null;
  }

  const current = selected[groupId]?.[option.id];
  const minQty = option.min || 0;
  const maxQty = option.max;
  const committedQty = current?.qty ?? null;
  const [inputQty, setInputQty] = useState(committedQty ?? minQty);

  useEffect(() => {
    const fallback = option.min || 0;
    setInputQty(committedQty ?? fallback);
  }, [committedQty, option.min]);

  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  
  // Enhanced validation logic
  const isWithinRange = isQtyNumber && 
    parsedQty >= minQty && 
    (maxQty === undefined || parsedQty <= maxQty);
  
  const isValid = isWithinRange;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;
  const isSelected = !!current;

  // Check if this is a free trial option
  const isFreeTrialOption = option.billing && option.billing.includes("Free trial");

  const handleSave = () => {
    // Only allow saving if the quantity is valid
    if (!isValid) return;
    
    const newQty = parsedQty === 0 && !current ? (minQty || 1) : parsedQty;
    if (isQtyNumber && newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
      addOrUpdate(groupId, option.id, {
        ...option,
        qty: newQty,
      });
      setInputQty(newQty);
    }
  };

  const handleRemove = () => {
    remove(groupId, option.id);
  };

  // Determine background color based on selection and billing type
  const getBackgroundColor = () => {
    if (!isSelected) return "bg-white";
    if (isFreeTrialOption) return "bg-green-50";
    return "bg-[#F3F2F5]";
  };

  // Show validation error message
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
    <div>
      <div
        className={`grid grid-cols-6 lg:grid-cols-[64px_110px_90px_1fr_70px_72px] gap-2 items-center text-sm py-1 px-1 rounded-md mb-1 ${getBackgroundColor()}`}
      >
        <div className="pl-4">{index + 1}</div>
        <div className="pl-2">{option.term}</div>
        
        {/* Billing column with "Free" text for free trials */}
        <div>
          {isFreeTrialOption ? "Free" : option.billing}
        </div>

        {/* Licence control */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 p-1 rounded-lg border-2 border-gray-300 bg-white">
            {/* Minus button */}
            <button
              disabled={!isQtyNumber || parsedQty <= minQty}
              onClick={() => {
                if (!isQtyNumber) return;
                const newQty = parsedQty - 1;
                setInputQty(newQty);
                // Auto-save when using +/- buttons, or remove if going below minimum
                if (newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
                  addOrUpdate(groupId, option.id, {
                    ...option,
                    qty: newQty,
                  });
                } else if (newQty < minQty && current) {
                  // Remove the item if quantity goes below minimum
                  remove(groupId, option.id);
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

            {/* Input field with validation styling */}
            <input
              type="number"
              inputMode="numeric"
              value={inputQty}
              onChange={(e) => setInputQty(e.target.value)}
              onBlur={() => {
                // Auto-save when user finishes typing (loses focus)
                if (isQtyNumber && isWithinRange) {
                  addOrUpdate(groupId, option.id, {
                    ...option,
                    qty: parsedQty,
                  });
                } else if (parsedQty < minQty && current) {
                  // Remove if below minimum
                  remove(groupId, option.id);
                }
              }}
              onKeyDown={(e) => {
                // Auto-save when user presses Enter
                if (e.key === 'Enter') {
                  e.target.blur(); // This will trigger onBlur
                }
              }}
              className={`w-8 text-center text-sm font-bold bg-transparent border-none focus:outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                ${showValidationError ? 'text-red-600' : 'text-gray-800'}`}
            />

            {/* Plus button */}
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
                // Auto-save when using +/- buttons
                if (newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
                  addOrUpdate(groupId, option.id, {
                    ...option,
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

          {(option.min > 0 || option.max > 0) && (
            <div className="text-xs text-gray-500 leading-tight whitespace-nowrap">
              {option.min > 0 && <div>Min {option.min}</div>}
              {option.max > 0 && <div>Max {option.max}</div>}
            </div>
          )}
        </div>

        {/* Price column */}
        <div className="text-left">
          {isFreeTrialOption ? "£0" : `£${option.price}`}
        </div>

        {/* Buttons container */}
        <div className="flex justify-end gap-2 pr-2">
          {/* Add/Update button */}
          {current && hasChanged ? (
            <button
              className={`px-3 py-1.5 flex items-center justify-center text-white rounded-md text-sm font-medium min-w-[60px] h-[32px] ${
                isValid ? 'bg-[#A34796] hover:bg-[#8a3985]' : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSave}
              disabled={!isValid}
            >
              Update
            </button>
          ) : current ? (
            <button
              className="px-3 py-1.5 flex items-center justify-center text-white rounded-md text-sm font-medium min-w-[50px] h-[32px]"
              style={{ backgroundColor: "#A34796" }}
              onClick={handleRemove}
            >
              <FaCheck className="text-sm" />
            </button>
          ) : (
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md border-2 min-w-[50px] h-[32px] flex items-center justify-center ${
                isValid
                  ? "border-[#A34796] text-[#A34796] hover:bg-[#fdf0fa]"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleSave}
              disabled={!isValid}
              title={!isValid ? validationMessage : ""}
            >
              Add
            </button>
          )}

          {/* Remove button */}
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
        </div>
      </div>
      
      {/* Validation error message */}
      {showValidationError && (
        <div className="text-xs text-red-600 mt-1 px-2">
          {validationMessage}
        </div>
      )}
    </div>
  );
}