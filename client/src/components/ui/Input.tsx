import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-text-secondary">{label}</label>}
      <input
        className={`bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
