"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // silent
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let stored = "dark";
    try {
      stored = localStorage.getItem("theme") || "dark";
    } catch {
      // silent
    }
    const isDark = stored === "dark";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors dark:bg-zinc-100 dark:border-zinc-300 dark:text-zinc-600 dark:hover:text-black dark:hover:border-zinc-400"
      aria-label="Đổi giao diện"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
