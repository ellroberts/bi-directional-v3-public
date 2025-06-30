import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

const SEGMENT_OPTIONS = ["Commercial", "Education", "Government", "Non-profit"];

export default function SegmentSelect({ onOpenChange }) {
  const [selected, setSelected] = useState("Commercial");
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    handleOpenChange(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          className={`flex h-10 w-[200px] items-center justify-between rounded-sm border bg-white px-3 py-2 text-sm text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            open ? 'border-black' : 'border-gray-200'
          }`}
          aria-label="Select Customer Segment"
        >
          <span className="flex items-center gap-2">
            {selected}
          </span>
          <i className="fa-solid fa-chevron-down text-xs ml-auto" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        className="bg-white border border-gray-200 rounded shadow-lg p-2 w-[200px] z-50"
        align="start"
        sideOffset={4}
      >
        <ul className="space-y-1">
          {SEGMENT_OPTIONS.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer text-sm"
            >
              {option}
            </li>
          ))}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
