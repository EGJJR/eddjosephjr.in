'use client'

import React from 'react'
import Link from 'next/link'

interface SpotifyPlaylistsProps {
  spotifyUrl: string
}

export default function SpotifyPlaylists({ spotifyUrl }: SpotifyPlaylistsProps) {
  return (
    <p className='mt-7 text-rurikon-400'>
      <Link
        href={spotifyUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2'
      >
        Spotify playlists
      </Link>
    </p>
  )
}
