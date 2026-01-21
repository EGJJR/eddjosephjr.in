'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface ProjectVersion {
  id: string
  date: string
  description: string
  changes: string[]
  commit?: string
}

export interface ProjectArtifact {
  id: string
  name: string
  description: string
  versions: ProjectVersion[]
  currentVersion: string
}

interface ProjectArchaeologyProps {
  artifacts: ProjectArtifact[]
}

export default function ProjectArchaeology({
  artifacts,
}: ProjectArchaeologyProps) {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  const artifact = artifacts.find((a) => a.id === selectedArtifact)
  const version = artifact?.versions.find((v) => v.id === selectedVersion)

  return (
    <div className='mt-7 space-y-6'>
      {/* Artifacts list */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {artifacts.map((artifact) => {
          const isSelected = selectedArtifact === artifact.id

          return (
            <div
              key={artifact.id}
              className={cn(
                'border border-rurikon-border rounded-sm p-4 cursor-pointer transition-all duration-200',
                isSelected
                  ? 'bg-rurikon-100 border-rurikon-400 shadow-lg'
                  : 'bg-transparent hover:bg-rurikon-50 hover:border-rurikon-300'
              )}
              onClick={() => {
                setSelectedArtifact(isSelected ? null : artifact.id)
                setSelectedVersion(null)
              }}
            >
              <h3 className='font-semibold text-rurikon-600 text-base mb-2'>
                {artifact.name}
              </h3>
              <p className='text-sm text-rurikon-400 mb-3'>{artifact.description}</p>
              <div className='flex items-center gap-2'>
                <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                  {artifact.versions.length} versions
                </span>
                <span className='text-xs text-rurikon-300'>•</span>
                <span className='font-mono text-xs text-rurikon-300'>
                  Current: {artifact.currentVersion}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Version timeline */}
      {artifact && (
        <div className='mt-8 pt-8 border-t border-rurikon-border'>
          <h3 className='font-semibold text-rurikon-600 mb-6 text-sm uppercase tracking-wider'>
            Excavation: {artifact.name}
          </h3>

          <div className='relative'>
            {/* Timeline line */}
            <div className='hidden mobile:block absolute left-0 top-0 bottom-0 w-px bg-rurikon-border' />

            <div className='space-y-6 mobile:space-y-8'>
              {artifact.versions.map((v, idx) => {
                const isSelected = selectedVersion === v.id
                const isCurrent = v.id === artifact.currentVersion

                return (
                  <div
                    key={v.id}
                    className={cn(
                      'relative mobile:pl-8 cursor-pointer',
                      'transition-all duration-200'
                    )}
                    onClick={() => setSelectedVersion(isSelected ? null : v.id)}
                  >
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        'absolute left-0 top-1 w-3 h-3 rounded-full border-2 bg-[#fcfcfc]',
                        'mobile:block hidden',
                        isCurrent
                          ? 'border-rurikon-500 bg-rurikon-500'
                          : 'border-rurikon-border',
                        isSelected && 'ring-2 ring-rurikon-400 scale-125'
                      )}
                    />

                    {/* Version card */}
                    <div
                      className={cn(
                        'border rounded-sm p-4 sm:p-6',
                        isCurrent
                          ? 'bg-rurikon-100 border-rurikon-400'
                          : 'bg-transparent border-rurikon-border',
                        'hover:border-rurikon-300 transition-colors',
                        isSelected && 'shadow-lg'
                      )}
                    >
                      <div className='flex items-start justify-between gap-4 mb-3'>
                        <div>
                          <div className='flex items-center gap-2 mb-1'>
                            <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                              v{v.id}
                            </span>
                            {isCurrent && (
                              <span className='font-mono text-xs text-rurikon-500 uppercase tracking-tighter'>
                                Current
                              </span>
                            )}
                          </div>
                          <p className='font-mono text-xs text-rurikon-400'>
                            {v.date}
                          </p>
                        </div>
                        {v.commit && (
                          <span className='font-mono text-xs text-rurikon-300 flex-shrink-0'>
                            {v.commit.slice(0, 7)}
                          </span>
                        )}
                      </div>

                      <p className='text-sm text-rurikon-400 mb-3'>{v.description}</p>

                      {isSelected && v.changes.length > 0 && (
                        <div className='mt-4 pt-4 border-t border-rurikon-border'>
                          <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-2'>
                            Changes:
                          </p>
                          <ul className='space-y-1'>
                            {v.changes.map((change, changeIdx) => (
                              <li
                                key={changeIdx}
                                className='text-xs text-rurikon-400 flex items-start gap-2'
                              >
                                <span className='text-rurikon-300 mt-1'>•</span>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
