import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './router'
import MouseGlow from './components/effects/MouseGlow'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MouseGlow />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}
