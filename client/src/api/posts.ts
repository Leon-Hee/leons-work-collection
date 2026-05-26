import client from './client'

export function getPosts() {
  return client.get('/posts')
}

export function getPost(id: string) {
  return client.get(`/posts/${id}`)
}

export function createPost(data: { title: string; content: string; cover_image?: string }) {
  return client.post('/posts', data)
}

export function updatePost(id: string, data: { title?: string; content?: string; cover_image?: string }) {
  return client.put(`/posts/${id}`, data)
}

export function deletePost(id: string) {
  return client.delete(`/posts/${id}`)
}
