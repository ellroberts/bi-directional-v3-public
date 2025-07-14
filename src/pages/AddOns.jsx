import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function AddOns() {
  const [customerType, setCustomerType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate(); // ✅ Enables programmatic navigation

  const handleStepClick = (stepName) => {
    const routeMap = {
      "Cloud Customer": "/cloud-customer",
      "Reseller prerequisites": "/reseller-prerequisites",
      "Tenant": "/tenant",
      "MCA": "/mca",
      "Subscriptions": "/subscriptions",
      "Add Ons": "/add-ons",
      "End Date Alignment": "/end-date-alignment"
    };
    const path = routeMap[stepName];
    if (path) navigate(path);
  };


  const customerOptions = [
    { value: "csp", label: "CSP Customer" },
    { value: "indirect", label: "Indirect Customer" },
    { value: "direct", label: "Direct Customer" },
  ];

  const leftContent = (
    <div className="bg-white p-4 rounded space-y-4 w-full">
     
    </div>
  );

  const rightContent = (
    <div className="bg-gray-200 p-4 rounded min-h-[200px]">  
      {/* Optional helper or summary panel */}
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Add Ons</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper activeStep="Add Ons" onStepClick={handleStepClick} />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}