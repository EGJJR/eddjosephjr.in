'use client'

import { useEffect, useState } from 'react'

export default function PixelLoader() {
  const [phase, setPhase] = useState<'blur' | 'done'>('blur')

  useEffect(() => {
    // Start the reveal after a tick so the animation plays
    const id = requestAnimationFrame(() => setPhase('done'))
    return () => cancelAnimationFrame(id)
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none bg-[var(--background)]"
      style={{
        animation: 'blurReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      aria-hidden="true"
    />
  )
}

