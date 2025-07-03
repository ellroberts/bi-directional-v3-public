import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function CloudCustomer() {
  const [customerType, setCustomerType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const customerOptions = [
    { value: "csp", label: "CSP Customer" },
    { value: "indirect", label: "Indirect Customer" },
    { value: "direct", label: "Direct Customer" },
  ];

  const leftContent = (
    <div className="bg-white p-4 rounded space-y-4 w-full">
      <label htmlFor="customerType" className="block font-medium">
        Cloud Customer Type:
      </label>

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex h-10 w-full items-center justify-between rounded-sm border bg-white px-3 py-2 text-sm text-black focus:outline-none ${
            dropdownOpen ? "border-black" : "border-gray-200"
          }`}
          aria-haspopup="listbox"
        >
          <span>
            {customerType
              ? customerOptions.find((o) => o.value === customerType)?.label
              : "Select"}
          </span>
          <i className="fa-solid fa-chevron-down text-xs ml-auto" />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg p-2 w-full z-50 mt-1">
            <ul className="space-y-1">
              {customerOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setCustomerType(option.value);
                    setDropdownOpen(false);
                  }}
                  className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const rightContent = (
    <div className="bg-gray-200 p-4 rounded min-h-[200px]">  
      {/* Optional helper or summary panel */}
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
