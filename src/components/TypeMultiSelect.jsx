import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FaChevronDown } from "react-icons/fa";

const FILTER_OPTIONS = ["Commercial", "Education", "Government", "Non-profit"];

export default function TypeMultiSelect() {
  const [selected, setSelected] = useState([]);

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="flex h-10 w-[160px] items-center justify-between rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50">
        <span>{selected.length > 0 ? `${selected.length} selected` : "Select"}</span>
        <FaChevronDown className="text-xs ml-1" />
      </Popover.Trigger>

      <Popover.Content
  className="bg-white border rounded shadow p-2 z-50 min-w-[var(--radix-popover-trigger-width)]"
  sideOffset={4}
>
        {FILTER_OPTIONS.map((label) => (
          <label
            key={label}
            className="flex items-center gap-2 py-1 px-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(label)}
              onChange={() => toggle(label)}
              className="accent-black"
            />
            {label}
          </label>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
