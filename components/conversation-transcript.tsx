'use client'

import React, { useState } from 'react'
import cn from 'clsx'

export interface TranscriptMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export interface ConversationTranscript {
  id: string
  title: string
  date: string
  topic: string
  messages: TranscriptMessage[]
}

interface ConversationTranscriptProps {
  transcript: ConversationTranscript
}

export default function ConversationTranscript({
  transcript,
}: ConversationTranscriptProps) {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(
    new Set()
  )

  const toggleMessage = (id: string) => {
    const newExpanded = new Set(expandedMessages)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedMessages(newExpanded)
  }

  const getRoleLabel = (role: TranscriptMessage['role']) => {
    const labels = {
      user: 'You',
      assistant: 'AI',
      system: 'System',
    }
    return labels[role]
  }

  const getRoleColor = (role: TranscriptMessage['role']) => {
    const colors = {
      user: 'bg-rurikon-50 border-rurikon-200',
      assistant: 'bg-rurikon-100 border-rurikon-300',
      system: 'bg-rurikon-50 border-rurikon-200',
    }
    return colors[role]
  }

  return (
    <div className='mt-7 space-y-6'>
      {/* Header */}
      <div className='border border-rurikon-border rounded-sm p-4 sm:p-6 bg-rurikon-50'>
        <h3 className='font-semibold text-rurikon-600 text-lg mb-2'>
          {transcript.title}
        </h3>
        <div className='flex flex-wrap items-center gap-4 text-xs text-rurikon-400'>
          <div>
            <span className='font-mono uppercase tracking-tighter'>Date:</span>{' '}
            {transcript.date}
          </div>
          <div>
            <span className='font-mono uppercase tracking-tighter'>Topic:</span>{' '}
            {transcript.topic}
          </div>
          <div>
            <span className='font-mono uppercase tracking-tighter'>Messages:</span>{' '}
            {transcript.messages.length}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className='space-y-4'>
        {transcript.messages.map((message) => {
          const isExpanded = expandedMessages.has(message.id)
          const isLong = message.content.length > 300

          return (
            <div
              key={message.id}
              className={cn(
                'border rounded-sm p-4 sm:p-6 transition-all duration-200',
                getRoleColor(message.role),
                'hover:border-rurikon-400'
              )}
            >
              <div className='flex items-start justify-between gap-4 mb-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter'>
                    {getRoleLabel(message.role)}
                  </span>
                  {message.role === 'assistant' && (
                    <span className='font-mono text-[0.65rem] text-rurikon-400'>
                      AI
                    </span>
                  )}
                </div>
                {message.timestamp && (
                  <span className='font-mono text-xs text-rurikon-300 flex-shrink-0'>
                    {message.timestamp}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  'text-sm text-rurikon-400 leading-relaxed',
                  !isExpanded && isLong && 'line-clamp-4'
                )}
              >
                {message.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-3' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {isLong && (
                <button
                  onClick={() => toggleMessage(message.id)}
                  className='mt-3 text-xs text-rurikon-500 hover:text-rurikon-700 underline font-mono uppercase tracking-tighter'
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
