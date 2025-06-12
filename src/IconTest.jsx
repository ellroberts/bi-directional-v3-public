import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function IconTest() {
  const [text, setText] = useState("");

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Icon Test</h2>

      <div className="relative w-64 border border-blue-400 p-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border px-3 py-2 pr-8"
          placeholder="Type here..."
        />

        {text.length > 0 ? (
          <FaTimes
            onClick={() => setText("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 cursor-pointer text-xl z-50"
          />
        ) : (
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl z-50" />
        )}
      </div>
    </div>
  );
}
