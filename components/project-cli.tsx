'use client'

import React, { useState, useRef, useEffect } from 'react'
import cn from 'clsx'

export interface CLICommand {
  command: string
  description: string
  output?: string
  action?: () => void
}

export interface ProjectCLIProps {
  projects: Array<{
    id: string
    name: string
    description: string
    commands: CLICommand[]
  }>
}

export default function ProjectCLI({ projects }: ProjectCLIProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ input: string; output: string }>>([])
  const [currentProject, setCurrentProject] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const allCommands: CLICommand[] = [
    {
      command: 'help',
      description: 'Show available commands',
      output: `Available commands:
  ls              List all projects
  cd <project>    Open a project
  cat <project>   View project details
  clear           Clear terminal
  exit            Close terminal`,
    },
    {
      command: 'ls',
      description: 'List projects',
      output: projects.map((p) => `  ${p.name}`).join('\n'),
    },
    ...projects.flatMap((project) => [
      {
        command: `cd ${project.name.toLowerCase()}`,
        description: `Open ${project.name}`,
        action: () => setCurrentProject(project.id),
        output: `Switched to ${project.name}\nType 'cat ${project.name.toLowerCase()}' for details`,
      },
      {
        command: `cat ${project.name.toLowerCase()}`,
        description: `View ${project.name} details`,
        output: `${project.name}\n${project.description}\n\nCommands:\n${project.commands.map((c) => `  ${c.command.padEnd(20)} ${c.description}`).join('\n')}`,
      },
    ]),
    {
      command: 'clear',
      description: 'Clear terminal',
      action: () => setHistory([]),
    },
    {
      command: 'exit',
      description: 'Close terminal',
      action: () => setCurrentProject(null),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const command = allCommands.find(
      (c) => c.command.toLowerCase() === input.toLowerCase().trim()
    )

    const output = command
      ? command.output || 'Command executed'
      : `Command not found: ${input}\nType 'help' for available commands`

    setHistory([...history, { input, output }])
    if (command?.action) {
      command.action()
    }
    setInput('')
  }

  const currentProjectData = projects.find((p) => p.id === currentProject)

  return (
    <div className='mt-7'>
      <div
        className={cn(
          'border border-rurikon-border rounded-sm bg-rurikon-950 text-rurikon-50',
          'font-mono text-xs sm:text-sm',
          'overflow-hidden'
        )}
      >
        {/* Terminal header */}
        <div className='bg-rurikon-900 border-b border-rurikon-800 px-4 py-2 flex items-center gap-2'>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-rurikon-700' />
            <div className='w-3 h-3 rounded-full bg-rurikon-700' />
            <div className='w-3 h-3 rounded-full bg-rurikon-700' />
          </div>
          <span className='text-rurikon-400 text-xs ml-2'>terminal</span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className='p-4 h-[400px] sm:h-[500px] overflow-y-auto'
        >
          <div className='mb-4'>
            <p className='text-rurikon-300 mb-2'>
              Welcome to Project CLI. Type 'help' to get started.
            </p>
          </div>

          {/* History */}
          {history.map((entry, idx) => (
            <div key={idx} className='mb-4'>
              <div className='flex items-start gap-2 mb-1'>
                <span className='text-rurikon-500'>$</span>
                <span className='text-rurikon-100'>{entry.input}</span>
              </div>
              <pre className='text-rurikon-300 whitespace-pre-wrap ml-4'>
                {entry.output}
              </pre>
            </div>
          ))}

          {/* Current project view */}
          {currentProjectData && (
            <div className='mt-4 pt-4 border-t border-rurikon-800'>
              <div className='mb-4'>
                <h3 className='text-rurikon-100 font-semibold mb-2'>
                  {currentProjectData.name}
                </h3>
                <p className='text-rurikon-300 text-xs'>
                  {currentProjectData.description}
                </p>
              </div>
              <div className='space-y-2'>
                {currentProjectData.commands.map((cmd, idx) => (
                  <div key={idx} className='flex items-start gap-4'>
                    <span className='text-rurikon-500 flex-shrink-0'>
                      {cmd.command}
                    </span>
                    <span className='text-rurikon-400 text-xs'>
                      {cmd.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className='flex items-start gap-2 mt-4'>
            <span className='text-rurikon-500'>$</span>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='flex-1 bg-transparent border-none outline-none text-rurikon-100 caret-rurikon-400'
              placeholder='Type a command...'
            />
          </form>
        </div>
      </div>
    </div>
  )
}
