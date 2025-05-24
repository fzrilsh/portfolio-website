"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface TerminalInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
}

export default function TerminalInput({ value, onChange, onSubmit }: TerminalInputProps) {
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value)
    }
  }

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex items-center flex-1 ml-2 relative" onClick={handleContainerClick}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none text-green-400 w-full"
        aria-label="Terminal input"
        autoFocus
      />
      <span
        className={`absolute left-[${value.length * 0.6}ch] h-5 w-2 bg-green-400 ${
          cursorVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100`}
        style={{ left: `${value.length}ch` }}
        aria-hidden="true"
      />
    </div>
  )
}
