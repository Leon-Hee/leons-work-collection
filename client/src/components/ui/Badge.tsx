export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bg-secondary border border-border text-text-secondary">
      {children}
    </span>
  )
}
