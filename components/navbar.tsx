'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import Search from './search'

function Item(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const href = props.href

  if (typeof href !== 'string') {
    throw new Error('`href` must be a string')
  }

  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <li
      className={cn(
        isActive
          ? 'text-rurikon-800'
          : 'text-rurikon-300 hover:text-rurikon-600',
        'transition-colors hover:transform-none',
        '-mx-2'
      )}
    >
      <Link {...props} className='inline-block w-full px-2' draggable={false} />
    </li>
  )
}

export default function Navbar() {
  return (
    <nav className='mobile:mr-6 sm:mr-10 md:mr-14 w-full mobile:w-16'>
      <ul className='lowercase text-right mobile:sticky top-6 sm:top-10 md:top-14 mb-4 mobile:mb-0 flex flex-wrap gap-x-2 gap-y-1 justify-end mobile:block'>
        <Item href='/'>About</Item>
        <Item href='/thoughts'>Thoughts</Item>
        {/* <Item href='/visuals'>Visuals</Item> */}
        <Item href='/projects'>Projects</Item>
        <Item href='/curated'>Curated</Item>
        <Item href='/design-system'>System</Item>
        <Item href='/changelog'>Changelog</Item>
        {/* <Item href='/bookshelf'>Bookshelf</Item> */}
        {/* <Item href='/quotes'>Quotes</Item> */}
        {/* <Item href='/newsletter'>Newsletter</Item> */}
        {/* <Item href='/mind-map'>Mind Map</Item> */}
        {/* <Item href='/timeline'>Timeline</Item> */}
        {/* <Item href='/reading-activity'>Reading Activity</Item> */}
        {/* <Item href='/code-poetry'>Code Poetry</Item> */}
        {/* <Item href='/thought-experiments'>Thought Experiments</Item> */}
        {/* <Item href='/projects-cli'>Projects CLI</Item> */}
        {/* <Item href='/project-archaeology'>Project Archaeology</Item> */}
        {/* <Item href='/dialogues'>Dialogues</Item> */}
        {/* <Item href='/design-evolution'>Design Evolution</Item> */}
        {/* <Item href='/conversations'>Conversations</Item> */}
        {/* <Item href='/analytics'>Analytics</Item> */}
        {/* <Item href='/design-system'>Design System</Item> */}
        {/* <Item href='/guestbook'>Guestbook</Item> */}
        <li className="mt-2 -mx-2 px-2 hidden mobile:flex items-center gap-3">
          <Search />
          <ThemeToggle />
        </li>
      </ul>
      <div className="mobile:hidden fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <Search />
        <ThemeToggle />
      </div>
    </nav>
  )
}
