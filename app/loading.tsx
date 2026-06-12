export default function Loading() {
  return (
    <div className="mt-7 space-y-5">
      <div className="h-4 w-48 bg-rurikon-100 rounded-sm" style={{ animation: 'pulse-subtle 1.6s ease-in-out infinite' }} />
      <div className="h-3 w-full bg-rurikon-50 rounded-sm" style={{ animation: 'pulse-subtle 1.6s ease-in-out 100ms infinite' }} />
      <div className="h-3 w-3/4 bg-rurikon-50 rounded-sm" style={{ animation: 'pulse-subtle 1.6s ease-in-out 200ms infinite' }} />
    </div>
  )
}
