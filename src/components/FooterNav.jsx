import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  "/cloud-customer",
  "/reseller-prerequisites",
  "/tenant",
  "/mca",
  "/subscriptions",
  "/add-ons",
  "/end-date-alignment",
  "/summary",
];

export default function FooterNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = steps.indexOf(location.pathname);
  const prevStep = steps[currentIndex - 1];
  const nextStep = steps[currentIndex + 1];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
      <div className="max-w-screen-xl mx-auto w-full px-4 py-3 flex justify-between">
        <button
          onClick={() => navigate(prevStep)}
          disabled={!prevStep}
          className={`px-4 py-2 rounded ${
            prevStep ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Back
        </button>
        <button
          onClick={() => navigate(nextStep)}
          disabled={!nextStep}
          className={`px-4 py-2 rounded ${
            nextStep ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {nextStep === "/summary" ? "Finish" : "Continue"}
        </button>
      </div>
    </div>
  );
}
