import React, { useContext } from "react";
import { FooterNavContext } from "./FooterNavContext";

export default function FooterNav() {
  const {
    canContinue,
    onContinue,
    showBack,
    onBack,
    backLabel = "Back",
  } = useContext(FooterNavContext);

  return (
    <footer className="sticky bottom-0 w-full bg-white border-t py-4 mt-4 z-10">
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
