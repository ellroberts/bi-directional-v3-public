import React from "react";
import { usePlan } from "./PlanContext";
import ItemGroup from "./ItemGroup";

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
      { id: "premium-trial", term: "Monthly", billing: "Free", price: 0, min: 0 } // ✅ New trial row
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
];

export default function LeftPanel({ view, setView, selectedOnly }) {
  if (view === "popular") {
    return (
      <div className="flex flex-col items-center justify-center bg-white text-center p-10 rounded-md">
        <div className="w-16 h-16 rounded-full bg-gray-200 mb-6" />
        <div className="text-lg font-semibold text-black space-y-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">No Popular Products Yet.</h3>
            <p className="text-base font-normal text-center mb-6">Your team hasn’t marked any products as popular. </p>
            <p className="text-base font-normal text-center mb-6">
              If you're an administrator, go to{" "}
              <a href="/supply-product-mapping" className="text-[#A34796] hover:underline font-medium">
                Supply Product Mapping
              </a>{" "}
              to add your most ordered products.
            </p>
            <p className="text-base font-normal text-center mb-6">
              Otherwise, explore{" "}
              <button onClick={() => setView("all")} className="text-[#A34796] hover:underline font-medium">
                all services
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.map((group) => (
        <ItemGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
