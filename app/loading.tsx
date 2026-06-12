export default function Loading() {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-8 gap-[3px] max-w-[180px]">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="aspect-square bg-rurikon-100 rounded-[1px]"
            style={{
              animation: `pulse-subtle 1.4s ease-in-out ${i * 60}ms infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
