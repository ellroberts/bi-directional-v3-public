import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";

export default function Summary() {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const customerOptions = [
    { value: "csp", label: "CSP Customer" },
    { value: "indirect", label: "Indirect Customer" },
    { value: "direct", label: "Direct Customer" },
  ];

  const leftContent = (
    <div className="bg-white p-4 rounded space-y-4 w-full">
      <button
        onClick={() => navigate("/cloud-customer")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Prototype Again
      </button>
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
        <h2 className="text-2xl font-bold">Summary</h2>
        <p className="text-gray-700">Here’s a recap of all selected options.</p>
      </div>

      {/* Stepper removed from this page */}

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
