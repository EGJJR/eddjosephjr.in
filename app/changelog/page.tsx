import cn from 'clsx'
import data from './data.json'

export const metadata = {
  title: 'Changelog',
}

type EntryType = 'added' | 'changed' | 'fixed' | 'removed'

const typeStyles: Record<EntryType, { label: string; dot: string }> = {
  added: { label: 'Added', dot: 'bg-rurikon-400' },
  changed: { label: 'Changed', dot: 'bg-rurikon-300' },
  fixed: { label: 'Fixed', dot: 'bg-rurikon-200' },
  removed: { label: 'Removed', dot: 'bg-rurikon-200' },
}

export default function ChangelogPage() {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-rurikon-800 font-bold text-lg mb-2">Changelog</h1>
        <p className="text-rurikon-400 text-sm leading-relaxed">
          A running record of what changed and when. Inspired by{' '}
          <a href="https://keepachangelog.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-rurikon-200 hover:decoration-rurikon-400 transition-colors">
            Keep a Changelog
          </a>.
        </p>
      </header>

      <div className="space-y-12">
        {data.map((release) => (
          <section key={release.version} className="relative">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-rurikon-700 font-semibold">
                {release.title}
              </h2>
              <span className="font-mono text-[0.65rem] text-rurikon-300 tabular-nums">
                v{release.version}
              </span>
            </div>
            <time className="block font-mono text-[0.6rem] text-rurikon-200 uppercase tracking-widest mb-4">
              {release.date}
            </time>

            <ul className="space-y-2">
              {release.entries.map((entry, i) => {
                const style = typeStyles[entry.type as EntryType] || typeStyles.added
                return (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn('w-1.5 h-1.5 rounded-full mt-[0.45rem] flex-shrink-0', style.dot)}
                      title={style.label}
                    />
                    <span className="text-rurikon-500 leading-relaxed">{entry.text}</span>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
