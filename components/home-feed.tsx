'use client'

import Link from 'next/link'
import curatedData from '@/app/curated/data.json'

// ponytail: shows last N curated items (non-quote), most recent first.
// Items at end of data.json are newest (admin form appends).

const typeLabel: Record<string, string> = {
  book: 'reading',
  article: 'read',
  podcast: 'listening',
  video: 'watched',
  quote: 'saved',
  paper: 'read',
  course: 'studying',
  reel: 'saved',
}

const recent = curatedData
  .filter((item: any) => item.type !== 'quote')
  .reverse()
  .slice(0, 6)

export default function HomeFeed() {
  return (
    <div className="space-y-7">
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-3">
          Recently
        </h2>
        <ul className="space-y-1.5">
          {recent.map((item: any) => (
            <li key={item.id} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
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
