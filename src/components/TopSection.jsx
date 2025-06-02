import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { FaSearch } from "react-icons/fa";
import TypeMultiSelect from "./TypeMultiSelect"; // adjust path if needed

export default function TopSection() {
  return (
    <div className="w-full space-y-4 mb-10">
      <h2 className="text-2xl font-bold">Services</h2>

      <div className="flex flex-wrap items-end justify-between gap-6">
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
      {/* Outer circle */}
      <div
        className="h-4 w-4 bg-white rounded-full border border-gray-400 flex items-center justify-center
                   group-data-[state=checked]:border-black"
      >
        {/* Inner circle */}
        <div
          className="h-2 w-2 rounded-full bg-transparent group-data-[state=checked]:bg-black"
        />
      </div>

      {/* Label */}
      <span className={`text-sm ${bold ? "font-bold" : "text-gray-700"}`}>
        {label}
      </span>
    </RadioGroup.Item>
  ))}
</RadioGroup.Root>

        </div>

        {/* Type + Search Grouped */}
        <div className="flex gap-x-6">
          {/* Filter by Type */}
          <div>
            <div className="text-sm font-medium mb-1">Type</div>
            <TypeMultiSelect />
          </div>

          {/* Search Input */}
          <div>
            <div className="text-sm font-medium mb-1">Search</div>
            <div className="relative w-[160px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 py-2 pr-9 border rounded text-sm"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
