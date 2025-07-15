import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ProgressStepper from "../components/ProgressStepper";
import { FooterNavContext } from "../components/FooterNavContext";
import { MCAFormContext } from "../context/MCAFormContext";

export default function MCA() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    dateAgreed,
    setDateAgreed,
  } = useContext(MCAFormContext);

  const {
    setCanContinue,
    setOnContinue,
    setShowBack,
    setOnBack,
  } = useContext(FooterNavContext);

  const stepOrder = [
    { name: "Cloud Customer", path: "/cloud-customer" },
    { name: "Reseller prerequisites", path: "/reseller-prerequisites" },
    { name: "Tenant", path: "/tenant" },
    { name: "MCA", path: "/mca" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Add Ons", path: "/add-ons" },
    { name: "End Date Alignment", path: "/end-date-alignment" },
  ];

  const isStepComplete = () =>
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    dateAgreed.trim() !== "";

  useEffect(() => {
    setCanContinue(isStepComplete());
    setOnContinue(() => () => navigate("/subscriptions"));
    setShowBack(true);

    const currentIndex = stepOrder.findIndex(s => s.path === location.pathname);
    if (currentIndex > 0) {
      setOnBack(() => () => navigate(stepOrder[currentIndex - 1].path));
    }
  }, [firstName, lastName, email, dateAgreed, location.pathname]);

  const handleStepClick = (stepName) => {
    const routeMap = Object.fromEntries(stepOrder.map(step => [step.name, step.path]));
    const currentIndex = stepOrder.findIndex(step => step.path === location.pathname);
    const targetIndex = stepOrder.findIndex(step => step.name === stepName);

    if (targetIndex <= currentIndex) {
      navigate(routeMap[stepName]);
    }
  };

  const leftContent = (
    <div className="bg-white p-6 rounded space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Date Agreed</label>
          <input
            type="date"
            value={dateAgreed}
            onChange={e => setDateAgreed(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="bg-gray-50 p-4 rounded min-h-[200px] text-sm text-gray-800">
      <h3 className="font-semibold text-lg mb-2">MCA Agreement</h3>
      <p>
        Enter the representative's details and the date the Microsoft Customer Agreement (MCA) was agreed. This information is required to continue.
      </p>
    </div>
  );

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold">MCA</h2>
        <p className="text-gray-700">Complete the Microsoft Customer Agreement details.</p>
      </div>

      <ProgressStepper
        activeStep="MCA"
        onStepClick={handleStepClick}
      />

      <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
    </PageWrapper>
  );
}
