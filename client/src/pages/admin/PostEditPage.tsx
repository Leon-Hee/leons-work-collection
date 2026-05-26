import { useState, useEffect, type FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, createPost, updatePost } from '../../api/posts'
import { createClient } from '@supabase/supabase-js'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Spinner from '../../components/ui/Spinner'

let supabase: ReturnType<typeof createClient> | null = null
function getSupabase() {
  if (!supabase) {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error('Supabase credentials not configured')
    }
    supabase = createClient(url, key)
  }
  return supabase
}

export default function PostEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id || id === 'new'

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (isNew) return
    getPost(id!)
      .then((r) => {
        const p = r.data.data
        setTitle(p.title)
        setContent(p.content)
        setCoverImage(p.cover_image || '')
      })
      .finally(() => setLoading(false))
  }, [id, isNew])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const path = `covers/${Date.now()}-${file.name}`
    const { error } = await getSupabase().storage.from('images').upload(path, file)
    if (error) {
      alert('Upload failed: ' + error.message)
      return
    }
    const { data } = getSupabase().storage.from('images').getPublicUrl(path)
    setCoverImage(data.publicUrl)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { title, content, cover_image: coverImage || undefined }
      if (isNew) {
        await createPost(payload as { title: string; content: string; cover_image?: string })
      } else {
        await updatePost(id!, payload)
      }
      navigate('/admin/posts')
    } catch {
      alert('Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">{isNew ? 'New Post' : 'Edit Post'}</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-text-secondary">Content (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-y font-mono"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-text-secondary">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-bg-secondary file:text-text-primary hover:file:bg-bg-card cursor-pointer" />
          {coverImage && (
            <img src={coverImage} alt="Cover preview" className="w-40 h-24 object-cover rounded-lg border border-border mt-2" />
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/posts')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
