'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import cn from 'clsx'
import curatedData from '@/app/curated/data.json'

interface SearchResult {
  title: string
  subtitle: string
  url?: string
  type: string
}

// ponytail: dedicated search page. No overlay, no z-index, no stacking context issues.

const sitePages: SearchResult[] = [
  { title: 'About', subtitle: 'Homepage and bio', url: '/', type: 'page' },
  { title: 'Thoughts', subtitle: 'Blog posts and essays', url: '/thoughts', type: 'page' },
  { title: 'Projects', subtitle: 'Work and side projects', url: '/projects', type: 'page' },
  { title: 'Curated', subtitle: 'Books, articles, videos, quotes', url: '/curated', type: 'page' },
  { title: 'Design System', subtitle: 'Colors, typography, components', url: '/design-system', type: 'page' },
  { title: 'Changelog', subtitle: 'Site updates and versions', url: '/changelog', type: 'page' },
]

const typeLabels: Record<string, string> = {
  book: 'Book', article: 'Article', video: 'Video', podcast: 'Podcast',
  paper: 'Paper', quote: 'Quote', course: 'Course', page: 'Page', reel: 'Reel',
}

function matchScore(item: SearchResult, q: string): number {
  const lower = q.toLowerCase()
  const title = item.title.toLowerCase()
  const sub = item.subtitle.toLowerCase()
  if (title === lower) return 100
  if (title.startsWith(lower)) return 80
  if (title.includes(lower)) return 60
  if (sub.includes(lower)) return 40
  const words = lower.split(/\s+/)
  const matched = words.filter(w => title.includes(w) || sub.includes(w))
  if (matched.length === words.length) return 30
  if (matched.length > 0) return 10 + matched.length * 5
  return 0
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const searchIndex = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = curatedData.map((item: any) => ({
      title: item.type === 'quote'
        ? (item.quote || item.title).slice(0, 80) + ((item.quote || item.title).length > 80 ? '…' : '')
        : item.title,
      subtitle: item.type === 'quote'
        ? `${item.author}`
        : `${item.author}${item.note ? ' · ' + item.note : ''}`,
      url: item.url || (item.type === 'quote' ? '/curated?type=quote' : `/curated?type=${item.type}`),
      type: item.type,
    }))
    return [...sitePages, ...items]
  }, [])

  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchIndex
      .map(item => ({ item, score: matchScore(item, query) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(r => r.item)
  }, [query, searchIndex])

  useEffect(() => { setSelectedIdx(0) }, [results])

  useEffect(() => {
    inputRef.current?.focus()
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [router])

  const navigate = (url: string) => {
    if (url.startsWith('http')) window.open(url, '_blank')
    else router.push(url)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const list = results.length > 0 ? results : (!query.trim() ? sitePages : [])
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, list.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && list[selectedIdx]?.url) { navigate(list[selectedIdx].url!) }
  }

  return (
    <div className="min-h-[60vh]">
      <div className="flex items-center justify-between mb-6 sm:mb-10">
        <h1 className="font-mono text-[0.7rem] uppercase tracking-widest text-rurikon-300">Search</h1>
        <button
          onClick={() => router.back()}
          className="text-rurikon-400 hover:text-rurikon-700 transition-colors text-sm flex items-center gap-2"
        >
          <span className="hidden sm:inline font-mono text-[0.65rem] text-rurikon-300 border border-rurikon-100 dark:border-rurikon-200 rounded px-1.5 py-0.5">ESC</span>
          <span>Back</span>
        </button>
      </div>

      {/* Search input */}
      <div className="flex items-center gap-3 sm:gap-4 border-b-2 border-rurikon-800 dark:border-rurikon-700 pb-3 sm:pb-4 mb-8 sm:mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-rurikon-400 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="flex-1 bg-transparent text-xl sm:text-2xl font-light text-rurikon-800 placeholder:text-rurikon-200 outline-none"
        />
      </div>

      {/* Quick links (no query) */}
      {!query.trim() && (
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-rurikon-300 mb-4 sm:mb-6">Quick links</p>
          <div className="space-y-0.5">
            {sitePages.map((p, i) => (
              <button
                key={p.url}
                onClick={() => navigate(p.url!)}
                onMouseEnter={() => setSelectedIdx(i)}
                className={cn(
                  'w-full text-left px-3 py-3 sm:px-4 sm:py-3.5 rounded-md transition-colors flex items-center justify-between gap-2',
                  i === selectedIdx ? 'bg-rurikon-50' : 'hover:bg-rurikon-50/60'
                )}
              >
                <span className="text-rurikon-800 text-[0.9rem] sm:text-base">{p.title}</span>
                <span className="text-xs sm:text-sm text-rurikon-300 flex-shrink-0">{p.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {query.trim() && results.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-rurikon-300">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-rurikon-300 mb-4 sm:mb-6">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          <div className="space-y-0.5">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => r.url && navigate(r.url)}
                onMouseEnter={() => setSelectedIdx(i)}
                className={cn(
                  'w-full text-left px-3 py-3 sm:px-4 sm:py-4 rounded-md transition-colors flex items-start gap-3 sm:gap-5',
                  i === selectedIdx ? 'bg-rurikon-50' : 'hover:bg-rurikon-50/60'
                )}
              >
                <span className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wide text-rurikon-300 mt-0.5 w-12 sm:w-16 flex-shrink-0">
                  {typeLabels[r.type] || r.type}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.9rem] sm:text-base text-rurikon-800 leading-normal break-words">{r.title}</div>
                  <div className="text-xs sm:text-sm text-rurikon-400 mt-1 line-clamp-2 leading-relaxed">{r.subtitle}</div>
                </div>
                {r.url?.startsWith('http') && (
                  <span className="text-rurikon-300 text-xs sm:text-sm mt-0.5 flex-shrink-0">↗</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
