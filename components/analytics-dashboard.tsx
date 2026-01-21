'use client'

import React from 'react'
import cn from 'clsx'

export interface Metric {
  label: string
  value: string | number
  change?: number
  description?: string
}

export interface AnalyticsData {
  period: string
  metrics: Metric[]
  topPages?: Array<{ path: string; views: number }>
  referrers?: Array<{ source: string; count: number }>
}

interface AnalyticsDashboardProps {
  data: AnalyticsData
}

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  return (
    <div className='mt-7 space-y-8'>
      {/* Period selector */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <h3 className='font-semibold text-rurikon-600 text-sm uppercase tracking-wider'>
          Analytics
        </h3>
        <span className='font-mono text-xs text-rurikon-400'>{data.period}</span>
      </div>

      {/* Metrics grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data.metrics.map((metric, idx) => (
          <div
            key={idx}
            className='border border-rurikon-border rounded-sm p-4 sm:p-6 bg-rurikon-50'
          >
            <div className='mb-2'>
              <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-1'>
                {metric.label}
              </p>
              <p className='font-semibold text-rurikon-600 text-2xl'>
                {typeof metric.value === 'number'
                  ? metric.value.toLocaleString()
                  : metric.value}
              </p>
            </div>
            {metric.change !== undefined && (
              <div className='flex items-center gap-2 mt-2'>
                <span
                  className={cn(
                    'font-mono text-xs',
                    metric.change >= 0
                      ? 'text-rurikon-500'
                      : 'text-rurikon-400'
                  )}
                >
                  {metric.change >= 0 ? '+' : ''}
                  {metric.change}%
                </span>
                <span className='text-xs text-rurikon-300'>vs previous</span>
              </div>
            )}
            {metric.description && (
              <p className='text-xs text-rurikon-400 mt-2'>{metric.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Top pages */}
      {data.topPages && data.topPages.length > 0 && (
        <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
          <h4 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
            Top Pages
          </h4>
          <div className='space-y-3'>
            {data.topPages.map((page, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between py-2 border-b border-rurikon-border last:border-0'
              >
                <span className='font-mono text-xs text-rurikon-400'>{page.path}</span>
                <span className='font-mono text-sm text-rurikon-600'>
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Referrers */}
      {data.referrers && data.referrers.length > 0 && (
        <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
          <h4 className='font-semibold text-rurikon-600 mb-4 text-sm uppercase tracking-wider'>
            Traffic Sources
          </h4>
          <div className='space-y-3'>
            {data.referrers.map((ref, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between py-2 border-b border-rurikon-border last:border-0'
              >
                <span className='text-sm text-rurikon-400'>{ref.source}</span>
                <span className='font-mono text-sm text-rurikon-600'>
                  {ref.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
