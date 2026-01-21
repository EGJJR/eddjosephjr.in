import ProjectArchaeology, {
  type ProjectArtifact,
} from '@/components/project-archaeology'

export const metadata = {
  title: 'Project Archaeology',
}

const artifacts: ProjectArtifact[] = [
  {
    id: 'personal-site',
    name: 'Personal Website',
    description:
      'The evolution of this personal site, from initial concept to current iteration.',
    currentVersion: '3.0',
    versions: [
      {
        id: '1.0',
        date: '2023-01',
        description: 'Initial static site with basic portfolio layout.',
        changes: [
          'Basic HTML/CSS structure',
          'Simple project showcase',
          'Contact form',
        ],
        commit: 'a1b2c3d',
      },
      {
        id: '2.0',
        date: '2023-06',
        description: 'Migration to Next.js with blog functionality.',
        changes: [
          'Next.js framework integration',
          'MDX blog posts',
          'Improved typography',
          'Dark mode support (later removed)',
        ],
        commit: 'e4f5g6h',
      },
      {
        id: '3.0',
        date: '2024-12',
        description:
          'Complete redesign with academic aesthetic and interactive components.',
        changes: [
          'Academic minimalism design system',
          'Bookshelf component',
          'Mind map visualization',
          'Timeline and quote network',
          'Custom loading states',
          'Mobile-first responsive design',
        ],
        commit: 'i7j8k9l',
      },
    ],
  },
  {
    id: 'creator-cash',
    name: 'Creator Cash Platform',
    description: 'The development journey of the Creator Cash platform.',
    currentVersion: '2.5',
    versions: [
      {
        id: '1.0',
        date: '2024-01',
        description: 'MVP launch with core payment features.',
        changes: ['Basic payment processing', 'User authentication', 'Dashboard'],
        commit: 'm1n2o3p',
      },
      {
        id: '2.0',
        date: '2024-06',
        description: 'AI integration and advanced analytics.',
        changes: [
          'AI-powered insights',
          'Advanced analytics dashboard',
          'Creator tools suite',
        ],
        commit: 'q4r5s6t',
      },
      {
        id: '2.5',
        date: '2024-11',
        description: 'Performance optimization and UX improvements.',
        changes: [
          'Performance optimizations',
          'Improved mobile experience',
          'Enhanced creator onboarding',
        ],
        commit: 'u7v8w9x',
      },
    ],
  },
]

export default function ProjectArchaeologyPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Project Archaeology
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Excavate the history of projects through their version evolution. Click
        on any project to see its development timeline.
      </p>
      <ProjectArchaeology artifacts={artifacts} />
    </div>
  )
}
