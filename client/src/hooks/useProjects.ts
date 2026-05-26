import { useState, useEffect } from 'react'
import { getProjects } from '../api/projects'

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data.data))
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}
