'use client'

import React, { useState } from 'react'
import cn from 'clsx'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Beehiiv API integration
      // Replace with your actual Beehiiv publication ID and API key
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        E-mail list
      </h1>
      <p className='mt-7 text-rurikon-400 mb-14'>
        Receive emails with valuable knowledge templates and more.
      </p>

      {/* Beehiiv Embed Option */}
      <div className='mb-10 p-6 border border-rurikon-border rounded-sm bg-rurikon-50'>
        <p className='text-sm text-rurikon-400 mb-4'>
          Subscriptions are managed through{' '}
          <a
            href='https://www.beehiiv.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2'
          >
            Beehiiv
          </a>
          . Your email will be added to the newsletter list and you'll receive
          confirmation and welcome emails.
        </p>
      </div>

      <div className='max-w-lg'>
        {status === 'success' ? (
          <div className='border border-rurikon-border rounded-sm p-6 sm:p-8 bg-rurikon-50'>
            <h2 className='font-semibold text-rurikon-600 text-lg mb-3'>
              Thank you for subscribing!
            </h2>
            <p className='text-sm text-rurikon-400 mb-4'>
              Check your email to confirm your subscription. You'll receive
              valuable knowledge templates and insights.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className='text-sm text-rurikon-500 hover:text-rurikon-700 underline'
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block font-mono text-xs text-rurikon-400 uppercase tracking-tighter mb-2'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='your.email@example.com'
                className={cn(
                  'w-full px-4 py-3 border rounded-sm',
                  'bg-[#fcfcfc] border-rurikon-border',
                  'text-rurikon-600 placeholder:text-rurikon-300',
                  'focus:outline-none focus:ring-2 focus:ring-rurikon-400 focus:border-rurikon-400',
                  'transition-all duration-200',
                  'font-mono text-sm'
                )}
              />
            </div>

            <button
              type='submit'
              disabled={status === 'loading'}
              className={cn(
                'w-full px-6 py-3 border rounded-sm',
                'bg-rurikon-600 text-[#fcfcfc] border-rurikon-600',
                'hover:bg-rurikon-700 hover:border-rurikon-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200',
                'font-semibold text-sm',
                'focus:outline-none focus:ring-2 focus:ring-rurikon-400 focus:ring-offset-2'
              )}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>

            {status === 'error' && errorMessage && (
              <div className='p-4 border border-rurikon-300 bg-rurikon-50 rounded-sm'>
                <p className='text-sm text-rurikon-600'>{errorMessage}</p>
              </div>
            )}

            <p className='text-xs text-rurikon-300 leading-relaxed'>
              By subscribing, you agree to receive emails with valuable content.
              You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default function NewsletterPage() {
  return <NewsletterForm />
}
