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

  // ✅ Add togglePin to update pin status in App state
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

  const pinnedCount = services.reduce((count, group) => {
    return count + group.options.filter((opt) => opt.isPinned).length;
  }, 0);

  return (
    <div className={`${isRedline ? "debug-all" : ""} min-h-screen bg-gray-50`}>
      <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col space-y-4 min-h-screen">
        <h2 className="text-2xl font-bold">Services</h2>

        <DebugToggle />

        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          {/* Left Column */}
          <div className="w-full md:w-2/3 flex flex-col space-y-4">
            <div className="bg-white p-4 rounded shadow flex-grow space-y-6">
              <TopSection
                view={view}
                setView={setView}
                selectedOnly={selectedOnly}
                setSelectedOnly={setSelectedOnly}
                pinnedCount={pinnedCount}
              />

              <LeftPanel
                view={view}
                setView={setView}
                selectedOnly={selectedOnly}
                services={services}
                setServices={setServices}
                togglePin={togglePin}
              />

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

            <div className="pt-4 border-t">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>

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
