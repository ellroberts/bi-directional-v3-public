import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PlanProvider } from "./components/PlanContext";
import TopSection from "./components/TopSection";
import { DebugProvider } from "./components/DebugContext.jsx";
import DebugToggle from "./components/DebugToggle";
import Pagination from "./components/Pagination";

export default function App() {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <PlanProvider>
      <DebugProvider>
        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-4 min-h-screen">

          {/* Top section */}
          <TopSection />

          {/* Debug toggle */}
          <DebugToggle />

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side: Pagination + LeftPanel */}
            <div className="w-full md:w-2/3 space-y-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
              <div className="bg-white p-4">
                <LeftPanel />
              </div>
            </div>

            {/* Right side: Summary */}
            <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-md">
              <RightPanel />
            </div>
          </div>
        </div>
      </DebugProvider>
    </PlanProvider>
  );
}
