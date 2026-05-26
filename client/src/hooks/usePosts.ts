import { useState, useEffect } from 'react'
import { getPosts } from '../api/posts'

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data.data))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}
