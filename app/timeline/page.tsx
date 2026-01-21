import Timeline, { type TimelineEvent } from '@/components/timeline'

export const metadata = {
  title: 'Timeline',
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2024',
    title: 'AI Engineer Intern at UChicago Medicine/AdventHealth',
    description:
      'Working on practical AI solutions for healthcare applications, focusing on improving patient outcomes through intelligent systems.',
    type: 'project',
  },
  {
    id: '2',
    date: '2024',
    title: 'CTO of Creator Cash',
    description:
      'Leading technical strategy and development for a platform that empowers creators with financial tools and resources.',
    type: 'project',
  },
  {
    id: '3',
    date: '2024',
    title: '2nd Place - Work and Life AI Hackathon NYC',
    description:
      'Developed an innovative AI solution that impressed judges with its practical application and technical excellence.',
    type: 'achievement',
  },
  {
    id: '4',
    date: '2020-2026',
    title: 'CS Student at Andrews University',
    description:
      'Pursuing BSc in Computer Science, graduating 2026. Focus areas include AI, web development, and human-technology interaction.',
    type: 'education',
  },
  {
    id: '5',
    date: '2020-2024',
    title: 'Freelance Web Design & Development',
    description:
      'Years of experience building custom web solutions for clients, honing skills in design, development, and client communication.',
    type: 'project',
  },
]

export default function TimelinePage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Timeline
      </h1>
      <p className='mt-7 text-rurikon-400'>
        A chronological journey through key milestones, projects, and achievements.
        Click on any event to see details.
      </p>
      <Timeline events={timelineEvents} />
    </div>
  )
}
