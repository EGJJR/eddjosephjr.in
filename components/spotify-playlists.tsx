'use client'

import React from 'react'
import cn from 'clsx'

export interface SpotifyPlaylist {
  id: string
  name: string
  description?: string
  spotifyUrl: string
  imageUrl?: string
  trackCount?: number
}

interface SpotifyPlaylistsProps {
  playlists: SpotifyPlaylist[]
}

export default function SpotifyPlaylists({ playlists }: SpotifyPlaylistsProps) {
  return (
    <div className='mt-14'>
      <h2 className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'>
        Playlists
      </h2>
      <p className='text-sm text-rurikon-400 mb-7'>
        Curated music collections for different moods and activities.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.spotifyUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'border border-rurikon-border rounded-sm overflow-hidden',
              'bg-transparent hover:bg-rurikon-50 hover:border-rurikon-300',
              'transition-all duration-200 cursor-pointer group'
            )}
          >
            <div className='flex gap-4 p-4'>
              {/* Playlist image placeholder or actual image */}
              <div className='flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-rurikon-100 border border-rurikon-border rounded-sm flex items-center justify-center'>
                {playlist.imageUrl ? (
                  <img
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    className='text-rurikon-400'
                  >
                    <path d='M9 18V5l12-2v13' />
                    <circle cx='6' cy='18' r='3' />
                    <circle cx='18' cy='16' r='3' />
                  </svg>
                )}
              </div>

              {/* Playlist info */}
              <div className='flex-1 min-w-0'>
                <h3 className='font-semibold text-rurikon-600 text-base mb-1 group-hover:text-rurikon-700 transition-colors'>
                  {playlist.name}
                </h3>
                {playlist.description && (
                  <p className='text-sm text-rurikon-400 mb-2 line-clamp-2'>
                    {playlist.description}
                  </p>
                )}
                <div className='flex items-center gap-3 text-xs text-rurikon-300'>
                  {playlist.trackCount && (
                    <span className='font-mono'>
                      {playlist.trackCount} tracks
                    </span>
                  )}
                  <span className='text-rurikon-500 group-hover:text-rurikon-600 transition-colors'>
                    Open on Spotify →
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
