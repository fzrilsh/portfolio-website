"use client"
import { useEffect } from "react"

export default function AntiInspect() {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault()

    const blockDevTools = (e: KeyboardEvent) => {
      const isMac = navigator.platform.includes('Mac')

      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (isMac && e.metaKey && e.altKey && ["Dead", "∆"].includes(e.key)) ||
        (e.ctrlKey && e.key.toUpperCase() === "U") ||
        (isMac && e.metaKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener("contextmenu", disableContextMenu)
    document.addEventListener("keydown", blockDevTools)

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu)
      document.removeEventListener("keydown", blockDevTools)
    }
  }, [])

  return null
}