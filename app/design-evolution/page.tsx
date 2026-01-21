import DesignEvolution, {
  type DesignEvolution as DesignEvolutionType,
} from '@/components/design-evolution'

export const metadata = {
  title: 'Design Evolution',
}

const evolution: DesignEvolutionType = {
  id: 'site-redesign',
  title: 'Personal Site Redesign 2024',
  iterations: [
    {
      id: 'v1',
      version: '1.0',
      date: '2023-01',
      description:
        'Initial design with standard portfolio layout. Clean but generic, lacking personality.',
      decisions: [
        'Standard grid layout for projects',
        'Basic typography (system fonts)',
        'Simple color scheme',
        'Minimal interactivity',
      ],
    },
    {
      id: 'v2',
      version: '2.0',
      date: '2023-06',
      description:
        'Added blog functionality and improved typography. Still felt too conventional.',
      decisions: [
        'Custom font selection (Inter)',
        'MDX for content',
        'Dark mode toggle (later removed)',
        'Improved spacing and hierarchy',
      ],
    },
    {
      id: 'v3',
      version: '3.0',
      date: '2024-12',
      description:
        'Complete redesign embracing academic minimalism. Typography-first approach with print-inspired details.',
      decisions: [
        'Academic paper aesthetic',
        'Serif font for emphasis (Lora Italic)',
        'Custom rurikon color palette',
        'Hanging punctuation and hyphenation',
        'Interactive components (bookshelf, mind map)',
        'Mobile-first responsive design',
        'Removed dark mode for consistency',
      ],
    },
  ],
}

export default function DesignEvolutionPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Design Evolution
      </h1>
      <p className='mt-7 text-rurikon-400'>
        The journey of design decisions over time. Compare iterations side by
        side or explore each version in detail.
      </p>
      <DesignEvolution evolution={evolution} />
    </div>
  )
}
