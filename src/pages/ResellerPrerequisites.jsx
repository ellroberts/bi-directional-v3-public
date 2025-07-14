import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function ResellerPrerequisites() {
  const [partnerId, setPartnerId] = useState("");

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

  const handleViewTerms = () => {
    alert("Opening Service Terms PDF...");
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">
      {/* Partner ID */}
      <div>
        <label className="block text-sm font-medium mb-1">Partner ID</label>
        <input
          type="text"
          placeholder="Partner ID"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
        />
      </div>

      {/* Service Terms */}
      <div>
        <h4 className="text-md font-semibold mb-2">Specific service terms (SST)</h4>
        <button
          onClick={handleViewTerms}
          className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 text-sm"
        >
          View Service Terms
        </button>
      </div>
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-800">
      <h3 className="font-semibold text-lg mb-2">Partner Information</h3>
      <p>
        Enter your Partner ID as registered with Microsoft, and make sure to review the
        Service Terms (SST) before proceeding.
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Reseller Prerequisites</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper activeStep="Reseller prerequisites" onStepClick={handleStepClick} />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
