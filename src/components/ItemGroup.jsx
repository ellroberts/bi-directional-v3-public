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
    <div className="pb-4 mb-4">
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

        {!isOpen && totalQuantity > 0 && (
          <div className="flex items-center text-sm whitespace-nowrap">
            <span className="inline-block px-3 py-[3px] rounded-full text-xs font-medium" style={{ backgroundColor: '#EEF8FD', color: '#356E8E' }}>
              {totalQuantity} Licence{totalQuantity !== 1 ? "s" : ""} selected
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      {isOpen && group.options.length > 0 && (
        <div className="border border-gray-300 rounded-md overflow-hidden mt-3 p-2">
          <div className="grid grid-cols-6 lg:grid-cols-[64px_110px_90px_1fr_70px_72px] gap-2 px-2 text-sm font-semibold text-white bg-[#706685] border-b py-3 rounded mb-1">
            <div className="pl-4">Option</div>
            <div className="pl-2">Term</div>
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

          {showClearAll && (
            <div className="pt-3 text-right pr-3">
              <button
                onClick={handleClear}
                className="text-xs text-red-500 hover:underline"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}