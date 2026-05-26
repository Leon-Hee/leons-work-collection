import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPost } from '../../api/posts'
import MarkdownRenderer from '../../components/ui/MarkdownRenderer'
import Spinner from '../../components/ui/Spinner'

export default function BlogDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getPost(id)
      .then((res) => setPost(res.data.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex justify-center py-40"><Spinner /></div>
  if (!post) return <p className="text-text-muted text-center py-40">Post not found.</p>

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/blog" className="text-sm text-text-muted hover:text-text-secondary transition-colors">&larr; Back to blog</Link>
        <h1 className="text-4xl font-bold text-text-primary mt-4 mb-4">{post.title}</h1>
        <time className="text-sm text-text-muted mb-8 block">
          {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} className="w-full rounded-xl mb-8 border border-border" />
        )}
        <MarkdownRenderer content={post.content} />
      </motion.article>
    </div>
  )
}
