import ProjectCLI, { type CLICommand } from '@/components/project-cli'

export const metadata = {
  title: 'Projects CLI',
}

const projects = [
  {
    id: 'creator-cash',
    name: 'Creator Cash',
    description:
      'A platform empowering creators with financial tools and resources. Built with modern web technologies and AI integration.',
    commands: [
      {
        command: 'tech-stack',
        description: 'View technology stack',
        output: 'React, Next.js, TypeScript, AI SDK, Stripe',
      },
      {
        command: 'status',
        description: 'Current project status',
        output: 'Active development, CTO role',
      },
      {
        command: 'team',
        description: 'Team information',
        output: 'Small, agile team focused on creator empowerment',
      },
    ],
  },
  {
    id: 'personal-site',
    name: 'Personal Site',
    description:
      'This website—a minimalist, academic-inspired portfolio showcasing thoughts, projects, and consumed content.',
    commands: [
      {
        command: 'tech-stack',
        description: 'View technology stack',
        output: 'Next.js 15, React, TypeScript, MDX, Tailwind CSS',
      },
      {
        command: 'features',
        description: 'List features',
        output: 'Bookshelf, Mind Map, Timeline, Quote Network, and more',
      },
      {
        command: 'design',
        description: 'Design philosophy',
        output: 'Academic minimalism, typography-first, print-inspired',
      },
    ],
  },
  {
    id: 'hackathon',
    name: 'AI Hackathon Project',
    description:
      'Winning solution from Work and Life AI Hackathon in NYC. Focused on practical AI applications for work-life balance.',
    commands: [
      {
        command: 'award',
        description: 'Competition result',
        output: '2nd Place - Work and Life AI Hackathon NYC 2024',
      },
      {
        command: 'focus',
        description: 'Project focus',
        output: 'AI-powered work-life balance solutions',
      },
    ],
  },
]

export default function ProjectsCLIPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Projects CLI
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Explore projects through a terminal interface. Type commands like 'help',
        'ls', 'cd project-name', and 'cat project-name' to navigate.
      </p>
      <ProjectCLI projects={projects} />
    </div>
  )
}
