import React from "react";
import { useNavigate } from "react-router-dom";

export default function Step2() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Step 2: Add-ons</h2>
      <button 
        onClick={() => navigate("/summary")} 
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue to Summary
      </button>
    </div>
  );
}
