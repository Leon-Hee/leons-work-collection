import { useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function SpotlightCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-bg-card border border-border rounded-xl transition-all duration-300 hover:border-text-muted hover:-translate-y-1 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, var(--color-accent-glow), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
