import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function EndDateAlignment() {
  const [customerType, setCustomerType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <h2 className="text-2xl font-bold">End Date Alignment</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper activeStep="End Date Alignment" />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
