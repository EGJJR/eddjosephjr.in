'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import cn from 'clsx'

export type FindType = 'book' | 'article' | 'post' | 'video' | 'podcast' | 'paper' | 'course' | 'quote'
export type FilterType = FindType | 'content'
export type FindStatus = 'consumed' | 'in-progress' | 'queued'

export interface CuratedFind {
  id: string
  type: FindType
  title: string
  author: string
  date: string
  url?: string
  note?: string
  quote?: string
  tags?: string[]
  status?: FindStatus
  rating?: number
}

interface CuratedFeedProps {
  items: CuratedFind[]
}

const typeConfig: Record<FindType, { label: string; plural: string }> = {
  book: { label: 'Book', plural: 'Books' },
  article: { label: 'Article', plural: 'Articles' },
  post: { label: 'Post', plural: 'Posts' },
  video: { label: 'Video', plural: 'Videos' },
  podcast: { label: 'Podcast', plural: 'Podcasts' },
  paper: { label: 'Paper', plural: 'Papers' },
  course: { label: 'Course', plural: 'Courses' },
  quote: { label: 'Quote', plural: 'Quotes' },
}

function getDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '')
    return hostname
  } catch {
    return url
  }
}

// Fixed filter tabs in desired order. "content" groups videos + courses.
const filterTabs: { key: FilterType | 'all'; label: string; match: (t: FindType) => boolean }[] = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'paper', label: 'Papers', match: (t) => t === 'paper' },
  { key: 'content', label: 'Content', match: (t) => t === 'video' || t === 'course' || t === 'post' },
  { key: 'podcast', label: 'Podcasts', match: (t) => t === 'podcast' },
  { key: 'article', label: 'Articles', match: (t) => t === 'article' },
  { key: 'quote', label: 'Quotes', match: (t) => t === 'quote' },
  { key: 'book', label: 'Books', match: (t) => t === 'book' },
]

function TypeFilter({
  active,
  onSelect,
  counts,
}: {
  active: string | null
  onSelect: (key: string | null) => void
  counts: Record<string, number>
}) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-1 pb-4 border-b border-rurikon-border">
      {filterTabs.map((tab) => {
        const isActive = tab.key === 'all' ? !active : active === tab.key
        const count = tab.key === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : counts[tab.key] || 0

        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key === 'all' ? null : (isActive ? null : tab.key))}
            className={cn(
              'px-2.5 py-1.5 sm:py-1 text-[0.7rem] sm:text-[0.65rem] font-mono uppercase tracking-tight transition-colors rounded-sm',
              isActive
                ? 'text-rurikon-700 bg-rurikon-100'
                : 'text-rurikon-300 hover:text-rurikon-500'
            )}
          >
            {tab.label}
            <span className="ml-1 text-rurikon-200">{count}</span>
          </button>
        )
      })}
    </div>
  )
}

