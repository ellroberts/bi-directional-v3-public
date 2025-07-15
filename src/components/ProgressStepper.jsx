// src/components/ProgressStepper.jsx
import React from "react";

const steps = [
  "Cloud Customer",
  "Reseller prerequisites",
  "Tenant",
  "MCA",
  "Subscriptions",
  "Add Ons",
  "End Date Alignment"
];

export default function ProgressStepper({ activeStep, onStepClick }) {
  return (
    <div className="flex flex-wrap items-center space-x-2 text-sm font-medium text-gray-700">
      {steps.map((step, index) => {
        const isActive = step === activeStep;
        const isCompleted = steps.indexOf(activeStep) > index;

        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => onStepClick?.(step)}
              className={`px-3 py-1 rounded-full transition-colors ${
                isActive
                  ? "bg-pink-600 text-white"
                  : isCompleted
                  ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {step}
            </button>
            {index < steps.length - 1 && (
              <span className="mx-1 text-gray-400">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
