'use client'

import { useState, useEffect, useCallback } from 'react'

interface Quote {
  text: string
  author: string
}

const quotes: Quote[] = [
  {
    text: 'A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyze a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects.',
    author: 'Robert Heinlein',
  },
  {
    text: 'Sustainable solutions based on innovation can create a more resilient world only if that innovation is focused on the health and well-being of its inhabitants. And it is at that point — where technology and human needs intersect — that we will find meaningful innovation.',
    author: 'Frans van Houten',
  },
  {
    text: 'The number one benefit of information technology is that it empowers people to do what they want to do. It lets people be creative. It lets people be productive. It lets people learn things they didn\u2019t think they could learn before, and so in a sense it is all about potential.',
    author: 'Steve Ballmer',
  },
]

const INTERVAL = 12000
const TRANSITION = 600

export default function RotatingQuote() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'visible' | 'blurring' | 'revealing'>('visible')

  const advance = useCallback(() => {
    setPhase('blurring')
    setTimeout(() => {
      setIndex((i) => (i + 1) % quotes.length)
      setPhase('revealing')
      setTimeout(() => setPhase('visible'), TRANSITION)
    }, TRANSITION)
  }, [])

  useEffect(() => {
    const id = setInterval(advance, INTERVAL)
    return () => clearInterval(id)
  }, [advance])

  const q = quotes[index]

  return (
    <div
      className="relative my-7 cursor-pointer select-none"
      onClick={advance}
      title="Click for next quote"
    >
      <div
        className="transition-all"
        style={{
          opacity: phase === 'blurring' ? 0 : 1,
          filter: phase === 'blurring' ? 'blur(8px)' : phase === 'revealing' ? 'blur(0px)' : 'blur(0px)',
          transitionDuration: `${TRANSITION}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <blockquote className="border-l border-rurikon-200 pl-4 ml-0">
          <p className="mt-0 font-serif text-rurikon-500 leading-relaxed text-[0.95rem]">
            {q.text}
          </p>
        </blockquote>
        <p className="mt-3 text-[0.8rem] text-rurikon-300 tracking-wide">
          ; {q.author}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-4 justify-center">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              if (i === index) return
              setPhase('blurring')
              setTimeout(() => {
                setIndex(i)
                setPhase('revealing')
                setTimeout(() => setPhase('visible'), TRANSITION)
              }, TRANSITION)
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 p-2 -m-1 ${
              i === index ? 'bg-rurikon-400' : 'bg-rurikon-200'
            }`}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
