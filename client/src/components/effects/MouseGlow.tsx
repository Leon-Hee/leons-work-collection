import { useMouseGlow } from '../../hooks/useMouseGlow'

export default function MouseGlow() {
  const { x, y } = useMouseGlow()

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          left: x - 300,
          top: y - 300,
        }}
      />
    </div>
  )
}
