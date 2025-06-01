import React from "react";
import { usePlan } from "./PlanContext";
import { useDebug } from "./DebugContext";
import RightPanelRow from "./RightPanelRow";

export default function RightPanel() {
  const { selected } = usePlan();
  const { isDebug } = useDebug();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Title</h2>

      {Object.entries(selected).map(([groupId, options]) =>
        Object.entries(options).map(([optionId, opt]) => (
          <RightPanelRow
            key={`${groupId}-${optionId}`}
            groupId={groupId}
            optionId={optionId}
            opt={opt}
            isDebug={isDebug}
          />
        ))
      )}
    </div>
  );
}
