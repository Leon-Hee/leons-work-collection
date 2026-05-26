import client from './client'

export function getProjects() {
  return client.get('/projects')
}

export function getProject(id: string) {
  return client.get(`/projects/${id}`)
}

export function createProject(data: {
  title: string
  description: string
  tech_stack?: string[]
  github_url?: string
  demo_url?: string
}) {
  return client.post('/projects', data)
}

export function updateProject(
  id: string,
  data: {
    title?: string
    description?: string
    tech_stack?: string[]
    github_url?: string
    demo_url?: string
  }
) {
  return client.put(`/projects/${id}`, data)
}

export function deleteProject(id: string) {
  return client.delete(`/projects/${id}`)
}
