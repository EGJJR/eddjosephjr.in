'use client'

import { useEffect, useRef, useState } from 'react'

const PIXEL_SIZE = 20

export default function PixelLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.scale(dpr, dpr)

    const cols = Math.ceil(w / PIXEL_SIZE)
    const rows = Math.ceil(h / PIXEL_SIZE)
    const total = cols * rows

    // Fisher-Yates shuffle to create random dissolve order
    const order = Array.from({ length: total }, (_, i) => i)
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }

    // Normalize each pixel's dissolve start to [0, 1]
    const dissolveAt = new Float32Array(total)
    for (let i = 0; i < total; i++) {
      dissolveAt[order[i]] = i / total
    }

    const style = getComputedStyle(document.documentElement)
    const bgColor = style.getPropertyValue('--background').trim() || '#fcfcfc'

    const DELAY = 150
    const DURATION = 700
    let t0: number | null = null

    function frame(now: number) {
      if (t0 === null) t0 = now + DELAY

      const elapsed = now - t0
      if (elapsed < 0) {
        ctx!.fillStyle = bgColor
        ctx!.fillRect(0, 0, w, h)
        requestAnimationFrame(frame)
        return
      }

      const progress = Math.min(elapsed / DURATION, 1)
      ctx!.clearRect(0, 0, w, h)

      let any = false
      for (let i = 0; i < total; i++) {
        const alpha = 1 - Math.min(1, Math.max(0, (progress - dissolveAt[i] * 0.7) / 0.3))
        if (alpha <= 0.01) continue
        any = true

        const col = i % cols
        const row = Math.floor(i / cols)
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = bgColor
        ctx!.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
      }

      if (!any || progress >= 1) {
        setVisible(false)
        return
      }

      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [])

  if (!visible) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    />
  )
}
