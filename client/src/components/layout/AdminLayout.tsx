import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', exact: true },
  { to: '/admin/posts', label: 'Posts' },
  { to: '/admin/projects', label: 'Projects' },
]

export default function AdminLayout() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-bg-secondary border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <Link to="/admin" className="text-lg font-semibold text-text-primary">
            Admin<span className="text-accent">.</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ to, label, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border space-y-3">
          <p className="text-xs text-text-muted truncate">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-muted hover:text-red-400 hover:bg-bg-card transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
