import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function EndDateAlignment() {
  const [addToExisting, setAddToExisting] = useState(false);
  const [alignmentOption, setAlignmentOption] = useState("");

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


  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full text-sm">
      <div className="space-y-2">
        <h3 className="text-base font-medium">Subscription Alignment</h3>
        <p className="font-semibold text-gray-900">Important Information</p>
        <p>
          Where selected you already have an identical subscription. Check the box if you’d like to add the requested license(s) to this existing subscription. If you want to create a new subscription and begin a new term commitment, deselect this option.
        </p>

        <div className="border border-gray-300 rounded px-4 py-3 mt-4">
          <p className="font-medium text-gray-800">Microsoft 365 Business Standard</p>
          <p className="text-gray-700">1 license(s)</p>

          <label className="flex items-center mt-3 space-x-2">
            <input
              type="checkbox"
              checked={addToExisting}
              onChange={() => setAddToExisting(!addToExisting)}
              className="h-4 w-4"
            />
            <span>Add this product to existing subscription</span>
          </label>
        </div>
      </div>

      {addToExisting && (
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-sm">End Date Alignment (monthly subscriptions)</h4>

          <div className="bg-pink-50 text-pink-900 border border-pink-300 p-3 rounded text-xs">
            If you choose to add licenses onto your existing subscription it will automatically align itself to the current end date. Please note: as licensing is prorated and removal of licenses isn't allowed this may affect customer invoices. You may also not receive a full 1-month term if the new licenses are added mid-cycle. If you want the customer to have a full clean term, select a new subscription instead.
          </div>

          <p className="text-sm mt-1">Today’s Date: <strong>{today}</strong></p>

          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="align"
                checked={alignmentOption === "align"}
                onChange={(e) => setAlignmentOption(e.target.value)}
              />
              <span>Align to current subscription</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="start-new"
                checked={alignmentOption === "start-new"}
                onChange={(e) => setAlignmentOption(e.target.value)}
              />
              <span>Start a new subscription with a new billing monthly term</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-700">
      <h3 className="font-semibold text-lg mb-2">End Date Alignment</h3>
      <p>
        Decide whether to align this new product with an existing monthly subscription or start a fresh billing term. Alignment affects invoicing and license flexibility.
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">End Date Alignment</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper activeStep="End Date Alignment" onStepClick={handleStepClick} />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}