'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface ReadingDay {
  date: string // YYYY-MM-DD
  count: number
  items: Array<{ title: string; type: string }>
}

interface ReadingHeatmapProps {
  days: ReadingDay[]
  year?: number
}

export default function ReadingHeatmap({
  days,
  year = new Date().getFullYear(),
}: ReadingHeatmapProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const getIntensityColor = (count: number) => {
    if (count === 0) return 'bg-rurikon-50'
    if (count === 1) return 'bg-rurikon-100'
    if (count === 2) return 'bg-rurikon-200'
    if (count >= 3) return 'bg-rurikon-300'
    return 'bg-rurikon-50'
  }

  const getIntensityText = (count: number) => {
    if (count === 0) return 'No activity'
    if (count === 1) return 'Light reading'
    if (count === 2) return 'Moderate reading'
    if (count >= 3) return 'Heavy reading'
    return 'No activity'
  }

  // Group days by month for better mobile display
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthDays = days.filter((day) => {
      const date = new Date(day.date)
      return date.getMonth() === i && date.getFullYear() === year
    })
    return { month: i, days: monthDays }
  })

  const selectedDayData = days.find((d) => d.date === selectedDay)

  return (
    <div className='mt-7 space-y-6'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <h3 className='font-semibold text-rurikon-600 text-sm uppercase tracking-wider'>
          {year} Reading Activity
        </h3>
        <div className='flex items-center gap-4 text-xs text-rurikon-400'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-rurikon-50 border border-rurikon-border' />
            <span>Less</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-rurikon-300 border border-rurikon-border' />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Calendar grid - responsive */}
      <div className='grid grid-cols-7 sm:grid-cols-14 gap-1 sm:gap-2'>
        {months.map(({ month, days: monthDays }) => {
          const monthName = new Date(year, month, 1).toLocaleString('default', {
            month: 'short',
          })
          const firstDay = new Date(year, month, 1).getDay()
          const daysInMonth = new Date(year, month + 1, 0).getDate()

          return (
            <React.Fragment key={month}>
              {/* Month label - only show on mobile for first day */}
              {firstDay === 0 && (
                <div className='col-span-7 sm:hidden text-xs text-rurikon-300 font-mono mb-2'>
                  {monthName}
                </div>
              )}
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className='hidden sm:block' />
              ))}
              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
                const dayData = monthDays.find((d) => d.date === dateStr)
                const count = dayData?.count || 0
                const isSelected = selectedDay === dateStr
                const isToday =
                  dateStr ===
                  new Date().toISOString().split('T')[0]

                return (
                  <div
                    key={dateStr}
                    className={cn(
                      'aspect-square rounded-sm border border-rurikon-border cursor-pointer transition-all duration-200',
                      getIntensityColor(count),
                      isSelected && 'ring-2 ring-rurikon-500 scale-110 z-10',
                      isToday && 'ring-1 ring-rurikon-400',
                      'hover:scale-105'
                    )}
                    onClick={() =>
                      setSelectedDay(isSelected ? null : dateStr)
                    }
                    title={`${dateStr}: ${getIntensityText(count)}`}
                  >
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-[0.5rem] sm:text-xs text-rurikon-400 font-mono'>
                        {dayNum}
                      </span>
                    </div>
                  </div>
                )
              })}
            </React.Fragment>
          )
        })}
      </div>

      {/* Selected day details */}
      {selectedDayData && (
        <div className='mt-7 pt-7 border-t border-rurikon-border'>
          <div className='mb-4'>
            <p className='font-mono text-sm text-rurikon-400'>
              {new Date(selectedDayData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className='text-xs text-rurikon-300 mt-1'>
              {getIntensityText(selectedDayData.count)} ({selectedDayData.count}{' '}
              items)
            </p>
          </div>
          <div className='space-y-2'>
            {selectedDayData.items.map((item, idx) => (
              <div
                key={idx}
                className='flex items-center gap-2 text-sm text-rurikon-400'
              >
                <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                  {item.type}
                </span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
