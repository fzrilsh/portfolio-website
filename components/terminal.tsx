"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { TerminalIcon, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TerminalOutput from "@/components/terminal-output"
import TerminalInput from "@/components/terminal-input"

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [showWelcome, setShowWelcome] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isPWAInstallable, setIsPWAInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const availableCommands = [
    { command: "help", description: "Show available commands" },
    { command: "about", description: "Display information about me" },
    { command: "experience", description: "Show my work experience" },
    { command: "skills", description: "List my technical skills" },
    { command: "achievements", description: "Display my awards and achievements" },
    { command: "projects", description: "Show my projects" },
    { command: "education", description: "Show my educational background" },
    { command: "contact", description: "Display my contact information" },
    { command: "clear", description: "Clear the terminal" },
    { command: "all", description: "Show all information" },
  ]

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const timer = setTimeout(() => {
      executeCommand("help")
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can add to home screen
      setIsPWAInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const installPWA = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    setDeferredPrompt(null)

    if (outcome === "accepted") {
      setIsPWAInstallable(false)
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output = ""

    switch (command) {
      case "help":
        output = "help"
        break
      case "about":
        output = "about"
        break
      case "experience":
        output = "experience"
        break
      case "skills":
        output = "skills"
        break
      case "achievements":
        output = "achievements"
        break
      case "projects":
        output = "projects"
        break
      case "education":
        output = "education"
        break
      case "contact":
        output = "contact"
        break
      case "clear":
        setHistory([])
        setShowWelcome(false)
        return
      case "all":
        output = "all"
        break
      case "":
        output = ""
        break
      default:
        output = `Command not found: ${command}. Type 'help' to see available commands.`
    }

    if (command !== "") {
      setHistory((prev) => [...prev, { command, output }])
    }
    setCurrentCommand("")
  }

  const handleCommandSubmit = (command: string) => {
    executeCommand(command)
  }

  const handleCommandClick = (command: string) => {
    executeCommand(command)
  }

  const changeFullscreen = () => {
    const element = document.documentElement
    if('requestFullscreen' in element) {
      element.requestFullscreen()
    }else if('webkitRequestFullscreen' in (element as any)){
      (element as any).webkitRequestFullscreen()
    }else if ('msRequestFullscreen' in (element as any)){
      (element as any).msRequestFullscreen()
    }
  }

  return (
    <div className="relative h-screen flex flex-col">
      <div className="flex items-center gap-2 p-2 bg-gray-900 border-b border-gray-800 rounded-t-lg">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" onClick={() => document.fullscreenElement && document.exitFullscreen()} />
          <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" onClick={changeFullscreen} />
        </div>
        <div className="flex-1 text-center text-sm text-gray-400">fazril@portfolio ~ </div>
        <div className="flex items-center gap-2">
          {isPWAInstallable && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-green-400 flex items-center gap-1"
              onClick={installPWA}
              aria-label="Install as app"
            >
              <Download className="h-3 w-3" /> Install
            </Button>
          )}
          <TerminalIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto bg-black bg-opacity-90 font-mono text-sm md:text-base relative"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 150, 0, 0.05) 1px, transparent 0)",
          backgroundSize: "25px 25px",
        }}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
            backgroundSize: "100% 4px",
          }}
          aria-hidden="true"
        />

        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-green-400"
            >
              <p className="mb-2">Welcome to my terminal!</p>
              <p>
                Type <span className="text-yellow-300">help</span> to see available commands or click on the suggestions
                below.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center text-green-400 mb-4">
              <span className="text-blue-400">fazril@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-white">$</span>
              <span className="ml-2">{item.command}</span>
            </div>
            <TerminalOutput type={item.output} />
          </div>
        ))}

        <div className="flex items-center text-green-400">
          <span className="text-blue-400">fazril@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-purple-400">~</span>
          <span className="text-white">$</span>
          <TerminalInput value={currentCommand} onChange={setCurrentCommand} onSubmit={handleCommandSubmit} />
        </div>
      </div>

      <div className="p-2 bg-gray-900 border-t border-gray-800 rounded-b-lg overflow-x-auto">
        <div className="flex gap-2 flex-wrap">
          {availableCommands.map((cmd) => (
            <Button
              key={cmd.command}
              variant="outline"
              size="sm"
              className="text-xs bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-green-400"
              onClick={() => handleCommandClick(cmd.command)}
              aria-label={`Run ${cmd.command} command: ${cmd.description}`}
            >
              {cmd.command}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
