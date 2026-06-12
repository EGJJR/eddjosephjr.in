import { Suspense } from 'react'
import CuratedFeed, { type CuratedFind } from '@/components/curated-feed'
import finds from './data.json'

export const metadata = {
  title: 'Curated',
}

export default function CuratedPage() {
  return (
    <div>
      <h1 className="font-semibold mb-2 text-rurikon-600 text-balance">
        Curated
      </h1>
      <p className="text-rurikon-400">
        Things that caught my attention — books, articles, videos, podcasts,
        papers, and quotes that shaped how I think.
      </p>

      <Suspense>
        <CuratedFeed items={finds as CuratedFind[]} />
      </Suspense>
    </div>
  )
}
