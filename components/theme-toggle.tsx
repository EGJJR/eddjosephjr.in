'use client'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')

    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next ? '#0c0d10' : '#fcfcfc')
  }

  if (!mounted) return <div className="w-5 h-5" />

  return (
    <button
      onClick={toggle}
      className="text-rurikon-300 hover:text-rurikon-600 transition-colors p-0.5 -m-0.5"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? (
        <SunIcon className="w-[14px] h-[14px]" />
      ) : (
        <MoonIcon className="w-[14px] h-[14px]" />
      )}
    </button>
  )
}
