import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FaChevronDown } from "react-icons/fa";

const SEGMENT_OPTIONS = ["Commercial", "Education", "Government", "Non-profit"];

export default function SegmentSelect() {
  const [selected, setSelected] = useState("Commercial");
  const [open, setOpen] = useState(false); // add Popover open state

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false); // close the popover after selection
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className="flex h-10 w-[200px] items-center justify-between rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Select Customer Segment"
        >
          <span className="flex items-center gap-2">
            {selected}
          </span>
          <FaChevronDown className="text-xs ml-auto" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        className="bg-white border rounded shadow p-2 w-[200px] z-50"
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
