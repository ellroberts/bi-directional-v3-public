
import React, { useState } from "react";
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
      { id: "standard-1", term: "Monthly", billing: "Monthly", price: 7, min: 10, max: 50, },
      { id: "standard-2", term: "Monthly", billing: "Annual", price: 7, min: 0, },
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

export default function LeftPanel() {
  return (
    <div>
      {data.map((group) => (
        <ItemGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
