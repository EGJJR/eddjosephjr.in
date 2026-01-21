'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'education' | 'project' | 'achievement' | 'milestone'
  link?: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const sortedEvents = [...events].sort((a, b) => b.date.localeCompare(a.date))

  const getTypeColor = (type: TimelineEvent['type']) => {
    const colors = {
      education: 'bg-rurikon-100 border-rurikon-300',
      project: 'bg-rurikon-50 border-rurikon-200',
      achievement: 'bg-rurikon-200 border-rurikon-400',
      milestone: 'bg-rurikon-100 border-rurikon-300',
    }
    return colors[type]
  }

  return (
    <div className='mt-7'>
      <div className='relative'>
        {/* Vertical line - hidden on mobile, shown on desktop */}
        <div className='hidden mobile:block absolute left-0 top-0 bottom-0 w-px bg-rurikon-border' />

        <div className='space-y-8 mobile:space-y-12'>
          {sortedEvents.map((event, idx) => {
            const isSelected = selectedEvent === event.id
            const isEven = idx % 2 === 0

            return (
              <div
                key={event.id}
                className={cn(
                  'relative mobile:pl-8',
                  'cursor-pointer transition-all duration-200',
                  isSelected && 'z-10'
                )}
                onClick={() => setSelectedEvent(isSelected ? null : event.id)}
              >
                {/* Dot on timeline */}
                <div
                  className={cn(
                    'absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-rurikon-border bg-[#fcfcfc]',
                    'mobile:block hidden',
                    isSelected && 'ring-2 ring-rurikon-500 scale-125'
                  )}
                />

                {/* Event card */}
                <div
                  className={cn(
                    'border rounded-sm p-4 sm:p-6',
                    getTypeColor(event.type),
                    'hover:border-rurikon-400 transition-colors',
                    isSelected && 'border-rurikon-500 shadow-lg'
                  )}
                >
                  <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2'>
                    <div className='flex items-center gap-2'>
                      <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                        {event.type}
                      </span>
                      <span className='font-mono text-xs text-rurikon-400'>
                        {event.date}
                      </span>
                    </div>
                    <h3 className='font-semibold text-rurikon-600 text-base sm:text-lg'>
                      {event.title}
                    </h3>
                  </div>

                  {isSelected && (
                    <div className='mt-4 pt-4 border-t border-rurikon-border'>
                      <p className='text-sm text-rurikon-400 leading-relaxed'>
                        {event.description}
                      </p>
                      {event.link && (
                        <a
                          href={event.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-xs text-rurikon-500 hover:text-rurikon-700 underline mt-3 inline-block'
                        >
                          Learn more →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
