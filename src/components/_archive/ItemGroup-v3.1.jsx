import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AddonTableRow from "./AddonTableRow";

export default function ItemGroup({ group, selectedCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b pb-4 mb-6">
      <div
        className="flex justify-between items-start cursor-pointer" // CHANGED: items-start (was items-center) to top-align chevron/title/options
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Left section: chevron + title + options available stacked */}
        <div className="flex items-start gap-2"> {/* CHANGED: items-start to align icon and title/options vertically */}
          {isOpen ? (
            <FaChevronDown className="text-sm mt-1" /> // CHANGED: added mt-1 to align chevron with text block
          ) : (
            <FaChevronRight className="text-sm mt-1" />
          )}
          <div>
            <div className="font-semibold">{group.name}</div>
            <div className="text-sm text-gray-500">
              {group.options.length} options available
            </div>
          </div>
        </div>

        {/* Right section: selected count if any */}
        {selectedCount > 0 && (
          <div className="text-sm font-semibold text-black ml-4 whitespace-nowrap"> {/* CHANGED: added whitespace-nowrap to prevent wrapping */}
            {selectedCount} selected
          </div>
        )}
      </div>

      {/* Option rows (only if open and has options) */}
      {isOpen && group.options.length > 0 && (
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
}
