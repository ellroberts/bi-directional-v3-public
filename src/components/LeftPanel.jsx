import React from "react";
import { usePlan } from "./PlanContext";
import ItemGroup from "./ItemGroup";

const data = [
  {
    name: "MS365 Business Basic",
    id: "ms365",
    options: [
      { id: "1", term: "Monthly", billing: "Monthly", price: 7, min: 10, description: "Best for small businesses starting out" },
      { id: "2", term: "Monthly", billing: "Annual", price: 7, min: 0, description: "Monthly billing, annual plan" },
      { id: "3", term: "Annual", billing: "Annual", price: 7, min: 0, description: "Best value annual plan" },
    ],
  },
  {
    name: "MS365 Business Standard",
    id: "standard",
    options: [
      { id: "standard-1", term: "Monthly", billing: "Monthly", price: 7, min: 10, max: 50, description: "Mid-tier productivity tools" },
      { id: "standard-2", term: "Monthly", billing: "Annual", price: 7, min: 0, description: "Monthly access, yearly commitment" },
      { id: "standard-3", term: "Annual", billing: "Monthly", price: 7, min: 0, description: "Annual plan, paid monthly" },
      { id: "standard-4", term: "Annual", billing: "Annual", price: 7, min: 0, description: "Full annual upfront billing" },
    ],
  },
  {
    name: "MS365 Business Premium",
    id: "premium",
    options: [
      { id: "premium-1", term: "Monthly", billing: "Monthly", price: 7, min: 0, description: "Premium monthly tools" },
      { id: "premium-2", term: "Monthly", billing: "Annual", price: 7, min: 0, description: "Billed monthly on a yearly plan" },
      { id: "premium-3", term: "Annual", billing: "Monthly", price: 7, min: 0, description: "Commit annually, pay monthly" },
      { id: "premium-4", term: "Annual", billing: "Annual", price: 7, min: 0, description: "Annual billing for premium" },
    ],
  },
  {
    name: "Dynamics 365 Finance Premium (30-day trial)",
    id: "dynamics-finance-premium-trial",
    options: [
      { id: "1", term: "Monthly", billing: "Free trial", price: 0, min: 25, max: 25, description: "Try for 30 days with full features" },
    ],
  },
];

export default function LeftPanel({ view, setView, selectedOnly, setSelectedOnly, searchTerm = "" }) {
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
          <i className="fa-solid fa-th-large text-2xl text-[#A34796]" />
        </div>
        <div className="text-lg font-semibold text-black space-y-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">
              {selectedOnly
                ? "Start building your order"
                : "Ready to feature your most popular products?"}
            </h3>
            <p className="text-base font-normal text-center mb-6">
              {selectedOnly ? (
                <>
                  <button
                    onClick={() => {
                      setSelectedOnly(false);
                      setView("all");
                    }}
                    className="text-[#A34796] hover:underline font-medium"
                  >
                    Add products
                  </button>
                  , then tick Selected only to view only those Items.
                </>
              ) : (
                <>
                  They’ll appear here once an administrator ticks them in{" "}
                  <a href="/supply-product-mapping" className="text-[#A34796] hover:underline font-medium">
                    Supplier Product Mapping.
                  </a>
                  <br /><br />
                  In the meantime,{" "}
                  <button
                    onClick={() => {
                      setSelectedOnly(false);
                      setView("all");
                    }}
                    className="text-[#A34796] hover:underline font-medium"
                  >
                    explore all
                  </button>{" "}
                  available products and services.
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
            <i className="fa-solid fa-th-large text-2xl text-[#A34796]" />
          </div>
          <div className="text-lg font-semibold text-black space-y-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">
                No products found
              </h3>
              <p className="text-base font-normal text-center mb-6">
                Try searching for <span className="font-medium">“trial”</span>, <span className="font-medium">“free”</span>, or a product name.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
