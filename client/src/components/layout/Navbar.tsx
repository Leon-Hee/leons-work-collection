import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/skills', label: '技能' },
  { to: '/blog', label: '博客' },
  { to: '/about', label: '关于' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-text-primary tracking-tight">
          Leon<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === to
                  ? 'text-text-primary bg-bg-secondary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="md:hidden" />
      </div>
    </nav>
  )
}
