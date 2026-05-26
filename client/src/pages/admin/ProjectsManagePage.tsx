import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, deleteProject } from '../../api/projects'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function ProjectsManagePage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = () => {
    getProjects()
      .then((r) => setProjects(r.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await deleteProject(id)
    setProjects((p) => p.filter((x) => x.id !== id))
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
        <Link to="/admin/projects/new"><Button>New Project</Button></Link>
      </div>
      {projects.length === 0 ? (
        <p className="text-text-muted">No projects yet.</p>
      ) : (
        <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-text-secondary font-medium">Title</th>
                <th className="text-left px-4 py-3 text-text-secondary font-medium">Tech Stack</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 text-text-primary">{p.title}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">
                    {p.tech_stack?.join(', ') || '-'}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link to={`/admin/projects/${p.id}`} className="text-sm text-accent hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-sm text-red-400 hover:underline cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
