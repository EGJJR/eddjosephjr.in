import Bookshelf, { type Book } from '@/components/bookshelf'

export const metadata = {
  title: 'Bookshelf',
}

// Sample books data - in production, this would come from Notion/Goodreads API
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Letters from a Stoic',
    author: 'Seneca',
    status: 'COMPLETED',
    year: '2024',
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
    status: 'READING',
    year: '2024',
  },
  {
    id: '4',
    title: 'The Art of Computer Programming',
    author: 'Donald Knuth',
    status: 'TO-READ',
    year: '2025',
  },
  {
    id: '5',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    status: 'COMPLETED',
    year: '2023',
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
    status: 'TO-READ',
    year: '2025',
  },
  {
    id: '7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'COMPLETED',
    year: '2023',
    quotes: [
      'The only way to go fast, is to go well.',
    ],
  },
  {
    id: '8',
    title: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    status: 'READING',
    year: '2024',
  },
]

export default function BookshelfPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Bookshelf
      </h1>
      <p className='mt-7 text-rurikon-400'>
        A collection of books I've read, am reading, or plan to read. Click on
        any book to see favorite quotes or analysis.
      </p>
      <Bookshelf books={sampleBooks} />
    </div>
  )
}
