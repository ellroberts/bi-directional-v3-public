import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PlanProvider } from "./components/PlanContext";
import { DebugProvider, useDebug } from "./components/DebugContext.jsx";
import DebugToggle from "./components/DebugToggle";
import Pagination from "./components/Pagination";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { FaSearch } from "react-icons/fa";
import TypeMultiSelect from "./components/TypeMultiSelect";

function AppContent() {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const { isRedline } = useDebug();

  return (
    <div className={`${isRedline ? "debug-all" : ""} min-h-screen bg-gray-50`}>
      <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-4">
        <h2 className="text-2xl font-bold">Services</h2>

        {/* Redline toggle button */}
        <DebugToggle />

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side: Pagination + Filters + LeftPanel */}
          <div className="w-full md:w-2/3 space-y-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />

            {/* Relocated Controls */}
            <div className="flex flex-wrap items-end gap-6 justify-start">
              {/* View Filter */}
              <div>
                <div className="text-sm font-medium mb-1">View</div>
                <RadioGroup.Root
                  defaultValue="popular"
                  className="flex gap-6"
                  aria-label="View Filter"
                >
                  {[
                    { label: "Popular (500)", value: "popular", bold: true },
                    { label: "All (1000)", value: "all", bold: false },
                  ].map(({ label, value, bold }) => (
                    <RadioGroup.Item
                      key={value}
                      value={value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div className="h-4 w-4 bg-white rounded-full border border-gray-400 flex items-center justify-center group-data-[state=checked]:border-black">
                        <div className="h-2 w-2 rounded-full bg-transparent group-data-[state=checked]:bg-black" />
                      </div>
                      <span className={`text-sm ${bold ? "font-bold" : "text-gray-700"}`}>
                        {label}
                      </span>
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              </div>

              {/* Search Field */}
              <div>
                <div className="text-sm font-medium mb-1">Search</div>
                <div className="flex items-center border border-gray-300 rounded px-2 py-[6px] h-[40px]">
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none text-sm flex-1"
                  />
                  <FaSearch className="text-gray-500 ml-2" />
                </div>
              </div>

              {/* Type Dropdown */}
              <div>
                <div className="text-sm font-medium mb-1">Type</div>
                <div className="h-[40px]"><TypeMultiSelect /></div>
              </div>
            </div>

            {/* Panel Placeholder to Ensure Something Renders */}
            <div className="bg-white p-4 rounded shadow">
              <LeftPanel />
            </div>
          </div>

          {/* Right side: Summary */}
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DebugProvider>
      <PlanProvider>
        <AppContent />
      </PlanProvider>
    </DebugProvider>
  );
}
