import React, { useEffect, useState } from "react";
import { usePlan } from "./PlanContext";

export default function AddonTableRow({ option, index, groupId, isLast }) {
  const { selected, addOrUpdate, remove } = usePlan();

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

  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  const isWithinRange = isQtyNumber && parsedQty >= minQty && (maxQty === undefined || parsedQty <= maxQty);
  const isValid = isWithinRange;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;
  const isSelected = !!current;
  const isFreeTrialOption = option.billing && option.billing.includes("Free trial");

  const handleSave = () => {
    if (!isValid || isLoading) return;
    setIsLoading(true);
    const newQty = parsedQty === 0 && !current ? (minQty || 1) : parsedQty;

    let dotCount = 0;
    const textInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setLoadingText('Loading' + '.'.repeat(dotCount));
    }, 200);

    setTimeout(() => {
      clearInterval(textInterval);
      if (isQtyNumber && newQty >= minQty && (maxQty === undefined || newQty <= maxQty)) {
        addOrUpdate(groupId, option.id, { ...option, qty: newQty });
        setInputQty(newQty);
      }
      setLoadingText('Loading');
      setIsLoading(false);
    }, 1200);
  };

  const handleRemove = () => {
    remove(groupId, option.id);
  };

  const getBackgroundColor = () => {
    return isSelected ? "bg-[#F3F2F5]" : "bg-white";
  };

  const showValidationError = isQtyNumber && !isWithinRange;
  let validationMessage = "";
  if (showValidationError) {
    if (parsedQty < minQty) validationMessage = `Minimum ${minQty} required`;
    else if (maxQty && parsedQty > maxQty) validationMessage = `Maximum ${maxQty} allowed`;
  }

  return (
    <div>
      <div className={`grid grid-cols-5 lg:grid-cols-[64px_110px_90px_200px_1fr] gap-2 items-center text-sm py-1 px-1 rounded-md mb-1 ${getBackgroundColor()}`}>
        {/* Option number + tooltip */}
        <div className="pl-4 flex items-center gap-1 relative group">
          {index + 1}
          {option.description && (
            <>
              <i className="fa-regular fa-circle-info text-sm text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                              bg-black text-white text-xs rounded px-2 py-1 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                              pointer-events-none z-50 whitespace-nowrap shadow-md">
                {option.description}
              </div>
            </>
          )}
        </div>

        <div className="pl-2 truncate">{option.term}</div>

        <div className="truncate">
          {isFreeTrialOption ? "Free" : option.billing}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-1 rounded-lg border border-gray-300 bg-white flex-shrink-0">
            <button
              disabled={!isQtyNumber || parsedQty <= minQty}
              onClick={() => {
                if (!isQtyNumber) return;
                setInputQty(parsedQty - 1);
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-medium text-sm ${
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
              onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
              className={`w-10 text-center text-sm font-bold bg-transparent border-none focus:outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                ${showValidationError ? 'text-red-600' : 'text-gray-800'}`}
            />

            <button
              disabled={!isQtyNumber || (typeof maxQty === "number" && parsedQty >= maxQty)}
              onClick={() => {
                if (!isQtyNumber) return;
                setInputQty(parsedQty + 1);
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

        <div className="flex items-center justify-between pr-2">
          <div className="font-medium">
            {isFreeTrialOption ? "£0" : `£${option.price}`}
          </div>
          <div className="flex gap-2">
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
              <button
                className="px-2 py-1 flex items-center justify-center text-white rounded-md text-xs font-medium w-[70px] h-8 bg-[#A34796] border-2 border-[#A34796] hover:bg-[#8a3985] hover:border-[#8a3985]"
                onClick={handleRemove}
              >
                <i className="fa-solid fa-check text-xs" />
              </button>
            )}
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
              <i className="fa-solid fa-trash text-xs" />
            </button>
          </div>
        </div>
      </div>

      {showValidationError && (
        <div className="text-xs text-red-600 mt-1 px-2">
          {validationMessage}
        </div>
      )}
    </div>
  );
}
