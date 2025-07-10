import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function ResellerPrerequisites() {
  const [partnerId, setPartnerId] = useState("");

  const handleViewTerms = () => {
    // You can replace this with a modal, external link, or download
    alert("Opening Service Terms PDF...");
    // Example: window.open('/service-terms.pdf', '_blank');
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
      <p>Enter your Partner ID as registered with Microsoft, and make sure to review the Service Terms (SST) before proceeding.</p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Reseller Prerequisites</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper activeStep="Reseller prerequisites" />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
