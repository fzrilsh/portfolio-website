"use client"

import { useEffect, useState } from "react"
import Terminal from "@/components/terminal"
import { useTheme } from "next-themes"
import AntiInspect from "@/lib/antiInspect"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setTheme("dark")

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          },
        )
      })
    }
  }, [setTheme])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono overflow-hidden">
      <AntiInspect />
      <Terminal />
    </main>
  )
}
