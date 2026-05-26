import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProject } from '../../api/projects'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getProject(id)
      .then((res) => setProject(res.data.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex justify-center py-40"><Spinner /></div>
  if (!project) return <p className="text-text-muted text-center py-40">项目未找到。</p>

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/projects" className="text-sm text-text-muted hover:text-text-secondary transition-colors">&larr; 返回项目</Link>
        <h1 className="text-4xl font-bold text-text-primary mt-4 mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack?.map((tech: string) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <p className="text-text-secondary leading-relaxed mb-8">{project.description}</p>
        <div className="flex gap-4">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">GitHub</Button>
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
              <Button>在线演示</Button>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}
