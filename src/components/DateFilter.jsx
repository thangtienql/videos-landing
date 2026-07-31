"use client";

export default function DateFilter({ dates, value, onChange }) {
  if (!dates || dates.length <= 1) return null;

  const options = ["Tất cả", ...dates];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {options.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d === "Tất cả" ? "" : d)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            (value === "" && d === "Tất cả") || value === d
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
