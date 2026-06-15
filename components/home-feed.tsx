'use client'

import Link from 'next/link'
import cn from 'clsx'
import curatedData from '@/app/curated/data.json'

// ponytail: pulls from curated data.json. No separate data source needed.

type FindType = 'book' | 'article' | 'podcast' | 'video' | 'quote' | 'paper' | 'course'

interface HomeFind {
  type: FindType
  title: string
  author: string
  url?: string
}

const typeLabel: Record<string, string> = {
  book: 'reading',
  article: 'read',
  podcast: 'listening',
  video: 'watched',
  quote: 'saved',
  paper: 'read',
  course: 'studying',
}

// Items with status "in-progress" are current, recent "consumed" items fill recently
const now: HomeFind[] = curatedData
  .filter((item: any) => item.status === 'in-progress')
  .map((item: any) => ({ type: item.type, title: item.title, author: item.author, url: item.url }))

const recent: HomeFind[] = curatedData
  .filter((item: any) => item.status === 'consumed' && item.type !== 'quote')
  .slice(0, 4)
  .map((item: any) => ({ type: item.type, title: item.title, author: item.author, url: item.url }))

export default function HomeFeed() {
  return (
    <div className="space-y-7">
      {/* Currently consuming */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-3">
          Currently
        </h2>
        <ul className="space-y-1.5">
          {now.map((item) => (
            <li key={item.title} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
              <span className="font-mono text-[0.6rem] text-rurikon-200 uppercase sm:w-14 flex-shrink-0 tracking-tight">
                {typeLabel[item.type] || item.type}
              </span>
              <span className="text-rurikon-500">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rurikon-700 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
                <span className="text-rurikon-300 text-sm ml-1">
                  {item.author}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Recently finished */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-3">
          Recently
        </h2>
        <ul className="space-y-1.5">
          {recent.map((item) => (
            <li key={item.title} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
              <span className="font-mono text-[0.6rem] text-rurikon-200 uppercase sm:w-14 flex-shrink-0 tracking-tight">
                {typeLabel[item.type] || item.type}
              </span>
              <span className="text-rurikon-500">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rurikon-700 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
                <span className="text-rurikon-300 text-sm ml-1">
                  {item.author}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/curated"
        className="block text-sm text-rurikon-400 hover:text-rurikon-600 transition-colors"
      >
        View all curated finds →
      </Link>
    </div>
  )
}
