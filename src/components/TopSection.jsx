import React from "react";

export default function TopSection() {
  return (
    <div className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold">Top Section</div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 border rounded text-sm hover:bg-gray-100">Refresh</button>
        <button className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">New Item</button>
      </div>
    </div>
  );
}
