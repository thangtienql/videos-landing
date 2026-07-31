"use client";

import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ dates, value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 pr-9 text-sm text-zinc-300 outline-none focus:border-zinc-500 cursor-pointer"
      >
        <option value="">Tất cả ngày</option>
        {dates.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
