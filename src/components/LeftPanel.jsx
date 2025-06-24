import React from "react";
import { usePlan } from "./PlanContext";
import ItemGroup from "./ItemGroup";
import { FaThLarge } from "react-icons/fa";

const data = [
  {
    name: "MS365 Business Basic",
    id: "ms365",
    options: [
      { id: "1", term: "Monthly", billing: "Monthly", price: 7, min: 10 },
      { id: "2", term: "Monthly", billing: "Annual", price: 7, min: 0 },
      { id: "3", term: "Annual", billing: "Annual", price: 7, min: 0 },
    ],
  },
  {
    name: "MS365 Business Standard",
    id: "standard",
    options: [
      { id: "standard-1", term: "Monthly", billing: "Monthly", price: 7, min: 10, max: 50 },
      { id: "standard-2", term: "Monthly", billing: "Annual", price: 7, min: 0 },
      { id: "standard-3", term: "Annual", billing: "Monthly", price: 7, min: 0 },
      { id: "standard-4", term: "Annual", billing: "Annual", price: 7, min: 0 },
    ],
  },
  {
    name: "MS365 Business Premium",
    id: "premium",
    options: [
      { id: "premium-1", term: "Monthly", billing: "Monthly", price: 7, min: 0 },
      { id: "premium-2", term: "Monthly", billing: "Annual", price: 7, min: 0 },
      { id: "premium-3", term: "Annual", billing: "Monthly", price: 7, min: 0 },
      { id: "premium-4", term: "Annual", billing: "Annual", price: 7, min: 0 },
    ],
  },
  {
    name: "Dynamics 365 Finance Premium (30-day trial)",
    id: "dynamics-finance-premium-trial",
    options: [
      { id: "1", term: "Monthly", billing: "Free trial", price: 0, min: 25, max: 25 },
    ],
  },
];

export default function LeftPanel({ view, setView, selectedOnly, searchTerm = "" }) {
  const { selected } = usePlan();

  const filteredData = data.filter(service => {
    const selectedGroup = selected[service.id];

    if (selectedOnly) {
      const hasSelection = selectedGroup && Object.values(selectedGroup).some(opt => parseInt(opt.qty, 10) > 0);
      if (!hasSelection) return false;
    }

    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const serviceName = service.name.toLowerCase();

    if (searchLower.includes("trial") || searchLower.includes("free")) {
      if (serviceName.includes("trial")) return true;
      const hasFreeOptions = service.options.some(
        option => option.billing && option.billing.toLowerCase().includes("free")
      );
      if (hasFreeOptions) return true;
    }

    return serviceName.includes(searchLower);
  });

  const showPopularEmpty = view === "popular" && !selectedOnly;

  if (showPopularEmpty || (selectedOnly && filteredData.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center bg-white text-center p-10 rounded-md">
        <div className="w-16 h-16 rounded-full bg-gray-100 mb-6 flex items-center justify-center">
          <FaThLarge className="text-2xl text-[#A34796]" />
        </div>
        <div className="text-lg font-semibold text-black space-y-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">
              {selectedOnly
                ? "Title TBD"
                : "Ready to feature your top products?"}
            </h3>
            <p className="text-base font-normal text-center mb-6">
              {selectedOnly ? (
                <>
                  Some text, some more text.
                </>
              ) : (
                <>
                  If you're an administrator, go to {" "}
                  <a href="/supply-product-mapping" className="text-[#A34796] hover:underline font-medium">
                    Supply Product Mapping
                  </a>{" "}
                  to add the products your team orders most.
                  <br /><br />
                  Otherwise, explore {" "}
                  <button onClick={() => setView("all")} className="text-[#A34796] hover:underline font-medium">
                    all services
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {filteredData.length > 0 ? (
  filteredData.map((group, index) => (
    <ItemGroup key={group.id} group={group} index={index} />
  ))
) : (
  <div className="flex flex-col items-center justify-center bg-white text-center p-10 rounded-md">
    <div className="w-16 h-16 rounded-full bg-gray-100 mb-6 flex items-center justify-center">
      <FaThLarge className="text-2xl text-[#A34796]" />
    </div>
    <div className="text-lg font-semibold text-black space-y-6">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">
          No services found
        </h3>
        <p className="text-base font-normal text-center mb-6">
          Try searching for <span className="font-medium">“trial”</span>, <span className="font-medium">“free”</span>, or a service name.
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
