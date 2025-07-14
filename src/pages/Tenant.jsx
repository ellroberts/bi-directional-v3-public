import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";
import { FooterNavContext } from "../components/FooterNavContext";
import { TenantFormContext } from "../context/TenantFormContext";

export default function Tenant() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    tenantType,
    setTenantType,
    domainPrefix,
    setDomainPrefix,
    acceptedAffiliation,
    setAcceptedAffiliation
  } = useContext(TenantFormContext);

  const {
    setCanContinue,
    setOnContinue,
    setShowBack,
    setOnBack,
  } = useContext(FooterNavContext);

  const stepOrder = [
    { name: "Cloud Customer", path: "/cloud-customer" },
    { name: "Reseller prerequisites", path: "/reseller-prerequisites" },
    { name: "Tenant", path: "/tenant" },
    { name: "MCA", path: "/mca" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Add Ons", path: "/add-ons" },
    { name: "End Date Alignment", path: "/end-date-alignment" },
  ];

  const isStepComplete = () => {
    if (tenantType === "new") {
      return domainPrefix.trim() !== "";
    }
    if (tenantType === "existing") {
      return domainPrefix.trim() !== "" && acceptedAffiliation;
    }
    return false;
  };

  useEffect(() => {
    setCanContinue(isStepComplete());
    setOnContinue(() => () => navigate("/mca"));
    setShowBack(true);

    const currentIndex = stepOrder.findIndex((s) => s.path === location.pathname);
    if (currentIndex > 0) {
      setOnBack(() => () => navigate(stepOrder[currentIndex - 1].path));
    }
  }, [tenantType, domainPrefix, acceptedAffiliation, location.pathname]);

  const handleStepClick = (stepName) => {
    const routeMap = Object.fromEntries(stepOrder.map(step => [step.name, step.path]));
    const currentIndex = stepOrder.findIndex(step => step.path === location.pathname);
    const targetIndex = stepOrder.findIndex(step => step.name === stepName);

    if (targetIndex <= currentIndex) {
      navigate(routeMap[stepName]);
    }
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">

      <div className="space-y-4">
        <h3 className="text-md font-semibold mb-2">Tenant Type</h3>

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="radio"
            name="tenantType"
            value="new"
            checked={tenantType === "new"}
            onChange={() => setTenantType("new")}
          />
          <span>No, they have no previous Microsoft services or subscriptions</span>
        </label>

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="radio"
            name="tenantType"
            value="existing"
            checked={tenantType === "existing"}
            onChange={() => setTenantType("existing")}
          />
          <span>Yes, they have existing Microsoft services and subscriptions</span>
        </label>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Domain Prefix <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={domainPrefix}
          onChange={(e) => setDomainPrefix(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
          placeholder="e.g. yourcompany"
        />
      </div>

      {tenantType === "new" && (
        <div className="pt-4">
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm">
            Create Tenant
          </button>
        </div>
      )}

      {tenantType === "existing" && (
        <div className="space-y-4 pt-4">
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm">
            Login to Microsoft Portal
          </button>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={acceptedAffiliation}
              onChange={() => setAcceptedAffiliation(!acceptedAffiliation)}
            />
            <span>Confirm acceptance of Cloud Service Provider Affiliation</span>
          </label>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm">
            Create Tenant Link
          </button>
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-800">
      <h3 className="font-semibold text-lg mb-2">Tenant Setup</h3>
      <p>
        Choose whether to create a new Microsoft tenant or link to an existing one. Follow the steps based on your choice to continue.
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Tenant</h2>
        <p className="text-gray-700">Set up your Microsoft tenant details below.</p>
      </div>

      <ProgressStepper
        activeStep="Tenant"
        onStepClick={handleStepClick}
      />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
