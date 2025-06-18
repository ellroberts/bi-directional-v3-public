import React, { useState } from "react";
import { FaSearch, FaTimes, FaChevronDown } from "react-icons/fa";
import SegmentSelect from "./SegmentSelect";

export default function TopSection({ 
  view, 
  setView, 
  selectedOnly, 
  setSelectedOnly,
  searchTerm,
  setSearchTerm 
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [segmentOpen, setSegmentOpen] = useState(false);
  
  const viewOptions = [
    { value: "popular", label: "Popular" },
    { value: "all", label: "All (1000)" }
  ];
  
  const handleViewSelect = (value) => {
    setView(value);
    setViewOpen(false);
  };
  
  const handleViewToggle = () => {
    setViewOpen(!viewOpen);
    setSegmentOpen(false); // Close other dropdown
  };
  
  const handleSegmentToggle = (isOpen) => {
    setSegmentOpen(isOpen);
    if (isOpen) setViewOpen(false); // Close other dropdown
  };
  
  return (
    <div className="pb-4 border-b">
      <div className="flex flex-wrap items-end justify-between gap-6">
        {/* View + Selected Only */}
        <div>
          <div className="text-sm font-medium mb-1">View</div>
          <div className="h-10 flex items-center gap-3">
            <div className="relative">
              <button
                onClick={handleViewToggle}
                className={`flex h-10 w-[200px] items-center justify-between rounded-sm border bg-white px-3 py-2 text-sm text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                  viewOpen ? 'border-black' : 'border-gray-200'
                }`}
                aria-label="Select View"
              >
                <span className="flex items-center gap-2">
                  {viewOptions.find(opt => opt.value === view)?.label}
                </span>
                <FaChevronDown className="text-xs ml-auto" />
              </button>
              
              {viewOpen && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg p-2 w-[200px] z-50 mt-1">
                  <ul className="space-y-1">
                    {viewOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleViewSelect(option.value)}
                        className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
              <SegmentSelect onOpenChange={handleSegmentToggle} />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Search</div>
            <div className="relative w-[160px] h-10">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // Auto-switch to "all" view when searching
                  if (e.target.value && view === "popular") {
                    setView("all");
                  }
                }}
                onFocus={() => {
                  setViewOpen(false);
                  setSegmentOpen(false);
                }}
                className="border border-gray-200 rounded px-3 py-2 text-sm w-full pr-8 h-full focus:outline-none focus:border-black"
              />
              {searchTerm ? (
                <FaTimes
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer hover:text-gray-700"
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