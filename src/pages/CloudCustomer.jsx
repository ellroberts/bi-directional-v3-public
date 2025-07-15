import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";
import Select from "react-select";
import { FooterNavContext } from "../components/FooterNavContext";
import { CloudCustomerFormContext } from "../context/CloudCustomerFormContext";

export default function CloudCustomer() {
  const navigate = useNavigate();

  const {
    customerType,
    setCustomerType,
    selectedExistingCustomer,
    setSelectedExistingCustomer,
    customerName,
    setCustomerName,
    msCustomerTypes,
    setMsCustomerTypes,
  } = useContext(CloudCustomerFormContext);

  const {
    setCanContinue,
    setOnContinue,
    setShowBack,
    setOnBack,
  } = useContext(FooterNavContext);

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
      return customerName.trim() !== "" && Object.values(msCustomerTypes).some(Boolean);
    }
    return false;
  };

  useEffect(() => {
    const complete = isStepComplete();
    setCanContinue(complete);
    setOnContinue(() => () => navigate("/reseller-prerequisites"));

    setShowBack(true);
    setOnBack(() => () => {
      // Replace this with your actual "exit flow" route
      navigate("/");
    });

    return () => {
      setOnBack(null);
    };
  }, [customerType, selectedExistingCustomer, customerName, msCustomerTypes]);

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
    const currentStepIndex = steps.indexOf("Cloud Customer");
    const targetStepIndex = steps.indexOf(stepName);
    if (targetStepIndex <= currentStepIndex) {
      navigate(routeMap[stepName]);
    }
  };

  const toggleMsType = (type) => {
    setMsCustomerTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const OptionCard = ({ type, label }) => (
    <div
      onClick={() => setCustomerType(type)}
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

      <ProgressStepper
        activeStep="Cloud Customer"
        onStepClick={handleStepClick}
      />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
