import React, { useState } from "react";
import { usePlan } from "./PlanContext";
import ItemGroup from "./ItemGroup";

export default function LeftPanel({ view, setView, selectedOnly }) {
  // STEP 2: Move service data into useState
  const [services, setServices] = useState([
    {
      name: "MS365 Business Basic",
      id: "ms365",
      options: [
        { id: "1", term: "Monthly", billing: "Monthly", price: 7, min: 10, isPinned: false },
        { id: "2", term: "Monthly", billing: "Annual", price: 7, min: 0, isPinned: false },
        { id: "3", term: "Annual", billing: "Annual", price: 7, min: 0, isPinned: false },
      ],
    },
    {
      name: "MS365 Business Standard",
      id: "standard",
      options: [
        { id: "standard-1", term: "Monthly", billing: "Monthly", price: 7, min: 10, max: 50, isPinned: false },
        { id: "standard-2", term: "Monthly", billing: "Annual", price: 7, min: 0, isPinned: false },
        { id: "standard-3", term: "Annual", billing: "Monthly", price: 7, min: 0, isPinned: false },
        { id: "standard-4", term: "Annual", billing: "Annual", price: 7, min: 0, isPinned: false },
      ],
    },
    {
      name: "MS365 Business Premium",
      id: "premium",
      options: [
        { id: "premium-1", term: "Monthly", billing: "Monthly", price: 7, min: 0, isPinned: false },
        { id: "premium-2", term: "Monthly", billing: "Annual", price: 7, min: 0, isPinned: false },
        { id: "premium-3", term: "Annual", billing: "Monthly", price: 7, min: 0, isPinned: false },
        { id: "premium-4", term: "Annual", billing: "Annual", price: 7, min: 0, isPinned: false },
      ],
    },
    {
      name: "Something else",
      id: "other-1",
      options: [],
    },
    {
      name: "Something else",
      id: "other-2",
      options: [],
    },
  ]);

  // STEP 3: Add the togglePin handler
  const togglePin = (groupId, optionId) => {
    setServices((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.map((opt) =>
                opt.id === optionId
                  ? { ...opt, isPinned: !opt.isPinned }
                  : opt
              ),
            }
          : group
      )
    );
  };

  // STEP 4: Update rendering for 'popular' (pinned) view
  if (view === "popular") {
    const pinnedGroups = services
      .map((group) => ({
        ...group,
        options: group.options.filter((opt) => opt.isPinned),
      }))
      .filter((group) => group.options.length > 0);

    if (pinnedGroups.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center bg-white text-center p-10 rounded-md">
          <div className="w-16 h-16 rounded-full bg-gray-200 mb-6" />
          <div className="text-lg font-semibold text-black mb-2">
            We’re sorry there are no pinned services available.
          </div>
          <button
            onClick={() => setView("all")}
            className="text-[#A34796] text-sm font-medium hover:underline"
          >
            Show all services
          </button>
        </div>
      );
    }

    return (
      <div>
        {pinnedGroups.map((group) => (
          <ItemGroup key={group.id} group={group} togglePin={togglePin} />
        ))}
      </div>
    );
  }

  // Default 'All services' view
  return (
    <div>
      {services.map((group) => (
        <ItemGroup key={group.id} group={group} togglePin={togglePin} />
      ))}
    </div>
  );
}
