'use client'

import cn from 'clsx'

const colors = [
  { name: '50', var: '--color-rurikon-50', hex: '#ebedef' },
  { name: '100', var: '--color-rurikon-100', hex: '#d8dbdf' },
  { name: '200', var: '--color-rurikon-200', hex: '#b3b9c1' },
  { name: '300', var: '--color-rurikon-300', hex: '#8c95a1' },
  { name: '400', var: '--color-rurikon-400', hex: '#697381' },
  { name: '500', var: '--color-rurikon-500', hex: '#4a515b' },
  { name: '600', var: '--color-rurikon-600', hex: '#3b4149' },
  { name: '700', var: '--color-rurikon-700', hex: '#2b3035' },
  { name: '800', var: '--color-rurikon-800', hex: '#1e2125' },
  { name: '900', var: '--color-rurikon-900', hex: '#0e0f11' },
  { name: '950', var: '--color-rurikon-950', hex: '#07080a' },
]

const fonts = [
  {
    name: 'Inter Variable',
    cls: 'font-sans',
    role: 'Body, UI, headings',
    sample: 'The quick brown fox jumps over the lazy dog',
    weights: [
      { label: '440 (normal)', style: { fontVariationSettings: "'wght' 440, 'opsz' 32" } },
      { label: '500 (medium)', style: { fontVariationSettings: "'wght' 500, 'opsz' 32" } },
      { label: '600 (semibold)', style: { fontVariationSettings: "'wght' 600, 'opsz' 32" } },
      { label: '640 (bold)', style: { fontVariationSettings: "'wght' 640, 'opsz' 32" } },
    ],
  },
  {
    name: 'Lora Italic Variable',
    cls: 'font-serif',
    role: 'Emphasis, quotes, nav',
    sample: 'The quick brown fox jumps over the lazy dog',
    weights: [
      { label: '480 (default)', style: { fontVariationSettings: "'wght' 480, 'opsz' 32" } },
    ],
  },
  {
    name: 'Iosevka Fixed Curly',
    cls: 'font-mono',
    role: 'Code, labels, metadata',
    sample: 'const x = fn(a, b) => a + b;',
    weights: [
      { label: 'Extended Medium', style: {} },
    ],
  },
]

const spacing = [
  { name: 'Page padding', value: '24px → 40px → 56px' },
  { name: 'Content max-width', value: '42rem (672px)' },
  { name: 'Line height (body)', value: '1.75rem (28px)' },
  { name: 'Baseline grid', value: '1.75rem' },
  { name: 'Nav width (desktop)', value: '4rem (64px)' },
]

