'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface CodePoem {
  id: string
  title: string
  code: string
  language: string
  explanation: string
  author?: string
  theme?: string
}

interface CodePoetryProps {
  poems: CodePoem[]
}

export default function CodePoetry({ poems }: CodePoetryProps) {
  const [selectedPoem, setSelectedPoem] = useState<string | null>(null)

  return (
    <div className='mt-7 space-y-8'>
      {poems.map((poem) => {
        const isSelected = selectedPoem === poem.id

        return (
          <div
            key={poem.id}
            className={cn(
              'border border-rurikon-border rounded-sm overflow-hidden transition-all duration-200',
              isSelected && 'border-rurikon-400 shadow-lg'
            )}
          >
            <div
              className={cn(
                'p-4 sm:p-6 cursor-pointer',
                isSelected ? 'bg-rurikon-50' : 'bg-transparent hover:bg-rurikon-50/50'
              )}
              onClick={() => setSelectedPoem(isSelected ? null : poem.id)}
            >
              <div className='flex items-start justify-between gap-4 mb-3'>
                <div>
                  <h3 className='font-semibold text-rurikon-600 text-base mb-1'>
                    {poem.title}
                  </h3>
                  {poem.author && (
                    <p className='text-xs text-rurikon-400'>{poem.author}</p>
                  )}
                </div>
                <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter flex-shrink-0'>
                  {poem.language}
                </span>
              </div>

              {/* Code block */}
              <pre className='bg-rurikon-50 border border-rurikon-border p-4 rounded-sm overflow-x-auto text-xs sm:text-sm font-mono text-rurikon-600'>
                <code>{poem.code}</code>
              </pre>
            </div>

            {/* Explanation - expands on click */}
            {isSelected && (
              <div className='px-4 sm:px-6 pb-4 sm:pb-6 pt-0 border-t border-rurikon-border bg-rurikon-50'>
                <p className='text-sm text-rurikon-400 leading-relaxed mt-4'>
                  {poem.explanation}
                </p>
                {poem.theme && (
                  <div className='mt-4 pt-4 border-t border-rurikon-border'>
                    <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                      Theme:
                    </span>
                    <p className='text-sm text-rurikon-400 mt-1'>{poem.theme}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
