import React from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PlanProvider } from "./components/PlanContext";

export default function App() {
  return (
    <PlanProvider>
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <LeftPanel />
          </div>
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-md shadow-sm">
            <RightPanel />
          </div>
        </div>
      </div>
    </PlanProvider>
  );
}
