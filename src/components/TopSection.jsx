import React, { useState, useEffect, useRef } from "react";
import SegmentSelect from "./SegmentSelect";

export default function TopSection({ 
  view, 
  setView,
  searchTerm,
  setSearchTerm 
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [segmentOpen, setSegmentOpen] = useState(false);

  const viewDropdownRef = useRef(null);

  const viewOptions = [
    { value: "popular", label: "Popular" },
    { value: "all", label: "All (1000)" },
    { value: "selected", label: "Selected only" },
  ];

  const handleViewSelect = (value) => {
    setView(value);
    setViewOpen(false);
  };

  const handleViewToggle = () => {
    setViewOpen(!viewOpen);
    setSegmentOpen(false);
  };

  const handleSegmentToggle = (isOpen) => {
    setSegmentOpen(isOpen);
    if (isOpen) setViewOpen(false);
  };

  // 🧠 Click-away logic for View dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (viewDropdownRef.current && !viewDropdownRef.current.contains(event.target)) {
        setViewOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="pb-4 border-b">
      <div className="flex flex-wrap items-end justify-between gap-6">
        {/* View Dropdown */}
        <div>
          <div className="text-sm font-medium mb-1">View</div>
          <div className="h-10 flex items-center gap-3">
            <div className="relative" ref={viewDropdownRef}>
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
                <i className="fa-solid fa-chevron-down text-xs ml-auto" />
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
                <i
                  onClick={() => setSearchTerm("")}
                  className="fa-solid fa-xmark absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer hover:text-gray-700"
                />
              ) : (
                <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
