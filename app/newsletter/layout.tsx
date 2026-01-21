import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
