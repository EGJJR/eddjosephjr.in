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
    <div className='mt-7 space-y-6'>
      {/* Tag filters */}
      <div className='flex flex-wrap gap-1.5 pb-3 border-b border-rurikon-border'>
        <button
          onClick={() => setFilterTag(null)}
          className={cn(
            'px-2 py-1 text-[0.65rem] font-mono uppercase tracking-tighter transition-colors',
            !filterTag
              ? 'text-rurikon-600'
              : 'text-rurikon-300 hover:text-rurikon-500'
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            className={cn(
              'px-2 py-1 text-[0.65rem] font-mono uppercase tracking-tighter transition-colors',
              filterTag === tag
                ? 'text-rurikon-600'
                : 'text-rurikon-300 hover:text-rurikon-500'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Quotes grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {filteredQuotes.map((quote) => {
          const isSelected = selectedQuote === quote.id
          const isRelated =
            selectedQuote && relatedQuotes.some((q) => q.id === quote.id)

          return (
            <div
              key={quote.id}
              className={cn(
                'border-l border-rurikon-border pl-4 py-3 cursor-pointer transition-colors',
                isSelected
                  ? 'border-l-rurikon-500 bg-rurikon-50'
                  : isRelated
                    ? 'border-l-rurikon-300 bg-rurikon-50/50'
                    : 'hover:border-l-rurikon-300 hover:bg-rurikon-50/30'
              )}
              onClick={() => setSelectedQuote(isSelected ? null : quote.id)}
            >
              <blockquote className='text-rurikon-400 mb-2'>
                <p className='mt-0 text-sm leading-relaxed'>{quote.text}</p>
              </blockquote>

              <div className='flex items-center justify-between gap-3'>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-rurikon-500 font-semibold'>
                    {quote.author}
                  </p>
                  <p className='text-[0.65rem] text-rurikon-300'>{quote.source}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Related quotes section */}
      {selectedQuote && relatedQuotes.length > 0 && (
        <div className='mt-6 pt-6 border-t border-rurikon-border'>
          <h3 className='font-semibold text-rurikon-600 mb-3 text-xs uppercase tracking-wider'>
            Related
          </h3>
          <div className='space-y-3'>
            {relatedQuotes.map((quote) => (
              <div
                key={quote.id}
                className='border-l border-rurikon-300 pl-3 py-2 cursor-pointer hover:border-l-rurikon-400 hover:bg-rurikon-50/30 transition-colors'
                onClick={() => setSelectedQuote(quote.id)}
              >
                <blockquote className='text-rurikon-400 mb-1.5'>
                  <p className='mt-0 text-sm leading-relaxed'>{quote.text}</p>
                </blockquote>
                <p className='text-xs text-rurikon-500 font-semibold'>
                  {quote.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