function FindCard({
  item,
  isExpanded,
  onToggle,
}: {
  item: CuratedFind
  isExpanded: boolean
  onToggle: () => void
}) {
  // ponytail: articles show summary inline (pull-quote style), no expand needed
  const isArticle = item.type === 'article'
  const hasDetails = !isArticle && !!(item.note || item.quote || (item.tags && item.tags.length > 0))

  return (
    <article className="group">
      <div
        className={cn(
          'py-4 transition-colors',
          hasDetails && 'cursor-pointer',
        )}
        onClick={hasDetails ? onToggle : undefined}
      >
        {/* Top row: type + date */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            {item.type !== 'quote' && (
              <span className="font-mono text-[0.6rem] uppercase tracking-tight text-rurikon-300">
                {typeConfig[item.type].label}
              </span>
            )}
            {item.status && (
              <span
                className={cn(
                  'inline-block w-1.5 h-1.5 rounded-full',
                  item.status === 'consumed' && 'bg-rurikon-400',
                  item.status === 'in-progress' && 'bg-rurikon-300',
                  item.status === 'queued' && 'bg-rurikon-200'
                )}
                title={item.status}
              />
            )}
          </div>
          <time className="font-mono text-[0.65rem] text-rurikon-200 tabular-nums">
            {item.date}
          </time>
        </div>

        {/* Content */}
        {item.type === 'quote' ? (
          <div className="py-2">
            <blockquote className="border-l border-rurikon-200 pl-4 ml-0">
              <p className="mt-0 font-serif text-rurikon-600 leading-relaxed text-[0.95rem]">
                {item.quote || item.title}
              </p>
            </blockquote>
            <p className="mt-3 text-[0.8rem] text-rurikon-400 tracking-wide">
              <span className="font-medium text-rurikon-500">{item.author}</span>
              {item.note && (
                <span className="text-rurikon-300 ml-1">· {item.note}</span>
              )}
            </p>
          </div>
        ) : item.type === 'article' ? (
          <div className="py-2 animate-[blurIn_0.5s_ease-out_both]">
            {/* Pull-quote card for articles */}
            <div className="border-l-2 border-rurikon-200 pl-4 ml-0">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-semibold text-rurikon-600 leading-snug group-hover/link:text-rurikon-800 transition-colors">
                    {item.title}
                    <span className="text-rurikon-200 ml-1.5 text-sm">↗</span>
                  </h3>
                </a>
              ) : (
                <h3 className="font-semibold text-rurikon-600 leading-snug">{item.title}</h3>
              )}
              <p className="text-[0.8rem] text-rurikon-400 mt-1">{item.author}</p>
              {item.note && (
                <p className="mt-2 font-serif text-rurikon-500 leading-relaxed text-[0.9rem] italic">
                  {item.note}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-rurikon-600 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-rurikon-400 mt-0.5">{item.author}</p>

            {/* Link — prominent, shows domain */}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1.5 mt-2',
                  'text-sm text-rurikon-400 hover:text-rurikon-600',
                  'underline underline-offset-2 decoration-rurikon-200 hover:decoration-rurikon-400',
                  'transition-colors'
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <span>{getDomain(item.url)}</span>
                <span className="text-rurikon-200">↗</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div
          className="pb-4 pl-0 space-y-3 border-l-2 border-rurikon-100 ml-0 pl-4"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {item.quote && item.type !== 'quote' && (
            <blockquote className="text-sm text-rurikon-400 leading-relaxed">
              <p className="mt-0">{item.quote}</p>
            </blockquote>
          )}
          {item.note && item.type !== 'quote' && (
            <p className="text-sm text-rurikon-400 leading-relaxed">
              {item.note}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.6rem] text-rurikon-300 bg-rurikon-50 px-1.5 py-0.5 rounded-sm uppercase tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default function CuratedFeed({ items }: CuratedFeedProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const activeFilter = searchParams.get('type') || null

  // Count items per filter tab
  const counts: Record<string, number> = {}
  for (const tab of filterTabs) {
    if (tab.key === 'all') continue
    counts[tab.key] = items.filter((i) => tab.match(i.type)).length
  }

  // Filter items based on active tab
  const activeTab = filterTabs.find((t) => t.key === activeFilter)
  const filtered = activeTab ? items.filter((i) => activeTab.match(i.type)) : items

  // Group by year
  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.date]) acc[item.date] = []
      acc[item.date].push(item)
      return acc
    },
    {} as Record<string, CuratedFind[]>
  )

  const handleTypeSelect = (key: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (key) {
      params.set('type', key)
    } else {
      params.delete('type')
    }
    const qs = params.toString()
    const url = qs ? `/curated?${qs}` : '/curated'
    window.history.replaceState(null, '', url)
    router.replace(url, { scroll: false })
  }

  return (
    <div className="mt-7">
      <TypeFilter
        active={activeFilter}
        onSelect={handleTypeSelect}
        counts={counts}
      />

      <div className="mt-2">
        {Object.entries(grouped).map(([date, dateItems]) => (
          <section key={date} className="mt-8 first:mt-4">
            <time className="block font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-1">
              {date}
            </time>

            <div className="divide-y divide-rurikon-border/50">
              {dateItems.map((item) => (
                <FindCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggle={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                />
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-rurikon-300 mt-8">
            Nothing here yet.
          </p>
        )}
      </div>
    </div>
  )
}
