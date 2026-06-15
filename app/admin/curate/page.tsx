'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ponytail: simple admin form. Password-protected via env var.
// No auth library, no session management. Just a password field.

const TYPES = ['book', 'article', 'video', 'podcast', 'paper', 'quote', 'reel', 'course'] as const
const STATUSES = ['consumed', 'in-progress', 'queued'] as const

export default function AdminCurate() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    type: 'article' as string,
    title: '',
    author: '',
    url: '',
    note: '',
    quote: '',
    status: 'consumed' as string,
    tags: '',
  })

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))
  const isQuote = form.type === 'quote'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setMessage('')

    try {
      const body: any = {
        type: form.type,
        title: form.title,
        author: form.author,
        status: form.status,
      }
      if (form.url) body.url = form.url
      if (form.note) body.note = form.note
      if (isQuote) body.quote = form.quote || form.title
      if (form.tags) body.tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)

      const res = await fetch('/api/curate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage(`Added "${form.title}" — will deploy shortly.`)
        setForm({ type: 'article', title: '', author: '', url: '', note: '', quote: '', status: 'consumed', tags: '' })
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-[60vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-[0.7rem] uppercase tracking-widest text-rurikon-300">Add Curated</h1>
        <button onClick={() => router.back()} className="text-rurikon-400 hover:text-rurikon-700 transition-colors text-sm">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        {/* Password */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Type</label>
          <select
            value={form.type}
            onChange={e => set('type', e.target.value)}
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          >
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">
            {isQuote ? 'Short version' : 'Title'}
          </label>
          <input
            type="text"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            required
            placeholder={isQuote ? 'First line or summary...' : 'Title'}
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          />
        </div>

        {/* Full quote (only for quotes) */}
        {isQuote && (
          <div>
            <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Full Quote</label>
            <textarea
              value={form.quote}
              onChange={e => set('quote', e.target.value)}
              rows={3}
              placeholder="Full quote text..."
              className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors resize-y"
            />
          </div>
        )}

        {/* Author */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Author</label>
          <input
            type="text"
            value={form.author}
            onChange={e => set('author', e.target.value)}
            required
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">URL (optional)</label>
          <input
            type="url"
            value={form.url}
            onChange={e => set('url', e.target.value)}
            placeholder="https://..."
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          />
        </div>

        {/* Note / Summary */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Note / Summary (optional)</label>
          <textarea
            value={form.note}
            onChange={e => set('note', e.target.value)}
            rows={2}
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors resize-y"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Status</label>
          <select
            value={form.status}
            onChange={e => set('status', e.target.value)}
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-widest text-rurikon-300 mb-1.5">Tags (comma-separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={e => set('tags', e.target.value)}
            placeholder="philosophy, stoicism"
            className="w-full bg-transparent border border-rurikon-border rounded px-3 py-2 text-sm text-rurikon-700 outline-none focus:border-rurikon-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="font-mono text-[0.7rem] uppercase tracking-widest px-5 py-2.5 border border-rurikon-800 text-rurikon-800 rounded hover:bg-rurikon-800 hover:text-white transition-colors disabled:opacity-50"
        >
          {sending ? 'Adding...' : 'Add to Curated'}
        </button>

        {message && (
          <p className={`text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
