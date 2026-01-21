'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import cn from 'clsx'

export type ContentStatus = 'READING' | 'COMPLETED' | 'TO-READ' | 'WATCHING' | 'LISTENING' | 'PLANNED'
export type ContentType = 'book' | 'article' | 'podcast' | 'video' | 'course' | 'paper'

export interface ContentItem {
  id: string
  title: string
  author: string
  type: ContentType
  status: ContentStatus
  quotes?: string[]
  notes?: string
  analysisLink?: string
  externalLink?: string
  year?: string
  rating?: number
}

interface BookshelfProps {
  items: ContentItem[]
  isLoading?: boolean
}

function LoadingSkeleton() {
  return (
    <div className='mt-7 space-y-10'>
      {[1, 2].map((section) => (
        <div key={section}>
          <div className='h-4 w-24 bg-rurikon-200 mb-4 animate-pulse' />
          <ul className='space-y-3'>
            {[1, 2, 3].map((item) => (
              <li key={item}>
                <div className='flex items-center gap-4 py-3 px-2 -mx-2'>
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <div className='h-3 w-6 bg-rurikon-200 animate-pulse' />
                    <div className='w-1 h-12 rounded-sm bg-rurikon-200 animate-pulse' />
                  </div>
                  <div className='flex-1 min-w-0 space-y-2'>
                    <div className='h-4 w-3/4 bg-rurikon-200 animate-pulse' />
                    <div className='h-3 w-1/2 bg-rurikon-100 animate-pulse' />
                  </div>
                  <div className='h-5 w-16 bg-rurikon-100 animate-pulse rounded-sm' />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: ContentStatus }) {
  const statusColors = {
    READING: 'text-rurikon-600 bg-rurikon-100',
    COMPLETED: 'text-rurikon-500 bg-rurikon-50',
    'TO-READ': 'text-rurikon-300 bg-transparent border border-rurikon-200',
    WATCHING: 'text-rurikon-600 bg-rurikon-100',
    LISTENING: 'text-rurikon-600 bg-rurikon-100',
    PLANNED: 'text-rurikon-300 bg-transparent border border-rurikon-200',
  }

  const statusLabels: Record<ContentStatus, string> = {
    READING: 'READING',
    COMPLETED: 'COMPLETED',
    'TO-READ': 'TO-READ',
    WATCHING: 'WATCHING',
    LISTENING: 'LISTENING',
    PLANNED: 'PLANNED',
  }

  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter',
        statusColors[status]
      )}
    >
      [{statusLabels[status]}]
    </span>
  )
}

function TypeLabel({ type }: { type: ContentType }) {
  const labels: Record<ContentType, string> = {
    book: 'BK',
    article: 'AR',
    podcast: 'PC',
    video: 'VD',
    course: 'CR',
    paper: 'PR',
  }
  return (
    <span className='font-mono text-[0.65rem] text-rurikon-400 uppercase tracking-tighter'>
      {labels[type]}
    </span>
  )
}

function ContentDrawer({
  item,
  isOpen,
  onClose,
}: {
  item: ContentItem
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-rurikon-900/20 backdrop-blur-sm'
      )}
      onClick={onClose}
      style={{
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      <div
        className={cn(
          'relative bg-[#fcfcfc] border border-rurikon-border',
          'max-w-2xl w-full max-h-[85vh] overflow-y-auto',
          'shadow-lg'
        )}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'fadeInUp 0.5s ease-out',
        }}
      >
        <div className='p-6 sm:p-10 md:p-14'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 sm:top-6 sm:right-6 text-rurikon-300 hover:text-rurikon-600 transition-colors p-1'
            aria-label='Close'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path d='M5 5l10 10M15 5l-10 10' />
            </svg>
          </button>

          <div className='mb-7 pr-8'>
            <div className='flex items-center gap-2 mb-2'>
              <TypeLabel type={item.type} />
              <h2 className='font-semibold text-rurikon-600 text-xl'>
                {item.title}
              </h2>
            </div>
            <p className='text-rurikon-400 text-sm mb-3'>{item.author}</p>
            <div className='flex items-center gap-2'>
              <StatusBadge status={item.status} />
              {item.rating && (
                <span className='font-mono text-xs text-rurikon-300'>
                  {item.rating}/5
                </span>
              )}
            </div>
          </div>

          {item.notes && (
            <div className='mt-7'>
              <h3 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
                Notes
              </h3>
              <p className='text-rurikon-400'>{item.notes}</p>
            </div>
          )}

          {item.quotes && item.quotes.length > 0 && (
            <div className='mt-7'>
              <h3 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
                Favorite Quotes
              </h3>
              <div className='space-y-6'>
                {item.quotes.map((quote, idx) => (
                  <blockquote
                    key={idx}
                    className='pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 text-rurikon-400'
                  >
                    <p className='mt-0'>{quote}</p>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div className='mt-7 pt-7 border-t border-rurikon-border flex gap-4'>
            {item.analysisLink && (
              <Link
                href={item.analysisLink}
                className='text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 transition-colors'
              >
                Read my analysis →
              </Link>
            )}
            {item.externalLink && (
              <a
                href={item.externalLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 transition-colors'
              >
                View original →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Bookshelf({ items, isLoading = false }: BookshelfProps) {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item)
  }

  const handleCloseDrawer = () => {
    setSelectedItem(null)
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  // Group items by type
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = []
      acc[item.type].push(item)
      return acc
    },
    {} as Record<ContentType, ContentItem[]>
  )

  const typeLabels: Record<ContentType, string> = {
    book: 'Books',
    article: 'Articles',
    podcast: 'Podcasts',
    video: 'Videos',
    course: 'Courses',
    paper: 'Papers',
  }

  return (
    <>
      <div className='mt-7 space-y-10'>
        {Object.entries(groupedItems).map(([type, typeItems]) => (
          <div key={type}>
            <h2 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
              {typeLabels[type as ContentType]}
            </h2>
            <ul className='space-y-3'>
              {typeItems.map((item) => (
                <li
                  key={item.id}
                  className='group cursor-pointer'
                  onClick={() => handleItemClick(item)}
                >
                  <div
                    className={cn(
                      'flex items-center gap-4 py-3 px-2 -mx-2 rounded-sm',
                      'border border-transparent',
                      'hover:border-rurikon-border hover:bg-rurikon-50/50',
                      'transition-all duration-200'
                    )}
                  >
                    {/* Content Spine/Label */}
                    <div className='flex items-center gap-2 flex-shrink-0'>
                      <TypeLabel type={item.type} />
                      <div
                        className={cn(
                          'w-1 h-12 rounded-sm',
                          'bg-gradient-to-b',
                          item.status === 'COMPLETED'
                            ? 'from-rurikon-500 to-rurikon-600'
                            : item.status === 'READING' ||
                                item.status === 'WATCHING' ||
                                item.status === 'LISTENING'
                              ? 'from-rurikon-400 to-rurikon-500'
                              : 'from-rurikon-200 to-rurikon-300'
                        )}
                      />
                    </div>

                    {/* Content Info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-baseline gap-2 flex-wrap'>
                        <h3 className='font-semibold text-rurikon-600 text-base'>
                          {item.title}
                        </h3>
                        {item.year && (
                          <span className='font-mono text-xs text-rurikon-300'>
                            {item.year}
                          </span>
                        )}
                        {item.rating && (
                          <span className='font-mono text-xs text-rurikon-300'>
                            {item.rating}/5
                          </span>
                        )}
                      </div>
                      <p className='text-sm text-rurikon-400 mt-0.5'>
                        {item.author}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className='flex-shrink-0'>
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedItem ? (
        <ContentDrawer
          item={selectedItem}
          isOpen={true}
          onClose={handleCloseDrawer}
        />
      ) : null}
    </>
  )
}
