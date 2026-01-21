import QuoteNetwork, { type Quote } from '@/components/quote-network'

export const metadata = {
  title: 'Quote Network',
}

const quotes: Quote[] = [
  {
    id: '1',
    text: 'We suffer more often in imagination than in reality.',
    source: 'Letters from a Stoic',
    author: 'Seneca',
    tags: ['stoicism', 'philosophy', 'mind'],
    relatedQuotes: ['2', '3'],
  },
  {
    id: '2',
    text: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
    source: 'Meditations',
    author: 'Marcus Aurelius',
    tags: ['stoicism', 'philosophy', 'control'],
    relatedQuotes: ['1', '3'],
  },
  {
    id: '3',
    text: 'The happiness of your life depends upon the quality of your thoughts.',
    source: 'Meditations',
    author: 'Marcus Aurelius',
    tags: ['stoicism', 'philosophy', 'happiness'],
    relatedQuotes: ['1', '2'],
  },
  {
    id: '4',
    text: 'The only way to go fast, is to go well.',
    source: 'Clean Code',
    author: 'Robert C. Martin',
    tags: ['programming', 'code', 'quality'],
    relatedQuotes: ['5'],
  },
  {
    id: '5',
    text: 'The best way to get the right answer on the internet is not to ask a question; it\'s to post the wrong answer.',
    source: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    tags: ['programming', 'learning', 'community'],
    relatedQuotes: ['4'],
  },
  {
    id: '6',
    text: 'If a man knows not to which port he sails, no wind is favorable.',
    source: 'Letters from a Stoic',
    author: 'Seneca',
    tags: ['stoicism', 'philosophy', 'direction'],
    relatedQuotes: ['1'],
  },
]

export default function QuotesPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Quotes
      </h1>
      <p className='mt-7 text-rurikon-400'>
        A collection of meaningful quotes connected by themes and ideas. Click on
        any quote to explore related thoughts and discover connections.
      </p>
      <QuoteNetwork quotes={quotes} />
    </div>
  )
}
