"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 bg-zinc-900 border rounded-full px-4 py-2 transition-colors w-full max-w-xs ${
        focused ? "border-zinc-500" : "border-zinc-800"
      }`}
    >
      <Search className="w-4 h-4 text-zinc-500 shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Tìm video..."
        className="bg-transparent outline-none text-sm placeholder:text-zinc-600 w-full"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-zinc-500 hover:text-white"
          aria-label="Xóa tìm kiếm"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
