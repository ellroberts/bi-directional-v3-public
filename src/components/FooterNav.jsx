import React from "react";

export default function FooterNav({
  canContinue = false,
  onContinue,
  showBack = true,
  onBack,
}) {
  return (
    <footer className="w-full bg-white border-t py-4 mt-8 flex justify-between items-center px-6">
      <div />
      <div className="space-x-4">
        {showBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>
        )}
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`px-4 py-2 rounded text-white transition ${
            canContinue
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </footer>
  );
}
