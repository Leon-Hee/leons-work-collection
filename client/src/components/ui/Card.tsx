import type { ReactNode, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export default function Card({ children, hover = true, className = '', ...props }: Props) {
  return (
    <div
      className={`bg-bg-card border border-border rounded-xl p-6 ${
        hover ? 'transition-all duration-300 hover:border-text-muted hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
