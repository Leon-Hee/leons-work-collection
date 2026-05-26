import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProjects } from '../../hooks/useProjects'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects()

  return (
    <div className="max-w-5xl mx-auto px-6 min-h-[calc(100vh-72px)] flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-text-primary mb-2">项目作品</h1>
        <p className="text-text-secondary mb-10">我构建和参与过的项目。</p>
      </motion.div>

      {loading && (
        <div className="flex justify-center py-20"><Spinner /></div>
      )}
      {error && <p className="text-red-400 text-center py-20">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Link to={`/projects/${p.id}`}>
              <Card>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tech_stack?.map((tech: string) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {!loading && !error && projects.length === 0 && (
        <p className="text-text-muted text-center py-20">暂无项目。</p>
      )}
    </div>
  )
}
