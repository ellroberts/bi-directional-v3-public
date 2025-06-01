import React from "react";
import { useDebug } from "./DebugContext";

export default function DebugToggle() {
  const { isDebug, setIsDebug } = useDebug();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsDebug(!isDebug)}
        className={`text-sm px-4 py-1 rounded-md transition-all ${
          isDebug
            ? "bg-red-100 text-red-700 border border-red-300"
            : "bg-gray-100 text-gray-700 border border-gray-300"
        } hover:shadow`}
      >
        {isDebug ? "Hide Redlines" : "Show Redlines"}
      </button>
    </div>
  );
}
