import React from "react";
import { useNavigate } from "react-router-dom";
import TwoColumnLayout from "../components/TwoColumnLayout";

export default function Summary() {
  const navigate = useNavigate();

  const leftContent = (
    <>
      <h2 className="text-2xl font-bold">Summary</h2>
      <p>Here's a recap of all selected options.</p>
      <div className="pt-6">
        <button
          onClick={() => navigate("/cloud-customer")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start Prototype Again
        </button>
      </div>
    </>
  );

  return <TwoColumnLayout leftContent={leftContent} rightContent={<div />} />;
}
