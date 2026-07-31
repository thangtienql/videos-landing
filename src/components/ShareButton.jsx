"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function ShareButton({ url }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Link2 className="w-4 h-4" />
      )}
      {copied ? "Đã copy" : "Copy link"}
    </button>
  );
}
