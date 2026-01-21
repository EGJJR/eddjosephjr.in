'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface DialogueLine {
  speaker: string
  text: string
  timestamp?: string
}

export interface PhilosophicalDialogue {
  id: string
  title: string
  participants: string[]
  lines: DialogueLine[]
  date: string
  theme?: string
}

interface PhilosophicalDialogueProps {
  dialogue: PhilosophicalDialogue
}

export default function PhilosophicalDialogue({
  dialogue,
}: PhilosophicalDialogueProps) {
  const [expandedLines, setExpandedLines] = useState<Set<number>>(new Set())

  const toggleLine = (idx: number) => {
    const newExpanded = new Set(expandedLines)
    if (newExpanded.has(idx)) {
      newExpanded.delete(idx)
    } else {
      newExpanded.add(idx)
    }
    setExpandedLines(newExpanded)
  }

  return (
    <div className='mt-7 space-y-6'>
      {/* Header */}
      <div className='border border-rurikon-border rounded-sm p-4 sm:p-6 bg-rurikon-50'>
        <h3 className='font-semibold text-rurikon-600 text-lg mb-2'>
          {dialogue.title}
        </h3>
        <div className='flex flex-wrap items-center gap-4 text-xs text-rurikon-400'>
          <div>
            <span className='font-mono uppercase tracking-tighter'>Participants:</span>{' '}
            {dialogue.participants.join(', ')}
          </div>
          <div>
            <span className='font-mono uppercase tracking-tighter'>Date:</span>{' '}
            {dialogue.date}
          </div>
          {dialogue.theme && (
            <div>
              <span className='font-mono uppercase tracking-tighter'>Theme:</span>{' '}
              {dialogue.theme}
            </div>
          )}
        </div>
      </div>

      {/* Dialogue lines */}
      <div className='space-y-4'>
        {dialogue.lines.map((line, idx) => {
          const isExpanded = expandedLines.has(idx)
          const isLong = line.text.length > 200

          return (
            <div
              key={idx}
              className={cn(
                'border-l-2 pl-4 sm:pl-6 py-2 transition-all duration-200',
                idx % 2 === 0
                  ? 'border-rurikon-300 bg-rurikon-50/50'
                  : 'border-rurikon-200 bg-transparent'
              )}
            >
              <div className='flex items-baseline gap-2 mb-1'>
                <span className='font-semibold text-rurikon-600 text-sm'>
                  {line.speaker}
                </span>
                {line.timestamp && (
                  <span className='font-mono text-xs text-rurikon-300'>
                    {line.timestamp}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'text-sm text-rurikon-400 leading-relaxed',
                  !isExpanded && isLong && 'line-clamp-3'
                )}
              >
                {line.text}
              </p>
              {isLong && (
                <button
                  onClick={() => toggleLine(idx)}
                  className='mt-2 text-xs text-rurikon-500 hover:text-rurikon-700 underline font-mono uppercase tracking-tighter'
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
