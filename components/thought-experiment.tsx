'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface ExperimentStep {
  id: string
  title: string
  content: string
  choices?: Array<{ id: string; label: string; nextStep: string }>
  conclusion?: string
}

export interface ThoughtExperiment {
  id: string
  title: string
  description: string
  steps: ExperimentStep[]
  startStep: string
}

interface ThoughtExperimentProps {
  experiment: ThoughtExperiment
}

export default function ThoughtExperiment({
  experiment,
}: ThoughtExperimentProps) {
  const [currentStepId, setCurrentStepId] = useState(experiment.startStep)
  const [path, setPath] = useState<string[]>([experiment.startStep])

  const currentStep = experiment.steps.find((s) => s.id === currentStepId)

  const handleChoice = (nextStep: string) => {
    setCurrentStepId(nextStep)
    setPath([...path, nextStep])
  }

  const resetExperiment = () => {
    setCurrentStepId(experiment.startStep)
    setPath([experiment.startStep])
  }

  if (!currentStep) return null

  return (
    <div className='mt-7 space-y-6'>
      <div className='border border-rurikon-border rounded-sm p-4 sm:p-6 bg-rurikon-50'>
        <h3 className='font-semibold text-rurikon-600 text-lg mb-2'>
          {experiment.title}
        </h3>
        <p className='text-sm text-rurikon-400'>{experiment.description}</p>
      </div>

      {/* Current step */}
      <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
        <div className='mb-4'>
          <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
            Step {path.length}
          </span>
          <h4 className='font-semibold text-rurikon-600 text-base mt-1 mb-3'>
            {currentStep.title}
          </h4>
        </div>

        <div className='prose prose-sm max-w-none'>
          <p className='text-rurikon-400 leading-relaxed'>{currentStep.content}</p>
        </div>

        {/* Choices */}
        {currentStep.choices && currentStep.choices.length > 0 && (
          <div className='mt-6 space-y-3'>
            {currentStep.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.nextStep)}
                className={cn(
                  'w-full text-left p-4 border border-rurikon-border rounded-sm',
                  'bg-transparent hover:bg-rurikon-50 hover:border-rurikon-300',
                  'transition-all duration-200',
                  'text-sm text-rurikon-500'
                )}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}

        {/* Conclusion */}
        {currentStep.conclusion && !currentStep.choices && (
          <div className='mt-6 pt-6 border-t border-rurikon-border'>
            <blockquote className='pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 text-rurikon-400'>
              <p className='mt-0'>{currentStep.conclusion}</p>
            </blockquote>
            <button
              onClick={resetExperiment}
              className='mt-4 px-4 py-2 border border-rurikon-border bg-rurikon-50 hover:bg-rurikon-100 text-rurikon-600 text-xs font-mono uppercase tracking-tighter rounded-sm transition-colors'
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Path indicator */}
      {path.length > 1 && (
        <div className='flex items-center gap-2 text-xs text-rurikon-300 font-mono'>
          <span>Path:</span>
          {path.map((stepId, idx) => (
            <React.Fragment key={stepId}>
              <span
                className={cn(
                  idx === path.length - 1 && 'text-rurikon-500 font-semibold'
                )}
              >
                {idx + 1}
              </span>
              {idx < path.length - 1 && <span>→</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
