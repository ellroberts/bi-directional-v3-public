import React from "react";

export default function TestStaticLayout() {
  return (
    <div className="p-6">
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-between items-start">
          {/* LEFT: Chevron + title block */}
          <div className="flex items-start gap-2">
            <div className="text-sm mt-1">▶</div>
            <div className="flex flex-col">
              <div className="font-semibold">MS365 Business Basic</div>
              <div className="text-sm text-gray-500">3 options available</div>
            </div>
          </div>

          {/* RIGHT: Selected count */}
          <div className="text-sm font-semibold text-black whitespace-nowrap ml-4">
            1 selected
          </div>
        </div>
      </div>
    </div>
  );
}
