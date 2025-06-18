import React, { useState } from "react";
import { usePlan } from "./PlanContext";
import RightPanelRow from "./RightPanelRow";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function RightPanel() {
  const { selected, remove } = usePlan();

  const groupLabels = {
    ms365: "MS365 Business Basic",
    standard: "MS365 Business Standard", 
    premium: "MS365 Business Premium",
    "dynamics-finance-premium-trial": "Dynamics 365 Finance Premium (30 day trial)",
  };

  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initialState = {};
    Object.keys(groupLabels).forEach((id) => {
      initialState[id] = false;
    });
    return initialState;
  });

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleClearGroup = (groupId) => {
    const options = selected[groupId];
    if (!options) return;
    Object.keys(options).forEach((optionId) => {
      remove(groupId, optionId);
    });
  };

  const total = Object.entries(selected).reduce((sum, [groupId, options]) => {
    return (
      sum +
      Object.values(options).reduce((groupSum, opt) => {
        return groupSum + (opt.qty || 0) * (opt.price || 0);
      }, 0)
    );
  }, 0);

  // Filter groups that have selected options
  const groupsWithOptions = Object.entries(groupLabels).filter(([groupId]) => {
    const options = selected[groupId];
    return options && Object.keys(options).length > 0;
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Order summary</h2>

      {groupsWithOptions.map(([groupId, label], index) => {
        const options = selected[groupId];
        const isExpanded = expandedGroups[groupId];
        const optionCount = Object.keys(options).length;
        const totalQty = Object.values(options).reduce(
          (sum, opt) => sum + (parseInt(opt.qty, 10) || 0),
          0
        );

        return (
          <React.Fragment key={groupId}>
            <div className="mb-6">
              <div className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleGroup(groupId)}
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {isExpanded ? (
                    <FaChevronDown className="text-sm mt-1" />
                  ) : (
                    <FaChevronRight className="text-sm mt-1" />
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="font-semibold break-words">
                      {label.includes('(30 day trial)') 
                        ? label.replace(' (30 day trial)', '') 
                        : label}
                    </div>
                    {label.includes('(30 day trial)') && (
                      <div className="font-semibold text-gray-600 text-sm">(30 day trial)</div>
                    )}
                    
                    {/* 16px gap between title and details */}
                    <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                      <span>
                        {optionCount} option{optionCount > 1 ? "s" : ""} selected
                      </span>
                      
                      {/* Show free badge for trial services */}
                      {label.includes('(30 day trial)') && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-medium">
                          Free
                        </span>
                      )}
                      
                      <span>-</span>
                      <span>{totalQty} licence{totalQty !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="pt-2 space-y-4 pl-6">
                  {Object.entries(options).map(([actualOptionId, opt], index) => (
                    <RightPanelRow
                      key={`${groupId}-${actualOptionId}`}
                      groupId={groupId}
                      optionId={actualOptionId}  // Use the actual option ID, not index + 1
                      opt={opt}
                    />
                  ))}

                  {optionCount > 1 && (
                    <div className="text-right pt-1">
                      <button
                        onClick={() => handleClearGroup(groupId)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add divider between groups (but not after the last group) */}
            {index < groupsWithOptions.length - 1 && (
              <div className="border-t border-gray-300 my-4"></div>
            )}
          </React.Fragment>
        );
      })}

      <div className="mt-6 pt-4 border-t border-gray-300 text-right">
        <div className="text-sm font-semibold text-gray-700">Total:</div>
        <div className="text-xl font-bold text-black">£{total.toFixed(2)}</div>
      </div>
    </div>
  );
}