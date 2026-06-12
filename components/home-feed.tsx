'use client'

import Link from 'next/link'
import cn from 'clsx'

type FindType = 'book' | 'article' | 'podcast' | 'video' | 'quote'

interface HomeFind {
  type: FindType
  title: string
  author: string
  url?: string
}

const now: HomeFind[] = [
  { type: 'book', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas' },
  { type: 'book', title: 'Designing Data-Intensive Applications', author: 'Kleppmann' },
  { type: 'podcast', title: 'Lex Fridman Podcast', author: 'Lex Fridman', url: 'https://lexfridman.com/podcast' },
  { type: 'book', title: 'The Myth of Sisyphus', author: 'Camus' },
]

const recent: HomeFind[] = [
  { type: 'book', title: 'Letters from a Stoic', author: 'Seneca' },
  { type: 'video', title: 'Building with React Server Components', author: 'Next.js Team' },
  { type: 'article', title: 'The Future of AI Engineering', author: 'Various' },
]

const typeLabel: Record<FindType, string> = {
  book: 'reading',
  article: 'read',
  podcast: 'listening',
  video: 'watched',
  quote: 'saved',
}

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
            <li key={item.title} className="flex items-baseline gap-2">
              <span className="font-mono text-[0.6rem] text-rurikon-200 uppercase w-14 flex-shrink-0 tracking-tight">
                {typeLabel[item.type]}
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
              </span>
              <span className="text-rurikon-300 text-sm">
                {item.author}
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
            <li key={item.title} className="flex items-baseline gap-2">
              <span className="font-mono text-[0.6rem] text-rurikon-200 uppercase w-14 flex-shrink-0 tracking-tight">
                {typeLabel[item.type]}
              </span>
              <span className="text-rurikon-500">
                {item.title}
              </span>
              <span className="text-rurikon-300 text-sm">
                {item.author}
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
