import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export default function Button({ variant = 'primary', children, className = '', ...props }: Props) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25',
    secondary: 'bg-bg-card text-text-primary border border-border hover:border-text-muted',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
