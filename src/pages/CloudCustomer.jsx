import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function CloudCustomer() {
  const [customerType, setCustomerType] = useState("existing"); // 'existing' or 'new'
  const [selectedExistingCustomer, setSelectedExistingCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [msCustomerTypes, setMsCustomerTypes] = useState({
    commercial: true,
    education: false,
    government: false,
    nonprofit: false,
  });

  const existingCustomerOptions = [
    { value: "", label: "Select" },
    { value: "glassware", label: "Clear Glassware Ltd" },
    { value: "techco", label: "TechCo Global" },
    { value: "cloudlytics", label: "CloudLytics Inc" },
  ];

  const toggleMsType = (type) => {
    setMsCustomerTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCreateSubmit = () => {
    if (!customerName.trim()) {
      alert("Customer name is required.");
      return;
    }

    alert(`Customer Created: ${customerName}\nTypes: ${Object.entries(msCustomerTypes)
      .filter(([_, checked]) => checked)
      .map(([type]) => type)
      .join(", ")}`);
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">
      {/* Top dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Cloud Customer Type:</label>
        <select
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
        >
          <option value="existing">Find existing Cloud Customer</option>
          <option value="new">Create new Cloud Customer</option>
        </select>
      </div>

      {/* Existing Customer UI */}
      {customerType === "existing" && (
        <div className="space-y-4">
          <h4 className="text-md font-semibold border-b pb-1">Existing Cloud Customer</h4>
          <p className="text-sm text-gray-600">
            Find an existing Cloud Customer to be linked to this order, which will be connected to the Ability customer.
          </p>

          <div>
            <label className="block text-sm font-medium mb-1">Select Cloud Customer</label>
            <select
              value={selectedExistingCustomer}
              onChange={(e) => setSelectedExistingCustomer(e.target.value)}
              className="w-full border px-3 py-2 text-sm rounded"
            >
              {existingCustomerOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* New Customer Form */}
      {customerType === "new" && (
        <div className="space-y-6">
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
              Microsoft offers different licensing options based on the customer's status.
              Select the relevant categories if the customer qualifies for non-commercial licenses.
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
                  <i className="fa fa-info-circle text-gray-400 ml-1" />
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateSubmit}
            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 text-sm"
          >
            Create Test Customer
          </button>
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-800">
      {customerType === "existing" && (
        <>
          <h3 className="font-semibold text-lg mb-2">Select Existing Customer</h3>
          <p>Select a customer to link to this order. The list comes from your available cloud accounts.</p>
        </>
      )}
      {customerType === "new" && (
        <>
          <h3 className="font-semibold text-lg mb-2">New Customer Setup</h3>
          <p>Enter details for the new customer and choose their Microsoft license category.</p>
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

      <ProgressStepper activeStep="Cloud Customer" />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
