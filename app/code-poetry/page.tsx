import CodePoetry, { type CodePoem } from '@/components/code-poetry'

export const metadata = {
  title: 'Code Poetry',
}

const poems: CodePoem[] = [
  {
    id: '1',
    title: 'The Elegant Function',
    code: `function findTruth(data) {
  return data
    .filter(item => item.isValid)
    .map(item => item.value)
    .reduce((acc, val) => acc + val, 0);
}`,
    language: 'JavaScript',
    explanation:
      'A simple function that demonstrates the beauty of functional programming. Each transformation is clear, each step purposeful. The code reads like a sentence: filter the valid, extract the values, sum them together.',
    theme: 'Clarity through simplicity',
  },
  {
    id: '2',
    title: 'The Recursive Thought',
    code: `const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};`,
    language: 'JavaScript',
    explanation:
      'Recursion mirrors the natural world—each call builds upon the previous, creating patterns that echo through mathematics and nature. The function is both the problem and its solution.',
    theme: 'Self-reference and patterns',
  },
  {
    id: '3',
    title: 'The Promise of Tomorrow',
    code: `async function awaitTheFuture() {
  const today = await getCurrentMoment();
  const tomorrow = await today.then(m => m.addDays(1));
  return tomorrow;
}`,
    language: 'JavaScript',
    explanation:
      'Asynchronous code as metaphor for patience and anticipation. We cannot rush the future, but we can prepare for it, structure our expectations, and handle what comes with grace.',
    theme: 'Time and patience',
  },
]

export default function CodePoetryPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Code Poetry
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Code snippets presented as poetry, where syntax becomes verse and logic
        becomes narrative. Click to explore the deeper meaning behind each
        piece.
      </p>
      <CodePoetry poems={poems} />
    </div>
  )
}
