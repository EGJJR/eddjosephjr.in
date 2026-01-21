import Bookshelf, { type ContentItem } from '@/components/bookshelf'

export const metadata = {
  title: 'Bookshelf',
}

// Content I've consumed - in production, this would come from Notion/API
const consumedContent: ContentItem[] = [
  // Books
  {
    id: '1',
    title: 'Letters from a Stoic',
    author: 'Seneca',
    type: 'book',
    status: 'COMPLETED',
    year: '2024',
    rating: 5,
    quotes: [
      'We suffer more often in imagination than in reality.',
      'It is not that we have a short time to live, but that we waste a lot of it.',
      'If a man knows not to which port he sails, no wind is favorable.',
    ],
    analysisLink: '/thoughts/seneca-letters',
  },
  {
    id: '2',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    type: 'book',
    status: 'READING',
    year: '2024',
    quotes: [
      'The best way to get the right answer on the internet is not to ask a question; it\'s to post the wrong answer.',
    ],
  },
  {
    id: '3',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    type: 'book',
    status: 'READING',
    year: '2024',
  },
  {
    id: '4',
    title: 'The Art of Computer Programming',
    author: 'Donald Knuth',
    type: 'book',
    status: 'TO-READ',
    year: '2025',
  },
  {
    id: '5',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    type: 'book',
    status: 'COMPLETED',
    year: '2023',
    rating: 5,
    quotes: [
      'You have power over your mind - not outside events. Realize this, and you will find strength.',
      'The happiness of your life depends upon the quality of your thoughts.',
      'Waste no more time arguing about what a good man should be. Be one.',
    ],
  },
  {
    id: '6',
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson, Gerald Jay Sussman',
    type: 'book',
    status: 'TO-READ',
    year: '2025',
  },
  {
    id: '7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    type: 'book',
    status: 'COMPLETED',
    year: '2023',
    rating: 4,
    quotes: [
      'The only way to go fast, is to go well.',
    ],
  },
  {
    id: '8',
    title: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    type: 'book',
    status: 'READING',
    year: '2024',
  },
  // Articles
  {
    id: '9',
    title: 'The Future of AI Engineering',
    author: 'Various Authors',
    type: 'article',
    status: 'COMPLETED',
    year: '2024',
    notes: 'A comprehensive look at the evolving landscape of AI engineering.',
    externalLink: 'https://example.com/article',
  },
  // Podcasts
  {
    id: '10',
    title: 'Lex Fridman Podcast',
    author: 'Lex Fridman',
    type: 'podcast',
    status: 'LISTENING',
    year: '2024',
    notes: 'Deep conversations about AI, science, and philosophy.',
    externalLink: 'https://lexfridman.com/podcast',
  },
  // Videos
  {
    id: '11',
    title: 'Building with React Server Components',
    author: 'Next.js Team',
    type: 'video',
    status: 'COMPLETED',
    year: '2024',
    rating: 5,
    notes: 'Excellent explanation of RSC architecture.',
    externalLink: 'https://youtube.com/watch?v=example',
  },
  // Courses
  {
    id: '12',
    title: 'Advanced TypeScript Patterns',
    author: 'TypeScript Team',
    type: 'course',
    status: 'COMPLETED',
    year: '2024',
    rating: 4,
    notes: 'Learned advanced type manipulation techniques.',
  },
  // Papers
  {
    id: '13',
    title: 'Attention Is All You Need',
    author: 'Vaswani et al.',
    type: 'paper',
    status: 'COMPLETED',
    year: '2023',
    rating: 5,
    notes: 'Foundational transformer architecture paper.',
    externalLink: 'https://arxiv.org/abs/1706.03762',
  },
]

export default function BookshelfPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Bookshelf
      </h1>
      <p className='mt-7 text-rurikon-400'>
        A collection of content I've consumed—books, articles, podcasts, videos,
        courses, and papers. Click on any item to see notes, quotes, or
        analysis.
      </p>
      <Bookshelf items={consumedContent} />
    </div>
  )
}
