'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ponytail: search is now a dedicated /search route. Button just navigates there.
export default function Search() {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        router.push('/search')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [router])

  return (
    <button
      onClick={() => router.push('/search')}
      className="text-rurikon-300 hover:text-rurikon-600 transition-colors p-2 -m-2"
      aria-label="Search (⌘K)"
      title="Search (⌘K)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[14px] h-[14px]">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>
  )
}
