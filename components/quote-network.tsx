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
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {filteredQuotes.map((quote) => {
          const isSelected = selectedQuote === quote.id
          const isRelated =
            selectedQuote && relatedQuotes.some((q) => q.id === quote.id)

          return (
            <div
              key={quote.id}
              className={cn(
                'border rounded-sm p-4 sm:p-6 cursor-pointer transition-all duration-200',
                isSelected
                  ? 'bg-rurikon-100 border-rurikon-500 shadow-lg'
                  : isRelated
                    ? 'bg-rurikon-50 border-rurikon-300'
                    : 'bg-transparent border-rurikon-border hover:border-rurikon-300 hover:bg-rurikon-50/50'
              )}
              onClick={() => setSelectedQuote(isSelected ? null : quote.id)}
            >
              <blockquote className='pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 text-rurikon-400 mb-3'>
                <p className='mt-0 text-sm sm:text-base'>{quote.text}</p>
              </blockquote>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs text-rurikon-500 font-semibold'>
                    {quote.author}
                  </p>
                  <p className='text-xs text-rurikon-300'>{quote.source}</p>
                </div>
                {isRelated && (
                  <span className='font-mono text-[0.65rem] text-rurikon-400 uppercase tracking-tighter'>
                    Related
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Related quotes section */}
      {selectedQuote && relatedQuotes.length > 0 && (
        <div className='mt-7 pt-7 border-t border-rurikon-border'>
          <h3 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
            Related Quotes
          </h3>
          <div className='space-y-4'>
            {relatedQuotes.map((quote) => (
              <div
                key={quote.id}
                className='border-l-2 border-rurikon-300 pl-4 py-2 cursor-pointer hover:border-rurikon-400 transition-colors'
                onClick={() => setSelectedQuote(quote.id)}
              >
                <p className='text-sm text-rurikon-400'>{quote.text}</p>
                <p className='text-xs text-rurikon-300 mt-1'>{quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
