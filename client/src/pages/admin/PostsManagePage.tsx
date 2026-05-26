import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, deletePost } from '../../api/posts'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function PostsManagePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = () => {
    getPosts()
      .then((r) => setPosts(r.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这篇文章？')) return
    await deletePost(id)
    setPosts((p) => p.filter((x) => x.id !== id))
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">文章管理</h1>
        <Link to="/admin/posts/new"><Button>新建文章</Button></Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-text-muted">暂无文章。</p>
      ) : (
        <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-text-secondary font-medium">标题</th>
                <th className="text-left px-4 py-3 text-text-secondary font-medium">创建时间</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 text-text-primary">{p.title}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Date(p.created_at).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link to={`/admin/posts/${p.id}`} className="text-sm text-accent hover:underline">编辑</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-sm text-red-400 hover:underline cursor-pointer">删除</button>
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
