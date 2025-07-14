import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";
import { FooterNavContext } from "../components/FooterNavContext";
import { ResellerFormContext } from "../context/ResellerFormContext";

export default function ResellerPrerequisites() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false); // ✅ modal control

  const {
    partnerId,
    setPartnerId
  } = useContext(ResellerFormContext);

  const {
    setCanContinue,
    setOnContinue,
    setShowBack,
    setOnBack,
  } = useContext(FooterNavContext);

  const isStepComplete = () => partnerId.trim() !== "";

  useEffect(() => {
    const complete = isStepComplete();
    setCanContinue(complete);
    setOnContinue(() => () => navigate("/tenant"));
    setShowBack(true);

    const steps = [
      "Cloud Customer",
      "Reseller prerequisites",
      "Tenant",
      "MCA",
      "Subscriptions",
      "Add Ons",
      "End Date Alignment",
    ];
    const currentIndex = steps.indexOf("Reseller prerequisites");
    if (currentIndex > 0) {
      setOnBack(() => () => navigate("/cloud-customer"));
    }
  }, [partnerId]);

  const handleStepClick = (stepName) => {
    const routeMap = {
      "Cloud Customer": "/cloud-customer",
      "Reseller prerequisites": "/reseller-prerequisites",
      "Tenant": "/tenant",
      "MCA": "/mca",
      "Subscriptions": "/subscriptions",
      "Add Ons": "/add-ons",
      "End Date Alignment": "/end-date-alignment",
    };
    const steps = Object.keys(routeMap);
    const current = steps.indexOf("Reseller prerequisites");
    const target = steps.indexOf(stepName);
    if (target <= current) navigate(routeMap[stepName]);
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Partner ID</label>
        <input
          type="text"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
          placeholder="Partner ID"
          className="w-full border px-3 py-2 rounded text-sm"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Specific service terms (SST)</h4>
        <button
          type="button"
          onClick={() => setShowModal(true)} // ✅ open modal
          className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded"
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
        Enter your Partner ID as registered with Microsoft, and make sure to review the Service
        Terms (SST) before proceeding.
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Reseller Prerequisites</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper
        activeStep="Reseller prerequisites"
        onStepClick={handleStepClick}
      />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />

      {/* ✅ MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-sm text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Service Terms PDF</h2>
            <div className="h-[400px] bg-gray-100 flex items-center justify-center rounded">
              <span className="text-sm text-gray-500">[PDF Placeholder]</span>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
