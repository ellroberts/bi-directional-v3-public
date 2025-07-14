import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function Tenant() {
  const [hasExistingTenant, setHasExistingTenant] = useState(false);
  const [createNewTenant, setCreateNewTenant] = useState(false);
  const [domainPrefix, setDomainPrefix] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

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


  const isLinkMode = hasExistingTenant && !createNewTenant;
  const isCreateMode = createNewTenant && !hasExistingTenant;

  const handleCheckbox = (type) => {
    if (type === "new") {
      setCreateNewTenant(!createNewTenant);
      if (!createNewTenant) setHasExistingTenant(false);
    } else {
      setHasExistingTenant(!hasExistingTenant);
      if (!hasExistingTenant) setCreateNewTenant(false);
    }
  };

  const handleSubmit = () => {
    if (isLinkMode && !acceptTerms) {
      alert("Please accept the service terms before continuing.");
      return;
    }
    alert(`Proceeding with ${isLinkMode ? "existing" : "new"} tenant for domain: ${domainPrefix}`);
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">
      <div className="space-y-3">
        <label className="block font-semibold text-sm">Tenant</label>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={createNewTenant}
              onChange={() => handleCheckbox("new")}
            />
            <span>No, they have no previous Microsoft subscription</span>
          </label>

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={hasExistingTenant}
              onChange={() => handleCheckbox("existing")}
            />
            <span>Yes, they have an existing Microsoft subscription</span>
          </label>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium mb-1">Domain Prefix</label>
          <input
            type="text"
            placeholder="Enter domain prefix"
            value={domainPrefix}
            onChange={(e) => setDomainPrefix(e.target.value)}
            className="w-full border px-3 py-2 text-sm rounded"
          />
        </div>
      </div>

      {isLinkMode && (
        <div className="space-y-4 border-t pt-4">
          <button
            onClick={() => alert("Redirect to Microsoft login...")}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm font-medium"
          >
            Login to Microsoft Portal
          </button>

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>Confirm acceptance of Cloud Service Provider agreement</span>
          </label>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 text-sm mt-6"
      >
        {isLinkMode ? "Create Tenant Link" : "Create Tenant"}
      </button>
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-800">
      <h3 className="font-semibold text-lg mb-2">Tenant Setup</h3>
      <p>
        Specify whether this customer is creating a new Microsoft tenant or linking to an
        existing one. Enter a valid domain prefix to continue.
      </p>
      {isLinkMode && (
        <p className="mt-2 text-gray-600">
          You will need to log in to the Microsoft Portal and accept the CSP agreement before linking.
        </p>
      )}
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Tenant</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>
  
      <ProgressStepper activeStep="Tenant" onStepClick={handleStepClick} />
  
      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
  }