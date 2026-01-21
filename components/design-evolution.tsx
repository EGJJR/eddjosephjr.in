'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface DesignIteration {
  id: string
  version: string
  date: string
  image?: string
  description: string
  decisions: string[]
}

export interface DesignEvolution {
  id: string
  title: string
  iterations: DesignIteration[]
}

interface DesignEvolutionProps {
  evolution: DesignEvolution
}

export default function DesignEvolution({
  evolution,
}: DesignEvolutionProps) {
  const [selectedIteration, setSelectedIteration] = useState<string | null>(
    evolution.iterations[0]?.id || null
  )
  const [comparisonMode, setComparisonMode] = useState(false)

  const selectedIterationData = evolution.iterations.find(
    (i) => i.id === selectedIteration
  )

  return (
    <div className='mt-7 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h3 className='font-semibold text-rurikon-600 text-lg mb-2'>
            {evolution.title}
          </h3>
          <p className='text-sm text-rurikon-400'>
            {evolution.iterations.length} iterations
          </p>
        </div>
        <button
          onClick={() => setComparisonMode(!comparisonMode)}
          className={cn(
            'px-4 py-2 border rounded-sm text-xs font-mono uppercase tracking-tighter transition-colors',
            comparisonMode
              ? 'bg-rurikon-100 border-rurikon-300 text-rurikon-600'
              : 'bg-transparent border-rurikon-border text-rurikon-400 hover:border-rurikon-300'
          )}
        >
          {comparisonMode ? 'Single View' : 'Compare'}
        </button>
      </div>

      {/* Iteration selector */}
      <div className='flex flex-wrap gap-2'>
        {evolution.iterations.map((iteration) => {
          const isSelected = selectedIteration === iteration.id

          return (
            <button
              key={iteration.id}
              onClick={() => setSelectedIteration(iteration.id)}
              className={cn(
                'px-3 py-1.5 border rounded-sm text-xs font-mono uppercase tracking-tighter transition-all duration-200',
                isSelected
                  ? 'bg-rurikon-100 border-rurikon-400 text-rurikon-600'
                  : 'bg-transparent border-rurikon-border text-rurikon-400 hover:border-rurikon-300'
              )}
            >
              {iteration.version}
            </button>
          )
        })}
      </div>

      {/* Comparison mode */}
      {comparisonMode ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {evolution.iterations.map((iteration) => (
            <div
              key={iteration.id}
              className='border border-rurikon-border rounded-sm p-4 sm:p-6'
            >
              <div className='mb-3'>
                <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                  {iteration.version}
                </span>
                <span className='text-xs text-rurikon-300 mx-2'>•</span>
                <span className='font-mono text-xs text-rurikon-400'>
                  {iteration.date}
                </span>
              </div>
              {iteration.image && (
                <div className='mb-4 border border-rurikon-border rounded-sm overflow-hidden bg-rurikon-50'>
                  <img
                    src={iteration.image}
                    alt={iteration.version}
                    className='w-full h-auto'
                  />
                </div>
              )}
              <p className='text-sm text-rurikon-400 mb-3'>{iteration.description}</p>
              {iteration.decisions.length > 0 && (
                <div className='pt-3 border-t border-rurikon-border'>
                  <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-2'>
                    Decisions:
                  </p>
                  <ul className='space-y-1'>
                    {iteration.decisions.map((decision, idx) => (
                      <li
                        key={idx}
                        className='text-xs text-rurikon-400 flex items-start gap-2'
                      >
                        <span className='text-rurikon-300 mt-1'>•</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Single view */
        selectedIterationData && (
          <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
            <div className='mb-4'>
              <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                {selectedIterationData.version}
              </span>
              <span className='text-xs text-rurikon-300 mx-2'>•</span>
              <span className='font-mono text-xs text-rurikon-400'>
                {selectedIterationData.date}
              </span>
            </div>
            {selectedIterationData.image && (
              <div className='mb-4 border border-rurikon-border rounded-sm overflow-hidden bg-rurikon-50'>
                <img
                  src={selectedIterationData.image}
                  alt={selectedIterationData.version}
                  className='w-full h-auto'
                />
              </div>
            )}
            <p className='text-sm text-rurikon-400 mb-4 leading-relaxed'>
              {selectedIterationData.description}
            </p>
            {selectedIterationData.decisions.length > 0 && (
              <div className='pt-4 border-t border-rurikon-border'>
                <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-3'>
                  Design Decisions:
                </p>
                <ul className='space-y-2'>
                  {selectedIterationData.decisions.map((decision, idx) => (
                    <li
                      key={idx}
                      className='text-sm text-rurikon-400 flex items-start gap-2'
                    >
                      <span className='text-rurikon-300 mt-1'>•</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}
