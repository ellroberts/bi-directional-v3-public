import React from "react";

export default function HeaderBar() {
  return (
    <header className="w-full bg-[#1f1f1f] text-white h-12 flex items-center justify-between px-4 shadow-sm z-50">
      {/* Left side: Logo placeholder */}
      <div className="font-semibold text-sm">
        Ability<span className="text-pink-500">.</span>
      </div>

      {/* Right side: Placeholder user/tools */}
      <div className="text-xs opacity-75">
        Header tools / menu
      </div>
    </header>
  );
}
