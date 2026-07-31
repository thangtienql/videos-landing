"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 bg-zinc-100 border rounded-full px-4 py-2 transition-colors flex-1 min-w-0 dark:bg-zinc-900 ${
        focused
          ? "border-zinc-500 dark:border-zinc-500"
          : "border-zinc-300 dark:border-zinc-800"
      }`}
    >
      <Search className="w-4 h-4 text-zinc-500 shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Tìm video..."
        className="bg-transparent outline-none text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 w-full"
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
