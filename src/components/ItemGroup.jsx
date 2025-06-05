
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
  const totalQuantity = Object.values(selectedOptions).reduce(
    (sum, option) => sum + (parseInt(option.qty, 10) || 0),
    0
  );
  const showSelectedCount = totalQuantity > 0;

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
          </div>
        </div>

        {/* Top-right "X selected" and Clear */}
        {!isOpen && showSelectedCount && (
          <div className="flex items-center gap-3 text-sm text-gray-600 whitespace-nowrap">
            <span>{totalQuantity} selected</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-xs text-red-500 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Table header */}
      {isOpen && group.options.length > 0 && (
        <div className="grid grid-cols-[60px_120px_120px_1fr_80px_80px] gap-4 text-sm font-semibold text-gray-700 border-b py-2 mt-3">
          <div>Option</div>
          <div>Term</div>
          <div>Billing</div>
          <div>Licence</div>
          <div className="text-right">Price</div>
          <div></div>
        </div>
      )}

      {/* Option rows */}
      {isOpen &&
        group.options.map((option, index) => (
          <AddonTableRow
            key={option.id}
            option={option}
            groupId={groupId}
            index={index}
            isLast={index === group.options.length - 1}
          />
        ))}

      {/* Bottom Clear All inside expanded group */}
      {isOpen && showSelectedCount && (
        <div className="pt-2 text-right">
          <button
            onClick={handleClear}
            className="text-xs text-red-500 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
