import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper"; // ✅ Make sure this import is present

export default function Summary() {
  const navigate = useNavigate();

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

  const leftContent = (
    <div className="bg-white p-4 rounded space-y-4 w-full">
      <button
        onClick={() => navigate("/cloud-customer")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Prototype Again
      </button>

      {/* Add your summary info below */}
      <div className="mt-6">
        <h4 className="font-semibold text-md mb-2">Summary Details</h4>
        <p className="text-sm text-gray-700">
          (You can show selected products, quantities, customer name, etc. here.)
        </p>
      </div>
    </div>
  );

  const rightContent = (
    <div className="bg-gray-200 p-4 rounded min-h-[200px] text-sm text-gray-700">
      <h3 className="font-semibold text-lg mb-2">Summary Panel</h3>
      <p>This area can be used for totals, final review steps, or next actions.</p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Summary</h2>
        <p className="text-gray-700">Here’s a recap of all selected options.</p>
        <ProgressStepper activeStep="Summary" onStepClick={handleStepClick} />
      </div>

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
