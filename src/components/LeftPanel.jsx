import React from "react";
import { usePlan } from "./PlanContext";
import ItemGroup from "./ItemGroup";

export default function LeftPanel({ view, setView, selectedOnly, services, setServices, togglePin }) {
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

  return (
    <div>
      {services.map((group) => (
        <ItemGroup key={group.id} group={group} togglePin={togglePin} />
      ))}
    </div>
  );
}
