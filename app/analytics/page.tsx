import AnalyticsDashboard, {
  type AnalyticsData,
} from '@/components/analytics-dashboard'

export const metadata = {
  title: 'Analytics',
}

const analyticsData: AnalyticsData = {
  period: 'Last 30 days',
  metrics: [
    {
      label: 'Total Views',
      value: 1247,
      change: 12.5,
      description: 'Unique page views across all pages',
    },
    {
      label: 'Visitors',
      value: 892,
      change: 8.3,
      description: 'Unique visitors',
    },
    {
      label: 'Avg. Time',
      value: '3:24',
      change: -2.1,
      description: 'Average time on site',
    },
    {
      label: 'Bounce Rate',
      value: '42%',
      change: -5.2,
      description: 'Single-page sessions',
    },
  ],
  topPages: [
    { path: '/', views: 456 },
    { path: '/thoughts', views: 312 },
    { path: '/bookshelf', views: 234 },
    { path: '/mind-map', views: 145 },
    { path: '/projects', views: 100 },
  ],
  referrers: [
    { source: 'Direct', count: 623 },
    { source: 'Twitter/X', count: 234 },
    { source: 'GitHub', count: 189 },
    { source: 'LinkedIn', count: 156 },
    { source: 'Other', count: 45 },
  ],
}

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Analytics
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Site analytics presented with academic minimalism. Focus on meaningful
        metrics without visual clutter.
      </p>
      <AnalyticsDashboard data={analyticsData} />
    </div>
  )
}