export default function DesignSystemPage() {
  return (
    <div className="space-y-14">
      <header>
        <h1 className="text-rurikon-800 font-bold text-lg mb-2">Design System</h1>
        <p className="text-rurikon-400 text-sm leading-relaxed">
          The visual language of this site. Every decision is intentional; nothing is decorative without purpose.
        </p>
      </header>

      {/* Philosophy */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-4">Philosophy</h2>
        <div className="space-y-3 text-sm text-rurikon-500 leading-relaxed">
          <p>Premium utilitarian minimalism. Bone-white background, tight typography, no gratuitous gradients or shadows. Every pixel earns its place.</p>
          <p>Dark mode inverts the palette semantically; the same design tokens produce both themes without separate color schemes.</p>
        </div>
      </section>

      {/* Colors */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-4">Color — Rurikon</h2>
        <p className="text-sm text-rurikon-400 mb-6">
          Named after the traditional Japanese color <em>瑠璃紺</em> (rurikon). A single blue-grey scale anchors the entire palette.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-1">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1.5">
              <div
                className="w-full aspect-square rounded-sm border border-rurikon-border"
                style={{ backgroundColor: `var(${c.var})` }}
              />
              <span className="font-mono text-[0.5rem] text-rurikon-300 text-center leading-tight">
                {c.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-sm border border-rurikon-border">
            <div className="font-mono text-[0.6rem] text-rurikon-300 uppercase tracking-tight mb-2">Background</div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm border border-rurikon-border" style={{ backgroundColor: 'var(--background)' }} />
              <code className="text-xs text-rurikon-400">#fcfcfc</code>
            </div>
          </div>
          <div className="p-4 rounded-sm border border-rurikon-border">
            <div className="font-mono text-[0.6rem] text-rurikon-300 uppercase tracking-tight mb-2">Border</div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: 'var(--color-rurikon-border)' }} />
              <code className="text-xs text-rurikon-400">#d8dbdfb3</code>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-4">Typography</h2>
        <div className="space-y-8">
          {fonts.map((font) => (
            <div key={font.name} className="border-t border-rurikon-border pt-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-rurikon-600 font-semibold text-sm">{font.name}</h3>
                <span className="font-mono text-[0.6rem] text-rurikon-200 uppercase">{font.role}</span>
              </div>
              <div className="space-y-2 mt-3">
                {font.weights.map((w) => (
                  <div key={w.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="font-mono text-[0.55rem] text-rurikon-200 sm:w-28 flex-shrink-0">{w.label}</span>
                    <span className={cn(font.cls, 'text-rurikon-500 text-base')} style={w.style}>
                      {font.sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-sm border border-rurikon-border">
          <div className="font-mono text-[0.6rem] text-rurikon-300 uppercase tracking-tight mb-2">OpenType Features</div>
          <code className="text-xs text-rurikon-400 leading-relaxed">
            &apos;cpsp&apos; 1, &apos;cv01&apos;, &apos;cv03&apos;, &apos;cv04&apos;, &apos;calt&apos;, &apos;ss03&apos;, &apos;liga&apos;, &apos;ordn&apos;
          </code>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-4">Spacing &amp; Layout</h2>
        <div className="border border-rurikon-border rounded-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[320px]">
            <thead>
              <tr className="border-b border-rurikon-border bg-rurikon-50">
                <th className="text-left px-3 py-2 text-rurikon-400 font-mono text-[0.6rem] uppercase tracking-tight">Token</th>
                <th className="text-left px-3 py-2 text-rurikon-400 font-mono text-[0.6rem] uppercase tracking-tight">Value</th>
              </tr>
            </thead>
            <tbody>
              {spacing.map((s) => (
                <tr key={s.name} className="border-b border-rurikon-border last:border-0">
                  <td className="px-3 py-2 text-rurikon-500">{s.name}</td>
                  <td className="px-3 py-2 font-mono text-xs text-rurikon-400">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-4">Components</h2>
        <div className="space-y-6">
          <div className="border border-rurikon-border rounded-sm p-4">
            <h3 className="font-semibold text-rurikon-600 text-sm mb-3">Status Badges</h3>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tight text-rurikon-600 bg-rurikon-100">active</span>
              <span className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tight text-rurikon-400 bg-rurikon-50">complete</span>
              <span className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tight text-rurikon-300 border border-rurikon-200">pending</span>
            </div>
          </div>
          <div className="border border-rurikon-border rounded-sm p-4">
            <h3 className="font-semibold text-rurikon-600 text-sm mb-3">Blockquote</h3>
            <blockquote className="border-l border-rurikon-200 pl-4 ml-0">
              <p className="mt-0 font-serif text-rurikon-500 leading-relaxed text-[0.95rem]">
                This is how blockquotes appear throughout the site, using the serif font for emphasis.
              </p>
            </blockquote>
          </div>
          <div className="border border-rurikon-border rounded-sm p-4">
            <h3 className="font-semibold text-rurikon-600 text-sm mb-3">Links</h3>
            <a href="#" className="text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2 decoration-rurikon-200 hover:decoration-rurikon-400 transition-colors">
              Example link with hover state
            </a>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section>
        <h2 className="font-mono text-[0.65rem] text-rurikon-300 uppercase tracking-widest mb-4">Principles</h2>
        <ol className="space-y-3 text-sm text-rurikon-500 leading-relaxed list-decimal pl-4">
          <li><strong className="text-rurikon-600">No decoration without function.</strong> No gradients, drop shadows, or rounded corners unless they communicate hierarchy.</li>
          <li><strong className="text-rurikon-600">Typography carries the design.</strong> Weight, tracking, and optical sizing do the work that color and imagery do elsewhere.</li>
          <li><strong className="text-rurikon-600">Motion is information.</strong> View transitions and animations signal state changes, never distract.</li>
          <li><strong className="text-rurikon-600">One scale, two themes.</strong> Dark mode inverts the semantic palette; no separate color system.</li>
          <li><strong className="text-rurikon-600">Content-first density.</strong> Maximum information with minimum chrome.</li>
        </ol>
      </section>
    </div>
  )
}
