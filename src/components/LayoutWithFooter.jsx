import React from "react";
import { Outlet } from "react-router-dom";
import FooterNav from "./FooterNav";
import HeaderBar from "./HeaderBar";

export default function LayoutWithFooter() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Header */}
      <HeaderBar />

      {/* ✅ Main content grows to fill space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ✅ Footer */}
      <FooterNav />
    </div>
  );
}
