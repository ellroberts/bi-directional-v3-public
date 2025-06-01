import React, { useState } from "react";
import { usePlan } from "./PlanContext";
import AddonTableRow from "./AddonTableRow";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const data = [
  {
    name: "MS365 Business Basic",
    id: "ms365",
    options: [
      { id: "1", term: "Monthly", billing: "Monthly", price: 7, min: 10 },
      { id: "2", term: "Monthly", billing: "Annual", price: 7, min: 0 },
      { id: "3", term: "Annual", billing: "Annual", price: 7, min: 0 },
    ],
  },
  {
    name: "Something else",
    id: "other-1",
    options: [],
  },
  {
    name: "Something else",
    id: "other-2",
    options: [],
  },
];

export default function LeftPanel() {
  const { selected } = usePlan();
  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(data.map((group) => [group.id, true]))
  );

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <div>
      {data.map((group) => {
        const selectedCount = selected[group.id]
          ? Object.keys(selected[group.id]).length
          : 0;
        const isExpanded = expandedGroups[group.id];

        return (
          <div key={group.id} className="border-b pb-4 mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center gap-2">
                {isExpanded ? (
                  <FaChevronDown className="text-sm" />
                ) : (
                  <FaChevronRight className="text-sm" />
                )}
                <div className="font-semibold">{group.name}</div>
              </div>
              <div className="text-sm text-gray-500">
                {group.options.length} options available
              </div>
              {selectedCount > 0 && (
                <div className="text-sm font-semibold text-black ml-4">
                  {selectedCount} selected
                </div>
              )}
            </div>

            {isExpanded && group.options.length > 0 && (
              <>
                <div className="grid grid-cols-[60px_120px_120px_1fr_80px_80px] gap-4 text-sm font-semibold text-gray-700 border-b py-2 mt-3">
                  <div>Option</div>
                  <div>Term</div>
                  <div>Billing</div>
                  <div>Licence</div>
                  <div className="text-right">Price</div>
                  <div></div>
                </div>
                {group.options.map((opt, idx) => (
                  <AddonTableRow
                    key={opt.id}
                    index={idx}
                    groupId={group.id}
                    option={opt}
                    isLast={idx === group.options.length - 1}
                  />
                ))}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
