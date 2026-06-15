import { promises as fs } from 'fs'
import Link from 'next/link'
import path from 'path'

export const metadata = {
  title: 'Thoughts',
}

// In the future we can have a pagination here e.g. /1/*.mdx
const articlesDirectory = path.join(
  process.cwd(),
  'app',
  'thoughts',
  '_articles'
)

export default async function Page() {
  const articles = await fs.readdir(articlesDirectory)

  const items = []
  for (const article of articles) {
    if (!article.endsWith('.mdx')) continue
    const module = await import('./_articles/' + article)

    if (!module.metadata) throw new Error('Missing `metadata` in ' + article)

    items.push({
      slug: article.replace(/\.mdx$/, ''),
      title: module.metadata.title,
      date: module.metadata.date || '-',
      sort: Number(module.metadata.date?.replaceAll('.', '') || 0),
    })
  }
  items.sort((a, b) => b.sort - a.sort)

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.slug} className='font-medium'>
            <Link
              href={`/thoughts/${item.slug}`}
              className='group flex gap-1 justify-between items-baseline'
              draggable={false}
            >
              <span className='block text-rurikon-500 group-hover:text-rurikon-700 min-w-0 break-words'>
                {item.title}
              </span>
              <span className='text-rurikon-200 font-normal mx-1 hidden mobile:inline'>;</span>
              <span className='flex-1 hidden mobile:block' />
              <time className='block text-rurikon-200 tabular-nums font-normal tracking-tighter group-hover:text-rurikon-500 transition-colors group-hover:transition-none flex-shrink-0'>
                {item.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
