'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface Quote {
  id: string
  text: string
  source: string
  author: string
  tags: string[]
  relatedQuotes?: string[]
}

interface QuoteNetworkProps {
  quotes: Quote[]
}

export default function QuoteNetwork({ quotes }: QuoteNetworkProps) {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [filterTag, setFilterTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(quotes.flatMap((q) => q.tags)))

  const filteredQuotes = filterTag
    ? quotes.filter((q) => q.tags.includes(filterTag))
    : quotes

  const selectedQuoteData = quotes.find((q) => q.id === selectedQuote)
  const relatedQuotes = selectedQuoteData?.relatedQuotes
    ? quotes.filter((q) => selectedQuoteData.relatedQuotes?.includes(q.id))
    : []

  return (
    <div className='mt-7 space-y-7'>
      {/* Tag filters */}
      <div className='flex flex-wrap gap-2'>
        <button
          onClick={() => setFilterTag(null)}
          className={cn(
            'px-3 py-1 text-xs font-mono uppercase tracking-tighter rounded-sm border transition-colors',
            !filterTag
              ? 'bg-rurikon-100 border-rurikon-300 text-rurikon-600'
              : 'bg-transparent border-rurikon-200 text-rurikon-400 hover:border-rurikon-300'
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            className={cn(
              'px-3 py-1 text-xs font-mono uppercase tracking-tighter rounded-sm border transition-colors',
              filterTag === tag
                ? 'bg-rurikon-100 border-rurikon-300 text-rurikon-600'
                : 'bg-transparent border-rurikon-200 text-rurikon-400 hover:border-rurikon-300'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Quotes grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {filteredQuotes.map((quote) => {
          const isSelected = selectedQuote === quote.id
          const isRelated =
            selectedQuote && relatedQuotes.some((q) => q.id === quote.id)

          return (
            <div
              key={quote.id}
              className={cn(
                'border rounded-sm p-6 sm:p-8 cursor-pointer transition-all duration-300',
                'relative overflow-hidden',
                isSelected
                  ? 'bg-rurikon-100 border-rurikon-500 shadow-lg scale-[1.02]'
                  : isRelated
                    ? 'bg-rurikon-50 border-rurikon-300 shadow-sm'
                    : 'bg-transparent border-rurikon-border hover:border-rurikon-400 hover:bg-rurikon-50/50 hover:shadow-sm'
              )}
              onClick={() => setSelectedQuote(isSelected ? null : quote.id)}
            >
              {/* Decorative left border accent */}
              <div
                className={cn(
                  'absolute left-0 top-0 bottom-0 w-1 rounded-l-sm transition-colors duration-300',
                  isSelected
                    ? 'bg-rurikon-500'
                    : isRelated
                      ? 'bg-rurikon-300'
                      : 'bg-rurikon-200'
                )}
              />

              <blockquote className='pl-6 -ml-6 sm:pl-8 sm:-ml-8 md:pl-12 md:-ml-12 text-rurikon-400 mb-4 relative'>
                <p className='mt-0 text-base sm:text-lg leading-relaxed'>
                  {quote.text}
                </p>
              </blockquote>

              <div className='flex items-start justify-between gap-4 pt-4 border-t border-rurikon-border'>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm text-rurikon-600 font-semibold mb-1'>
                    {quote.author}
                  </p>
                  <p className='text-xs text-rurikon-400'>{quote.source}</p>
                </div>
                {isRelated && (
                  <span className='font-mono text-[0.65rem] text-rurikon-500 uppercase tracking-tighter bg-rurikon-100 px-2 py-1 rounded-sm flex-shrink-0'>
                    Related
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-rurikon-border'>
                {quote.tags.map((tag) => (
                  <span
                    key={tag}
                    className='font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-tighter'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Related quotes section */}
      {selectedQuote && relatedQuotes.length > 0 && (
        <div className='mt-10 pt-10 border-t border-rurikon-border'>
          <div className='mb-6'>
            <h3 className='font-semibold text-rurikon-600 mb-2 text-sm uppercase tracking-wider'>
              Related Quotes
            </h3>
            <p className='text-xs text-rurikon-400'>
              Quotes connected by similar themes and ideas
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {relatedQuotes.map((quote) => (
              <div
                key={quote.id}
                className='border-l-4 border-rurikon-300 pl-5 py-4 pr-4 cursor-pointer hover:border-rurikon-400 hover:bg-rurikon-50/50 rounded-r-sm transition-all duration-200'
                onClick={() => setSelectedQuote(quote.id)}
              >
                <blockquote className='pl-4 -ml-4 sm:pl-6 sm:-ml-6 text-rurikon-400 mb-3'>
                  <p className='mt-0 text-sm leading-relaxed'>{quote.text}</p>
                </blockquote>
                <div className='flex items-center justify-between'>
                  <p className='text-xs text-rurikon-500 font-semibold'>
                    {quote.author}
                  </p>
                  <p className='text-xs text-rurikon-300'>{quote.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
