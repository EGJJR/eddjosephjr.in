import { NextRequest, NextResponse } from 'next/server'

// ponytail: commits new curated items to data.json via GitHub Contents API.
// No database, no CMS — git is the source of truth.

const REPO = process.env.GITHUB_REPO || 'EGJJR/eddjosephjr.in'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const FILE_PATH = 'app/curated/data.json'

export async function POST(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
  }

  try {
    const item = await req.json()

    // Validate required fields
    if (!item.type || !item.title || !item.author) {
      return NextResponse.json({ error: 'type, title, and author are required' }, { status: 400 })
    }

    // Fetch current file from GitHub
    const fileRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
    )

    if (!fileRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch data.json from GitHub' }, { status: 500 })
    }

    const fileData = await fileRes.json()
    const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'))

    // Build new item with auto-generated ID
    const maxId = Math.max(...currentContent.map((i: any) => parseInt(i.id) || 0), 0)
    const newItem: any = {
      id: String(maxId + 1),
      type: item.type,
      title: item.title,
      author: item.author,
      date: new Date().getFullYear().toString(),
      status: item.status || 'consumed',
    }
    if (item.url) newItem.url = item.url
    if (item.note) newItem.note = item.note
    if (item.quote) newItem.quote = item.quote
    if (item.tags?.length) newItem.tags = item.tags

    currentContent.push(newItem)

    // Commit updated file
    const updateRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add curated ${item.type}: ${item.title}`,
          content: Buffer.from(JSON.stringify(currentContent, null, 2) + '\n').toString('base64'),
          sha: fileData.sha,
          branch: BRANCH,
        }),
      }
    )

    if (!updateRes.ok) {
      const err = await updateRes.text()
      return NextResponse.json({ error: 'Failed to commit', details: err }, { status: 500 })
    }

    return NextResponse.json({ success: true, item: newItem })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
