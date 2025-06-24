import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AddonTableRow from "./AddonTableRow";
import { usePlan } from "./PlanContext";

export default function ItemGroup({ group, index }) {
  const [isOpen, setIsOpen] = useState(index === 0);
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

  const isTrialService = group.name.toLowerCase().includes('trial');

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
          <div className="flex flex-col relative w-full">
            <div className="flex justify-between items-center w-full">
              <div className="font-semibold truncate">{group.name}</div>
              {!isOpen && totalQuantity > 0 && (
                <div className="ml-2 bg-[#DEF1FB] text-[#356E8E] text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {totalQuantity} {totalQuantity === 1 ? 'licence' : 'licences'}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{group.options.length} options available</span>
              {isTrialService && (
                <span className="inline-block px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-medium">
                  Free
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {isOpen && group.options.length > 0 && (
        <div className="border border-gray-300 rounded-md overflow-hidden mt-3 p-2">
          {/* 5-COLUMN LAYOUT */}
          <div className="grid grid-cols-5 lg:grid-cols-[64px_110px_90px_200px_1fr] gap-2 px-2 text-sm font-semibold text-white bg-[#706685] border-b py-3 rounded mb-1">
            <div className="pl-4">Option</div>
            <div className="pl-2">Term</div>
            <div>Billing</div>
            <div>Licence</div>
            <div className="text-left">Price</div>
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
