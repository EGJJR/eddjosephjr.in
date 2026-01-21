import MindMap, { type MindMapNode } from '@/components/mind-map'

export const metadata = {
  title: 'Mind Map',
}

const sampleNodes: MindMapNode[] = [
  {
    id: 'center',
    label: 'Knowledge',
    type: 'concept',
    description: 'The central node representing accumulated knowledge',
    connections: ['stoicism', 'ai', 'design', 'philosophy'],
  },
  {
    id: 'stoicism',
    label: 'Stoicism',
    type: 'concept',
    description: 'Ancient philosophy focusing on virtue and resilience',
    connections: ['center', 'seneca', 'meditations'],
    link: '/bookshelf',
  },
  {
    id: 'seneca',
    label: 'Seneca',
    type: 'person',
    description: 'Roman Stoic philosopher and statesman',
    connections: ['stoicism'],
  },
  {
    id: 'meditations',
    label: 'Meditations',
    type: 'book',
    description: 'Personal reflections by Marcus Aurelius',
    connections: ['stoicism'],
  },
  {
    id: 'ai',
    label: 'AI Engineering',
    type: 'concept',
    description: 'Building intelligent systems and applications',
    connections: ['center', 'ml', 'llms'],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    type: 'concept',
    description: 'Algorithms that learn from data',
    connections: ['ai'],
  },
  {
    id: 'llms',
    label: 'LLMs',
    type: 'concept',
    description: 'Large Language Models',
    connections: ['ai'],
  },
  {
    id: 'design',
    label: 'Design',
    type: 'concept',
    description: 'Creating meaningful experiences',
    connections: ['center', 'typography'],
  },
  {
    id: 'typography',
    label: 'Typography',
    type: 'concept',
    description: 'The art of arranging type',
    connections: ['design'],
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    type: 'concept',
    description: 'The study of fundamental questions',
    connections: ['center', 'stoicism'],
  },
]

export default function MindMapPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Mind Map
      </h1>
      <p className='mt-7 text-rurikon-400'>
        An interactive visualization of connected ideas, concepts, and knowledge.
        Click on nodes to explore relationships.
      </p>
      <MindMap nodes={sampleNodes} centerNode='center' />
    </div>
  )
}
