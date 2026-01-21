import ReadingHeatmap, { type ReadingDay } from '@/components/reading-heatmap'

export const metadata = {
  title: 'Reading Activity',
}

// Generate sample data for the current year
const generateSampleDays = (): ReadingDay[] => {
  const days: ReadingDay[] = []
  const year = new Date().getFullYear()
  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year, 11, 31)

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const count = Math.floor(Math.random() * 4) // 0-3 items per day
    const items: ReadingDay['items'] = []

    if (count > 0) {
      const types = ['book', 'article', 'podcast', 'video']
      const titles = [
        'Letters from a Stoic',
        'The Pragmatic Programmer',
        'Designing Data-Intensive Applications',
        'Lex Fridman Podcast',
        'Building with React Server Components',
      ]

      for (let i = 0; i < count; i++) {
        items.push({
          title: titles[Math.floor(Math.random() * titles.length)],
          type: types[Math.floor(Math.random() * types.length)],
        })
      }
    }

    days.push({
      date: date.toISOString().split('T')[0],
      count,
      items,
    })
  }

  return days
}

const readingDays = generateSampleDays()

export default function ReadingActivityPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Reading Activity
      </h1>
      <p className='mt-7 text-rurikon-400'>
        A visual representation of content consumption throughout the year. Click
        on any day to see what was read, watched, or listened to.
      </p>
      <ReadingHeatmap days={readingDays} />
    </div>
  )
}
