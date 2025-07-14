import React from "react";

export default function FooterNav({
  canContinue = false,
  onContinue,
  showBack = true,
  onBack,
  backLabel = "Back",
}) {
  return (
    <footer className="sticky bottom-0 w-full bg-white border-t py-4 mt-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
        {showBack ? (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            {backLabel}
          </button>
        ) : (
          <div /> // Keep space if no back/close button
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
