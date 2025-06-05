
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AddonTableRow from "./AddonTableRow";
import { usePlan } from "./PlanContext";

export default function ItemGroup({ group }) {
  const [isOpen, setIsOpen] = useState(false);
  const { selected, remove } = usePlan();

  const handleToggle = () => setIsOpen((prev) => !prev);

  const groupId = group.id;
  const selectedOptions = selected[groupId] || {};
  const selectedOptionCount = Object.keys(selectedOptions).length;
  const totalQuantity = Object.values(selectedOptions).reduce(
    (sum, option) => sum + (parseInt(option.qty, 10) || 0),
    0
  );

  const showClearAll = selectedOptionCount > 1;

  const handleClear = () => {
    Object.keys(selectedOptions).forEach((optionId) => {
      remove(groupId, optionId);
    });
  };

  return (
    <div className="border-b pb-4 mb-6">
      {/* Header */}
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {isOpen ? (
            <FaChevronDown className="text-sm mt-1" />
          ) : (
            <FaChevronRight className="text-sm mt-1" />
          )}
          <div className="flex flex-col">
            <div className="font-semibold truncate">{group.name}</div>
            <div className="text-sm text-gray-500">
              {group.options.length} options available
            </div>
            {!isOpen && selectedOptionCount > 0 && (
              <div className="text-xs text-gray-400">
                {selectedOptionCount} option{selectedOptionCount > 1 ? "s" : ""} selected
              </div>
            )}
          </div>
        </div>

        {!isOpen && totalQuantity > 0 && (
          <div className="flex items-center gap-3 text-sm text-gray-600 whitespace-nowrap">
            <span>{totalQuantity} selected</span>
            {showClearAll && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-xs text-red-500 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bordered container wrapping header + rows */}
      {isOpen && group.options.length > 0 && (
        <div className="border border-gray-300 rounded-md overflow-hidden mt-3">
          <div className="grid grid-cols-6 lg:grid-cols-[40px_110px_90px_1fr_70px_70px] gap-2 px-4 gap-2 px-4 text-sm font-semibold text-gray-700 bg-gray-50 border-b py-2 px-4">
            <div>Option</div>
            <div>Term</div>
            <div>Billing</div>
            <div>Licence</div>
            <div className="text-left">Price</div>
            <div></div>
          </div>

          {group.options.map((option, index) => (
            <AddonTableRow
              key={option.id}
              option={option}
              groupId={groupId}
              index={index}
              isLast={index === group.options.length - 1}
            />
          ))}
        </div>
      )}

      {/* Bottom Clear All (expanded view) */}
      {isOpen && showClearAll && (
        <div className="pt-2 text-right">
          <button
            onClick={handleClear}
            className="text-xs text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
