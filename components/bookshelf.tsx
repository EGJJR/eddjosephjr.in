'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import cn from 'clsx'

export type BookStatus = 'READING' | 'COMPLETED' | 'TO-READ'

export interface Book {
  id: string
  title: string
  author: string
  status: BookStatus
  quotes?: string[]
  analysisLink?: string
  year?: string
}

interface BookshelfProps {
  books: Book[]
}

function StatusBadge({ status }: { status: BookStatus }) {
  const statusColors = {
    READING: 'text-rurikon-600 bg-rurikon-100',
    COMPLETED: 'text-rurikon-500 bg-rurikon-50',
    'TO-READ': 'text-rurikon-300 bg-transparent border border-rurikon-200',
  }

  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter',
        statusColors[status]
      )}
    >
      [{status}]
    </span>
  )
}

function BookDrawer({
  book,
  isOpen,
  onClose,
}: {
  book: Book
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-rurikon-900/20 backdrop-blur-sm',
        'transition-opacity duration-300',
        'opacity-100'
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'relative bg-[#fcfcfc] border border-rurikon-border',
          'max-w-2xl w-full max-h-[85vh] overflow-y-auto',
          'shadow-lg',
          'transition-transform duration-300',
          'scale-100'
        )}
        onClick={(e) => e.stopPropagation()}
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
            <h2 className='font-semibold text-rurikon-600 text-xl mb-2'>
              {book.title}
            </h2>
            <p className='text-rurikon-400 text-sm mb-3'>{book.author}</p>
            <StatusBadge status={book.status} />
          </div>

          {book.quotes && book.quotes.length > 0 && (
            <div className='mt-7'>
              <h3 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
                Favorite Quotes
              </h3>
              <div className='space-y-6'>
                {book.quotes.map((quote, idx) => (
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

          {book.analysisLink && (
            <div className='mt-7 pt-7 border-t border-rurikon-border'>
              <Link
                href={book.analysisLink}
                className='text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 transition-colors'
              >
                Read my analysis →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Bookshelf({ books }: BookshelfProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCloseDrawer = () => {
    setSelectedBook(null)
  }

  return (
    <>
      <div className='mt-7'>
        <ul className='space-y-3'>
          {books.map((book) => (
            <li
              key={book.id}
              className='group cursor-pointer'
              onClick={() => handleBookClick(book)}
            >
              <div
                className={cn(
                  'flex items-center gap-4 py-3 px-2 -mx-2 rounded-sm',
                  'border border-transparent',
                  'hover:border-rurikon-border hover:bg-rurikon-50/50',
                  'transition-all duration-200'
                )}
              >
                {/* Book Spine */}
                <div
                  className={cn(
                    'w-1 h-12 rounded-sm flex-shrink-0',
                    'bg-gradient-to-b',
                    book.status === 'COMPLETED'
                      ? 'from-rurikon-500 to-rurikon-600'
                      : book.status === 'READING'
                        ? 'from-rurikon-400 to-rurikon-500'
                        : 'from-rurikon-200 to-rurikon-300'
                  )}
                />

                {/* Book Info */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-baseline gap-2 flex-wrap'>
                    <h3 className='font-semibold text-rurikon-600 text-base'>
                      {book.title}
                    </h3>
                    {book.year && (
                      <span className='font-mono text-xs text-rurikon-300'>
                        {book.year}
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-rurikon-400 mt-0.5'>
                    {book.author}
                  </p>
                </div>

                {/* Status Badge */}
                <div className='flex-shrink-0'>
                  <StatusBadge status={book.status} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedBook ? (
        <BookDrawer
          book={selectedBook}
          isOpen={true}
          onClose={handleCloseDrawer}
        />
      ) : null}
    </>
  )
}
