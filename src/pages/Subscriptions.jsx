import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import { PlanProvider, usePlan } from "../components/PlanContext";
import { DebugProvider, useDebug } from "../components/DebugContext";
import DebugToggle from "../components/DebugToggle";
import Pagination from "../components/Pagination";
import TopSection from "../components/TopSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import PageWrapper from "../components/PageWrapper";
import ProgressStepper from "../components/ProgressStepper";
import { FooterNavContext } from "../components/FooterNavContext";

function SubscriptionsContent() {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const { isRedline } = useDebug();

  const [view, setView] = useState("popular");
  const [selectedOnly, setSelectedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    setCanContinue,
    setOnContinue,
    setShowBack,
    setOnBack,
  } = useContext(FooterNavContext);

  const { selected } = usePlan();
  const navigate = useNavigate();

  useEffect(() => {
    setCanContinue(true);
    setOnContinue(() => () => navigate("/add-ons"));
    setShowBack(true);
    setOnBack(() => () => navigate("/mca"));

    return () => {
      setCanContinue(false);
      setOnContinue(null);
      setOnBack(null);
    };
  }, []);

  const handleStepClick = (stepName) => {
    const routeMap = {
      "Cloud Customer": "/cloud-customer",
      "Reseller prerequisites": "/reseller-prerequisites",
      "Tenant": "/tenant",
      "MCA": "/mca",
      "Subscriptions": "/subscriptions",
      "Add Ons": "/add-ons",
      "End Date Alignment": "/end-date-alignment",
    };
    const targetPath = routeMap[stepName];
    if (targetPath) {
      navigate(targetPath);
    }
  };

  const hasSelectedItems = Object.values(selected || {}).some(group =>
    Object.values(group).some(opt => parseInt(opt.qty, 10) > 0)
  );

  const isPopularEmpty = view === "popular";
  const isSelectedEmpty = view === "selected" && !hasSelectedItems;
  const isSearchEmpty = searchTerm.trim() !== "" && view === "all";

  const isEmptyState = isPopularEmpty || isSelectedEmpty || isSearchEmpty;

  const leftContent = (
    <div className="bg-white p-4 rounded shadow space-y-6 w-full min-h-[calc(100vh-200px)]">
      <DebugToggle />

      {/* ✅ Hide all filters in ALL empty states */}
      {!isEmptyState && (
        <TopSection
          view={view}
          setView={setView}
          selectedOnly={selectedOnly}
          setSelectedOnly={setSelectedOnly}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      <LeftPanel
        view={view}
        setView={setView}
        selectedOnly={selectedOnly}
        setSelectedOnly={setSelectedOnly}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* ✅ Hide pagination on all empty states */}
      {!isEmptyState && (
        <div className="pt-4 border-t">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="bg-gray-200 p-4 rounded w-full min-h-[calc(100vh-200px)]">
      <RightPanel />
    </div>
  );

  return (
    <div className={`${isRedline ? "debug-all" : ""}`}>
      <PageWrapper>
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-gray-700">Browse and select products to include in the plan.</p>
        </div>

        <ProgressStepper activeStep="Subscriptions" onStepClick={handleStepClick} />

        <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
      </PageWrapper>
    </div>
  );
}

export default function Subscriptions() {
  return (
    <DebugProvider>
      <PlanProvider>
        <SubscriptionsContent />
      </PlanProvider>
    </DebugProvider>
  );
}
