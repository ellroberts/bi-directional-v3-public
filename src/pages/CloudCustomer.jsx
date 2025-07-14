import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";
import FooterNav from "../components/FooterNav";
import Select from "react-select";

export default function CloudCustomer() {
  const [customerType, setCustomerType] = useState("existing");
  const [selectedExistingCustomer, setSelectedExistingCustomer] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [creationMessage, setCreationMessage] = useState("");
  const [msCustomerTypes, setMsCustomerTypes] = useState({
    commercial: true,
    education: false,
    government: false,
    nonprofit: false,
  });

  const navigate = useNavigate();

  const existingCustomerOptions = [
    { value: "glassware", label: "Clear Glassware Ltd" },
    { value: "techco", label: "TechCo Global" },
    { value: "cloudlytics", label: "CloudLytics Inc" },
    { value: "nextwave", label: "NextWave Partners" },
    { value: "quanta", label: "Quanta Systems" },
    { value: "bytech", label: "Bytech Labs" },
  ];

  const isStepComplete = () => {
    if (customerType === "existing") {
      return selectedExistingCustomer !== null;
    }

    if (customerType === "new") {
      const hasName = customerName.trim() !== "";
      const hasType = Object.values(msCustomerTypes).some(Boolean);
      return hasName && hasType;
    }

    return false;
  };

  const handleStepClick = (stepName) => {
    if (!isStepComplete()) {
      setCreationMessage("⚠️ Please complete this step before continuing.");
      return;
    }

    const routeMap = {
      "Cloud Customer": "/cloud-customer",
      "Reseller prerequisites": "/reseller-prerequisites",
      "Tenant": "/tenant",
      "MCA": "/mca",
      "Subscriptions": "/subscriptions",
      "Add Ons": "/add-ons",
      "End Date Alignment": "/end-date-alignment",
    };
    const path = routeMap[stepName];
    if (path) navigate(path);
  };

  const toggleMsType = (type) => {
    setMsCustomerTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCreateSubmit = () => {
    if (!customerName.trim()) {
      setCreationMessage("⚠️ Customer name is required.");
      return;
    }

    const selectedTypes = Object.entries(msCustomerTypes)
      .filter(([_, checked]) => checked)
      .map(([type]) => type)
      .join(", ");

    setCreationMessage(`✅ Customer "${customerName}" created with types: ${selectedTypes}`);
    setCustomerName("");
  };

  const OptionCard = ({ type, label }) => (
    <div
      onClick={() => {
        setCustomerType(type);
        setCreationMessage(""); // Clear messages when switching
      }}
      className={`cursor-pointer border rounded p-4 w-full text-center font-medium text-sm transition
        ${
          customerType === type
            ? "border-pink-600 bg-pink-50 text-pink-700"
            : "border-gray-300 hover:border-gray-500"
        }`}
    >
      {label}
    </div>
  );

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">
      <div>
        <h3 className="text-md font-semibold mb-2">
          How would you like to set up the customer?
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <OptionCard type="existing" label="Find Existing" />
          <OptionCard type="new" label="Create New" />
        </div>
      </div>

      {customerType === "existing" && (
        <div className="space-y-4 pt-6">
          <label className="block text-sm font-medium mb-1">Select Cloud Customer</label>
          <Select
            options={existingCustomerOptions}
            value={selectedExistingCustomer}
            onChange={(selected) => setSelectedExistingCustomer(selected)}
            placeholder="Search or select a customer"
            className="text-sm"
            classNamePrefix="react-select"
            isClearable
          />
        </div>
      )}

      {customerType === "new" && (
        <div className="space-y-6 pt-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border px-3 py-2 text-sm rounded"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <h4 className="text-md font-semibold mb-1">Microsoft customer type</h4>
            <p className="text-sm text-gray-600 mb-3">
              Select all that apply to the customer's licensing status.
            </p>
            <div className="space-y-2">
              {[
                { key: "commercial", label: "Commercial" },
                { key: "education", label: "Education" },
                { key: "government", label: "Government" },
                { key: "nonprofit", label: "Nonprofit" },
              ].map((type) => (
                <label key={type.key} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={msCustomerTypes[type.key]}
                    onChange={() => toggleMsType(type.key)}
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateSubmit}
            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 text-sm"
          >
            Create
          </button>

          {creationMessage && (
            <div
              className={`mt-4 text-sm rounded border px-3 py-2 ${
                creationMessage.startsWith("✅")
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
              }`}
            >
              {creationMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-800">
      {customerType === "existing" ? (
        <>
          <h3 className="font-semibold text-lg mb-2">Select Existing Customer</h3>
          <p>
            Choose an existing Cloud Customer to connect with this order. The list is pulled from
            your directory.
          </p>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg mb-2">New Customer Setup</h3>
          <p>Fill in the customer name and choose their Microsoft license types.</p>
        </>
      )}
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">Cloud Customer</h2>
        <p className="text-gray-700">Set up details for your cloud customer here.</p>
      </div>

      <ProgressStepper activeStep="Cloud Customer" onStepClick={handleStepClick} />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />

      <FooterNav
        continueDisabled={!isStepComplete()}
        onContinue={() => navigate("/reseller-prerequisites")}
      />
    </PageWrapper>
  );
}
