import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";

export default function MCA() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateAgreed, setDateAgreed] = useState("");

  const handleSave = () => {
    if (!firstName || !lastName || !email || !dateAgreed) {
      alert("Please complete all fields before saving.");
      return;
    }

    alert(`Saved:\n${firstName} ${lastName}\n${email}\nDate: ${dateAgreed}`);
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-4 w-full">
      <div className="space-y-2">
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Date Agreed</label>
        <input
          type="date"
          value={dateAgreed}
          onChange={(e) => setDateAgreed(e.target.value)}
          className="w-full border px-3 py-2 text-sm rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 text-sm"
      >
        Save MCA
      </button>
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded text-sm text-gray-800 min-h-[200px]">
      <h3 className="font-semibold text-lg mb-2">MCA Agreement</h3>
      <p>
        Please enter the full name, email, and agreement date of the person who accepted the Microsoft Cloud Agreement.
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">MCA</h2>
        <p className="text-gray-700">Enter the Microsoft Cloud Agreement details.</p>
      </div>

      <ProgressStepper activeStep="MCA" />
      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
