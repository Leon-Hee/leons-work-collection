import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../../api/posts'
import { getProjects } from '../../api/projects'
import Card from '../../components/ui/Card'

export default function DashboardPage() {
  const [postCount, setPostCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)

  useEffect(() => {
    getPosts().then((r) => setPostCount(r.data.data?.length || 0)).catch(() => {})
    getProjects().then((r) => setProjectCount(r.data.data?.length || 0)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/posts">
          <Card>
            <p className="text-sm text-text-muted mb-1">Total Posts</p>
            <p className="text-3xl font-bold text-text-primary">{postCount}</p>
          </Card>
        </Link>
        <Link to="/admin/projects">
          <Card>
            <p className="text-sm text-text-muted mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-text-primary">{projectCount}</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
