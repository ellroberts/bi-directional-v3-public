// src/components/LayoutWithFooter.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import FooterNav from "./FooterNav";

export default function LayoutWithFooter() {
  const location = useLocation();

  // You can customize which pages show the footer if needed
  const hideFooterOn = ["/summary"]; // Example if needed
  const showFooter = !hideFooterOn.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      {showFooter && <FooterNav />}
    </div>
  );
}
