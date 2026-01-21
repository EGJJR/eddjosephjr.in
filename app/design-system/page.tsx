export const metadata = {
  title: 'Design System',
}

export default function DesignSystemPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Design System
      </h1>
      <p className='mt-7 text-rurikon-400'>
        A showcase of the design decisions, typography, colors, and components
        that define this site's aesthetic.
      </p>

      {/* Typography */}
      <section className='mt-14'>
        <h2 className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'>
          Typography
        </h2>
        <div className='space-y-6'>
          <div>
            <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-2'>
              Sans Serif (Inter)
            </p>
            <p className='text-rurikon-500'>
              The primary typeface for body text and UI elements. Optimized for
              readability with variable font weights and optical sizing.
            </p>
          </div>
          <div>
            <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-2'>
              Serif (Lora Italic)
            </p>
            <p className='text-rurikon-400' style={{ fontFamily: 'var(--serif)' }}>
              Used for emphasis, blockquotes, and sidenotes. Adds a literary,
              academic feel to the content.
            </p>
          </div>
          <div>
            <p className='font-mono text-xs text-rurikon-300 uppercase tracking-tighter mb-2'>
              Monospace (Iosevka)
            </p>
            <p className='font-mono text-rurikon-500'>
              Used for code, status badges, and technical labels. Maintains
              consistent character width.
            </p>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className='mt-14'>
        <h2 className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'>
          Color Palette
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className='space-y-2'>
              <div
                className={`w-full h-16 border border-rurikon-border rounded-sm bg-rurikon-${shade}`}
              />
              <p className='font-mono text-xs text-rurikon-400'>
                rurikon-{shade}
              </p>
            </div>
          ))}
        </div>
        <p className='text-sm text-rurikon-400 mt-6'>
          A custom grayscale palette designed for optimal contrast and
          readability. The name "rurikon" reflects the depth and sophistication
          of the color system.
        </p>
      </section>

      {/* Spacing */}
      <section className='mt-14'>
        <h2 className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'>
          Spacing
        </h2>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 6, 7, 8, 10, 14].map((size) => (
            <div key={size} className='flex items-center gap-4'>
              <div
                className='bg-rurikon-200 border border-rurikon-border'
                style={{ width: `${size * 0.25}rem`, height: '1rem' }}
              />
              <span className='font-mono text-xs text-rurikon-400'>
                {size * 0.25}rem ({size * 4}px)
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className='mt-14'>
        <h2 className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'>
          Components
        </h2>
        <div className='space-y-6'>
          <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
            <h3 className='font-semibold text-rurikon-600 mb-2'>Status Badge</h3>
            <div className='flex flex-wrap gap-2'>
              <span className='font-mono text-[0.7rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter text-rurikon-600 bg-rurikon-100'>
                [ACTIVE]
              </span>
              <span className='font-mono text-[0.7rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter text-rurikon-500 bg-rurikon-50'>
                [COMPLETE]
              </span>
              <span className='font-mono text-[0.7rem] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter text-rurikon-300 bg-transparent border border-rurikon-200'>
                [PENDING]
              </span>
            </div>
          </div>

          <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
            <h3 className='font-semibold text-rurikon-600 mb-2'>Blockquote</h3>
            <blockquote className='pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 text-rurikon-400'>
              <p className='mt-0'>
                This is how blockquotes appear throughout the site, using the
                serif font for emphasis.
              </p>
            </blockquote>
          </div>

          <div className='border border-rurikon-border rounded-sm p-4 sm:p-6'>
            <h3 className='font-semibold text-rurikon-600 mb-2'>Links</h3>
            <a
              href='#'
              className='text-rurikon-500 hover:text-rurikon-700 underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 transition-colors'
            >
              Example link with hover state
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
