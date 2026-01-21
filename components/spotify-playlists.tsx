'use client'

import React from 'react'
import Link from 'next/link'

interface SpotifyPlaylistsProps {
  spotifyUrl: string
}

export default function SpotifyPlaylists({ spotifyUrl }: SpotifyPlaylistsProps) {
  return (
    <div className='mt-14'>
      <h2 className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'>
        Playlists
      </h2>
      <p className='text-sm text-rurikon-400 mb-7'>
        Curated music collections for different moods and activities.
      </p>
      <div className='border border-rurikon-border rounded-sm p-6 sm:p-8 bg-rurikon-50 hover:bg-rurikon-100 transition-colors duration-200'>
        <Link
          href={spotifyUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-4 group'
        >
          <div className='flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-rurikon-200 border border-rurikon-border rounded-sm flex items-center justify-center'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              className='text-rurikon-500'
            >
              <path d='M9 18V5l12-2v13' />
              <circle cx='6' cy='18' r='3' />
              <circle cx='18' cy='16' r='3' />
            </svg>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-rurikon-600 text-base mb-2 group-hover:text-rurikon-700 transition-colors'>
              Spotify Playlists
            </h3>
            <p className='text-sm text-rurikon-400 mb-3'>
              Explore my curated playlists on Spotify
            </p>
            <span className='text-sm text-rurikon-500 group-hover:text-rurikon-600 transition-colors inline-flex items-center gap-1'>
              Open on Spotify
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='inline'
              >
                <path d='M7 17L17 7M7 7h10v10' />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
