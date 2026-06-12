import { promises as fs } from 'fs'
import path from 'path'

const SITE_URL = 'https://eddjosephjr.in'

export async function GET() {
  const articlesDir = path.join(process.cwd(), 'app', 'thoughts', '_articles')
  const files = await fs.readdir(articlesDir)

  const articles = []
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    const mod = await import(`@/app/thoughts/_articles/${file}`)
    if (!mod.metadata) continue
    articles.push({
      slug: file.replace(/\.mdx$/, ''),
      title: mod.metadata.title,
      date: mod.metadata.date || '',
      description: mod.metadata.description || '',
    })
  }

  articles.sort((a, b) => (b.date > a.date ? 1 : -1))

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/thoughts/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/thoughts/${a.slug}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${a.date ? new Date(a.date).toUTCString() : ''}</pubDate>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Edd Joseph Jr.</title>
    <link>${SITE_URL}</link>
    <description>Thoughts on engineering, design, and how technology shapes daily life.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
