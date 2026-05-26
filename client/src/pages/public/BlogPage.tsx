import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePosts } from '../../hooks/usePosts'
import Spinner from '../../components/ui/Spinner'

export default function BlogPage() {
  const { posts, loading, error } = usePosts()

  return (
    <div className="max-w-3xl mx-auto px-6 min-h-[calc(100vh-72px)] flex flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-text-primary mb-2">博客</h1>
        <p className="text-text-secondary mb-10">关于 Web 开发、图形学以及更多话题的思考。</p>
      </motion.div>

      {loading && <div className="flex justify-center py-20"><Spinner /></div>}
      {error && <p className="text-red-400 text-center py-20">{error}</p>}

      <div className="space-y-6">
        {posts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Link
              to={`/blog/${p.id}`}
              className="block bg-bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-text-muted hover:shadow-lg hover:shadow-accent/5"
            >
              <h2 className="text-lg font-semibold text-text-primary mb-2">{p.title}</h2>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <time>{new Date(p.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {p.cover_image && (
                  <span className="text-xs bg-bg-secondary px-2 py-0.5 rounded">封面图</span>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {!loading && !error && posts.length === 0 && (
        <p className="text-text-muted text-center py-20">暂无文章。</p>
      )}
    </div>
  )
}
