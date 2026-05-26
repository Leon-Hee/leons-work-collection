import client from './client'

export function login(email: string, password: string) {
  return client.post('/auth/login', { email, password })
}

export function register(email: string, password: string) {
  return client.post('/auth/register', { email, password })
}

export function getMe() {
  return client.get('/auth/me')
}
