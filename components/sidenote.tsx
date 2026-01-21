'use client'

import React, { useState } from 'react'
import cn from 'clsx'

interface SidenoteProps {
  id: string
  children: React.ReactNode
  note: string
  position?: 'left' | 'right'
}

export default function Sidenote({
  id,
  children,
  note,
  position = 'right',
}: SidenoteProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span className='relative inline-block'>
      <span
        className='underline decoration-dotted decoration-rurikon-300 cursor-help'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
      <sup className='font-mono text-[0.65rem] text-rurikon-400 ml-0.5'>
        {id}
      </sup>

      {/* Desktop: Sidenote in margin */}
      <span
        className={cn(
          'hidden mobile:block absolute top-0 w-[45%] text-xs text-rurikon-400',
          'pointer-events-none',
          position === 'right' ? 'left-[105%]' : 'right-[105%]',
          isHovered ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-200'
        )}
      >
        <span className='font-mono text-[0.65rem] text-rurikon-300 mr-1'>
          {id}
        </span>
        {note}
      </span>

      {/* Mobile: Tooltip */}
      {isHovered && (
        <div
          className={cn(
            'mobile:hidden absolute z-50 w-64 p-3 bg-[#fcfcfc] border border-rurikon-border rounded-sm shadow-lg',
            'text-xs text-rurikon-400',
            'bottom-full left-1/2 -translate-x-1/2 mb-2'
          )}
        >
          <span className='font-mono text-[0.65rem] text-rurikon-300 mr-1'>
            {id}
          </span>
          {note}
        </div>
      )}
    </span>
  )
}
