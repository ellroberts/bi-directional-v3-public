// components/ViewSelect.jsx
import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FaChevronDown } from "react-icons/fa";

const VIEW_OPTIONS = [
  { label: "Popular (500)", value: "popular" },
  { label: "All (1000)", value: "all" },
];

export default function ViewSelect({ value, onChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex h-10 w-[160px] items-center justify-between rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black">
        <span>
          {VIEW_OPTIONS.find((opt) => opt.value === value)?.label || "Select"}
        </span>
        <FaChevronDown className="text-xs ml-1" />
      </Popover.Trigger>

      <Popover.Content
        className="bg-white border rounded shadow p-2 z-50 min-w-[var(--radix-popover-trigger-width)]"
        sideOffset={4}
      >
        {VIEW_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`block w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-100 ${
              value === option.value ? "font-bold text-black" : "text-gray-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
