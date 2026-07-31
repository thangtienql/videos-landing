"use client"

import { useState, useEffect } from "react"

const GITHUB_OWNER = "thangtienql"
const GITHUB_REPO = "videos-landing"

export default function StatsBar() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/videos`
        )
        if (!res.ok) return
        const dirs = await res.json()
        setCount(dirs.filter((e) => e.type === "dir").length)
      } catch {
        // silent
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
      <span>{count} video</span>
    </div>
  )
}
