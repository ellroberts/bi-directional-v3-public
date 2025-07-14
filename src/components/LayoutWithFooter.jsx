import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FooterNav from "./FooterNav";
import { FooterNavContext } from "./FooterNavContext";

export default function LayoutWithFooter() {
  const location = useLocation();
  const {
    canContinue,
    onContinue,
    showBack,
    onBack
  } = useContext(FooterNavContext);

  const hideFooterOn = ["/summary"];
  const showFooter = !hideFooterOn.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      {showFooter && (
        <FooterNav
          canContinue={canContinue}
          onContinue={onContinue}
          showBack={showBack}
          onBack={onBack}
        />
      )}
    </div>
  );
}
