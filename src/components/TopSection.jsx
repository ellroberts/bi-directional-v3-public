import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import SegmentSelect from "./SegmentSelect";
import ViewSelect from "./ui/ViewSelect"; // adjust path if needed

export default function TopSection({ view, setView, selectedOnly, setSelectedOnly }) {
  const [search, setSearch] = useState("");

  return (
    <div className="pb-4 border-b">
      <div className="flex flex-wrap items-end justify-between gap-6">

        {/* View + Selected Only */}
        <div>
          <div className="text-sm font-medium mb-1">View</div>
          <div className="h-10 flex items-center gap-3">
            <ViewSelect value={view} onChange={setView} />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="selected-only"
                checked={selectedOnly}
                onChange={(e) => setSelectedOnly(e.target.checked)}
                className="accent-black w-4 h-4"
              />
              <label htmlFor="selected-only" className="text-sm text-black">
                Selected only
              </label>
            </div>
          </div>
        </div>

        {/* Segment + Search */}
        <div className="flex items-end gap-4">
          <div>
            <div className="text-sm font-medium mb-1">Customer segment</div>
            <div className="h-10">
              <SegmentSelect />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Search</div>
            <div className="relative w-[160px] h-10">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full pr-8 h-full"
              />
              {search ? (
                <FaTimes
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer"
                />
              ) : (
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
