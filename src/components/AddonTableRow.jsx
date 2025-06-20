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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const fallback = option.min || 0;
    setInputQty(committedQty ?? fallback);
  }, [committedQty, option.min]);

  // Debug logging for state changes
  useEffect(() => {
    console.log(`Component ${option.id} - Loading state changed:`, isLoading);
  }, [isLoading, option.id]);

  useEffect(() => {
    console.log(`Component ${option.id} - Current selection:`, current);
  }, [current, option.id]);

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
    if (!isValid || isLoading) return;
    
    console.log('Starting save, setting loading to true');
    setIsLoading(true);
    
    // Store the values we need before any state changes
    const newQty = parsedQty === 0 && !current ? (minQty || 1) : parsedQty;
    
    // Animate loading text
    let dotCount = 0;
    const textInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setLoadingText('Loading' + '.'.repeat(dotCount));
    }, 200);
    
    // Use setTimeout to delay the actual save operation
    setTimeout(() => {
      clearInterval(textInterval);
      
      // Only update if quantity is still valid
      if (isQtyNumber && newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
        addOrUpdate(groupId, option.id, {
          ...option,
          qty: newQty,
        });
        setInputQty(newQty);
      }
      
      console.log('Save complete, setting loading to false');
      setLoadingText('Loading');
      setIsLoading(false);
    }, 1200);
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
      {/* 5-COLUMN ROW LAYOUT */}
      <div
        className={`grid grid-cols-5 lg:grid-cols-[64px_110px_90px_200px_1fr] gap-2 items-center text-sm py-1 px-1 rounded-md mb-1 ${getBackgroundColor()}`}
      >
        <div className="pl-4">{index + 1}</div>
        <div className="pl-2 truncate">{option.term}</div>
        
        {/* Billing column with "Free" text for free trials */}
        <div className="truncate">
          {isFreeTrialOption ? "Free" : option.billing}
        </div>

        {/* Licence control - MVP VERSION: No auto-save on +/- buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-1 rounded-lg border-2 border-gray-300 bg-white flex-shrink-0">
            {/* Minus button - NO AUTO-SAVE */}
            <button
              disabled={!isQtyNumber || parsedQty <= minQty}
              onClick={() => {
                if (!isQtyNumber) return;
                const newQty = parsedQty - 1;
                setInputQty(newQty);
                // MVP: No auto-save, just update the input state
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-medium text-sm ${
                !isQtyNumber || parsedQty <= minQty
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              −
            </button>

            {/* Input field - NO AUTO-SAVE */}
            <input
              type="number"
              inputMode="numeric"
              value={inputQty}
              onChange={(e) => setInputQty(e.target.value)}
              // MVP: Remove onBlur auto-save
              onKeyDown={(e) => {
                // MVP: Remove auto-save on Enter
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
              className={`w-10 text-center text-sm font-bold bg-transparent border-none focus:outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                ${showValidationError ? 'text-red-600' : 'text-gray-800'}`}
            />

            {/* Plus button - NO AUTO-SAVE */}
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
                // MVP: No auto-save, just update the input state
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-medium text-sm ${
                !isQtyNumber || (typeof maxQty === "number" && parsedQty >= maxQty)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              +
            </button>
          </div>

          {(option.min > 0 || option.max > 0) && (
            <div className="text-xs text-gray-500 leading-tight whitespace-nowrap flex-shrink-0">
              {option.min > 0 && <div>Min {option.min}</div>}
              {option.max > 0 && <div>Max {option.max}</div>}
            </div>
          )}
        </div>

        {/* Price + Actions combined column */}
        <div className="flex items-center justify-between pr-2">
          <div className="font-medium">
            {isFreeTrialOption ? "£0" : `£${option.price}`}
          </div>
          <div className="flex gap-2">
            {/* MVP: Always show Add/Update button when there are changes or not selected */}
            {!current || hasChanged ? (
              <button
                className={`px-2 py-1 flex items-center justify-center rounded-md text-sm font-medium w-[70px] h-8 border-2 transition-colors ${
                  isLoading 
                    ? 'bg-[#A34796] text-white border-[#A34796] cursor-not-allowed'
                    : isValid 
                      ? (current && hasChanged 
                          ? 'bg-[#A34796] text-white border-[#A34796] hover:bg-[#8a3985] hover:border-[#8a3985]' 
                          : 'border-[#A34796] text-[#A34796] bg-white hover:bg-[#fdf0fa]')
                      : 'border-gray-300 text-gray-400 bg-white cursor-not-allowed'
                }`}
                onClick={handleSave}
                disabled={!isValid || isLoading}
                title={!isValid ? validationMessage : ""}
              >
                {/* White animated loading icon */}
                {isLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                ) : (
                  current && hasChanged ? 'Update' : 'Add'
                )}
              </button>
            ) : (
              /* Show solid fill with check mark when selected and no changes */
              <button
                className="px-2 py-1 flex items-center justify-center text-white rounded-md text-xs font-medium w-[70px] h-8 bg-[#A34796] border-2 border-[#A34796] hover:bg-[#8a3985] hover:border-[#8a3985]"
                onClick={handleRemove}
              >
                <FaCheck className="text-xs" />
              </button>
            )}

            {/* Remove button */}
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-md border bg-white flex-shrink-0 ${
                isSelected
                  ? "border-gray-300 text-[#383838] hover:bg-gray-50"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              onClick={handleRemove}
              disabled={!isSelected}
              title="Remove"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
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