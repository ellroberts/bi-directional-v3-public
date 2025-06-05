
import React, { useState } from "react";
import { usePlan } from "./PlanContext";
import RightPanelRow from "./RightPanelRow";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function RightPanel() {
  const { selected } = usePlan();

  const groupLabels = {
    ms365: "MS365 Business Basic",
    standard: "MS365 Business Standard",
    premium: "MS365 Business Premium",
  };

  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Order summary</h2>

      {Object.entries(groupLabels).map(([groupId, label], idx) => {
        const options = selected[groupId];
        if (!options || Object.keys(options).length === 0) return null;

        const isExpanded = expandedGroups[groupId] ?? true;
        const optionCount = Object.keys(options).length;

        return (
          <div key={groupId} className="mb-2">
            {/* Header: match left column */}
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => toggleGroup(groupId)}
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                {isExpanded ? (
                  <FaChevronDown className="text-sm mt-1" />
                ) : (
                  <FaChevronRight className="text-sm mt-1" />
                )}
                <div className="flex flex-col">
                  <div className="font-semibold truncate">{label}</div>
                  {!isExpanded && (
                    <div className="text-sm text-gray-500">
                      {optionCount} option{optionCount > 1 ? "s" : ""} selected
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rows */}
            {isExpanded && (
              <div className="pt-2 space-y-6">
                {Object.entries(options).map(([optionId, opt]) => (
                  <RightPanelRow
                    key={`${groupId}-${optionId}`}
                    groupId={groupId}
                    optionId={optionId}
                    opt={opt}
                  />
                ))}
              </div>
            )}

            {/* Divider */}
            {idx < Object.keys(groupLabels).length - 1 && (
              <div className="pt-4">
                <hr className="border-t border-gray-300" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
