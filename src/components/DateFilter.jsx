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
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
              : "bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700"
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
