import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PlanProvider } from "./components/PlanContext";
import { DebugProvider, useDebug } from "./components/DebugContext.jsx";
import DebugToggle from "./components/DebugToggle";
import Pagination from "./components/Pagination";
import ItemGroup from "./components/ItemGroup";
import TopSection from "./components/TopSection";

function AppContent() {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const { isRedline } = useDebug();

  const [view, setView] = useState("popular");
  const [selectedOnly, setSelectedOnly] = useState(false);

  return (
    <div className={`${isRedline ? "debug-all" : ""} min-h-screen bg-gray-50`}>
      <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col space-y-4 min-h-screen">
        <h2 className="text-2xl font-bold">Services</h2>

        <DebugToggle />

        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          {/* Left Column */}
          <div className="w-full md:w-2/3 flex flex-col space-y-4">
            {/* Left Column Panel */}
            <div className="bg-white p-4 rounded shadow flex-grow space-y-6">
              {/* Filters + Search Section */}
              <TopSection
  view={view}
  setView={setView}
  selectedOnly={selectedOnly}
  setSelectedOnly={setSelectedOnly}
/>

             {/* Plan content */}
             <LeftPanel view={view} setView={setView} selectedOnly={selectedOnly} />

{view !== "popular" &&
  [1, 2, 3, 4, 5].map((i) => (
    <ItemGroup
      key={`placeholder-${i}`}
      group={{
        id: `placeholder-${i}`,
        name: "Something else",
        options: [],
      }}
    />
  ))}

            </div>

            {/* Pagination only in left column */}
            <div className="pt-4 border-t">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DebugProvider>
      <PlanProvider>
        <AppContent />
      </PlanProvider>
    </DebugProvider>
  );
}
