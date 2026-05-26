import { useState, useEffect, type FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, createProject, updateProject } from '../../api/projects'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Spinner from '../../components/ui/Spinner'

export default function ProjectEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id || id === 'new'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [techStack, setTechStack] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (isNew) return
    getProject(id!)
      .then((r) => {
        const p = r.data.data
        setTitle(p.title)
        setDescription(p.description)
        setTechStack(p.tech_stack?.join(', ') || '')
        setGithubUrl(p.github_url || '')
        setDemoUrl(p.demo_url || '')
      })
      .finally(() => setLoading(false))
  }, [id, isNew])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      title,
      description,
      tech_stack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
      github_url: githubUrl || undefined,
      demo_url: demoUrl || undefined,
    }
    try {
      if (isNew) {
        await createProject(payload)
      } else {
        await updateProject(id!, payload)
      }
      navigate('/admin/projects')
    } catch {
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">{isNew ? '新建项目' : '编辑项目'}</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <Input label="标题" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-text-secondary">描述</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-y"
            required
          />
        </div>
        <Input label="技术栈 (逗号分隔)" value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, Node.js, PostgreSQL" />
        <Input label="GitHub URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
        <Input label="Demo URL" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://..." />
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? '保存中...' : '保存'}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/projects')}>取消</Button>
        </div>
      </form>
    </div>
  )
}
