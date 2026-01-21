'use client'

import React, { useState, useRef, useEffect } from 'react'
import cn from 'clsx'

export interface MindMapNode {
  id: string
  label: string
  type: 'concept' | 'quote' | 'project' | 'person' | 'book'
  x?: number
  y?: number
  connections?: string[]
  description?: string
  link?: string
}

interface MindMapProps {
  nodes: MindMapNode[]
  centerNode?: string
}

export default function MindMap({ nodes, centerNode }: MindMapProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Simple force-directed layout for mobile/desktop
  const layoutNodes = (nodes: MindMapNode[]) => {
    const center = centerNode || nodes[0]?.id
    const centerNodeData = nodes.find((n) => n.id === center)
    if (!centerNodeData) return nodes

    const angleStep = (2 * Math.PI) / (nodes.length - 1)
    const radius = 120

    return nodes.map((node, idx) => {
      if (node.id === center) {
        return { ...node, x: 0, y: 0 }
      }
      const angle = (idx - 1) * angleStep
      return {
        ...node,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }
    })
  }

  const layoutedNodes = layoutNodes(nodes)
  const center = centerNode || nodes[0]?.id

  const getNodeColor = (type: MindMapNode['type']) => {
    const colors = {
      concept: 'bg-rurikon-100 border-rurikon-300 text-rurikon-600',
      quote: 'bg-rurikon-50 border-rurikon-200 text-rurikon-500',
      project: 'bg-rurikon-200 border-rurikon-400 text-rurikon-700',
      person: 'bg-rurikon-50 border-rurikon-300 text-rurikon-600',
      book: 'bg-rurikon-100 border-rurikon-300 text-rurikon-600',
    }
    return colors[type]
  }

  return (
    <div
      ref={containerRef}
      className='relative w-full h-[600px] sm:h-[800px] overflow-hidden border border-rurikon-border rounded-sm bg-[#fcfcfc]'
    >
      <svg className='absolute inset-0 w-full h-full'>
        {/* Connections */}
        {layoutedNodes.map((node) =>
          node.connections?.map((connId) => {
            const target = layoutedNodes.find((n) => n.id === connId)
            if (!target || !node.x || !node.y || !target.x || !target.y) return null

            const centerX = (containerRef.current?.clientWidth ?? 0) / 2
            const centerY = (containerRef.current?.clientHeight ?? 0) / 2

            return (
              <line
                key={`${node.id}-${connId}`}
                x1={centerX + node.x}
                y1={centerY + node.y}
                x2={centerX + target.x}
                y2={centerY + target.y}
                stroke='var(--color-rurikon-border)'
                strokeWidth='1'
                opacity={
                  hoveredNode === node.id || hoveredNode === connId ? 0.6 : 0.2
                }
                className='transition-opacity duration-200'
              />
            )
          })
        )}
      </svg>

      {/* Nodes */}
      <div className='absolute inset-0 flex items-center justify-center'>
        {layoutedNodes.map((node) => {
          const centerX = (containerRef.current?.clientWidth ?? 0) / 2
          const centerY = (containerRef.current?.clientHeight ?? 0) / 2
          const isCenter = node.id === center
          const isSelected = selectedNode === node.id
          const isHovered = hoveredNode === node.id

          return (
            <div
              key={node.id}
              className={cn(
                'absolute cursor-pointer transition-all duration-200',
                'flex items-center justify-center',
                isCenter
                  ? 'w-24 h-24 sm:w-32 sm:h-32'
                  : 'w-20 h-20 sm:w-24 sm:h-24',
                getNodeColor(node.type),
                'border rounded-sm',
                isSelected && 'ring-2 ring-rurikon-500',
                isHovered && 'scale-110 z-10'
              )}
              style={{
                left: `calc(50% + ${node.x || 0}px - ${isCenter ? '4rem' : '2.5rem'})`,
                top: `calc(50% + ${node.y || 0}px - ${isCenter ? '4rem' : '2.5rem'})`,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(isSelected ? null : node.id)}
            >
              <div className='text-center px-2'>
                <div
                  className={cn(
                    'font-mono text-[0.6rem] sm:text-xs uppercase tracking-tighter',
                    isCenter && 'font-semibold'
                  )}
                >
                  {node.label}
                </div>
                {isSelected && node.description && (
                  <div className='absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 sm:w-64 p-3 bg-[#fcfcfc] border border-rurikon-border rounded-sm shadow-lg z-20'>
                    <p className='text-xs text-rurikon-400'>{node.description}</p>
                    {node.link && (
                      <a
                        href={node.link}
                        className='text-xs text-rurikon-500 hover:text-rurikon-700 underline mt-2 inline-block'
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: List view toggle */}
      <div className='sm:hidden absolute bottom-4 left-4 right-4'>
        <button
          onClick={() => setSelectedNode(null)}
          className='w-full py-2 px-4 bg-rurikon-50 border border-rurikon-border text-rurikon-600 text-xs font-mono uppercase tracking-tighter rounded-sm'
        >
          Reset View
        </button>
      </div>
    </div>
  )
}
