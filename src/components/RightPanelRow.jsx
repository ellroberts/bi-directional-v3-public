import React, { useState, useEffect } from "react";
import { usePlan } from "./PlanContext";
import { FaTrash } from "react-icons/fa";

export default function RightPanelRow({ groupId, optionId, opt, isDebug }) {
  const { addOrUpdate, remove } = usePlan();

  const minQty = opt.min || 0;
  const committedQty = opt.qty ?? minQty;
  const [inputQty, setInputQty] = useState(committedQty);

  useEffect(() => {
    setInputQty(committedQty);
  }, [committedQty]);

  const parsedQty = Number(inputQty);
  const isQtyNumber = !isNaN(parsedQty);
  const isValid = isQtyNumber && parsedQty >= minQty;
  const hasChanged = isQtyNumber && parsedQty !== committedQty;

  const handleSave = () => {
    if (isValid) {
      addOrUpdate(groupId, optionId, {
        ...opt,
        qty: parsedQty,
      });
    }
  };

  const handleRemove = () => {
    remove(groupId, optionId);
  };

  return (
    <div className={`mt-3 ${isDebug ? "debug-border" : ""}`}>
      {/* Removed the groupId/title */}
      <div className="text-sm text-gray-700">{`Option ${optionId} £${opt.price}`}</div>
      <div className="text-sm text-gray-500">{`${opt.term} / ${opt.billing}`}</div>

      <div className="flex items-center gap-2 mt-2">
        {/* Quantity control */}
        <div className="flex-grow">
          <div className="flex items-center rounded-md border border-black overflow-hidden text-sm h-[32px] w-max">
            <button
              disabled={!isQtyNumber || parsedQty <= minQty}
              onClick={() =>
                isQtyNumber && setInputQty(parsedQty - 1)
              }
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
              onClick={() =>
                isQtyNumber && setInputQty(parsedQty + 1)
              }
              className="px-2 text-sm text-black h-full bg-white"
            >
              +
            </button>
          </div>
        </div>

        {/* Add / Update / Remove */}
        {hasChanged ? (
          <button
            className="flex items-center justify-center text-sm px-4 py-1.5 rounded-md text-white"
            style={{ backgroundColor: "#A34796" }}
            onClick={handleSave}
            disabled={!isValid}
          >
            {committedQty ? "Update" : "Add"}
          </button>
        ) : (
          <button
            className="w-[32px] h-[32px] flex items-center justify-center rounded-md border bg-white border-gray-300 text-[#383838] hover:bg-gray-50 flex-shrink-0"
            onClick={handleRemove}
            title="Remove"
          >
            <FaTrash className="text-sm" />
          </button>
        )}
      </div>
    </div>
  );
}