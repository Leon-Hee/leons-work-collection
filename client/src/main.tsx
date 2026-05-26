import './index.css'
import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Diagnostic: verify JS loads
const el = document.getElementById('root')!
el.textContent = 'JS loaded, mounting React...'

try {
  createRoot(el).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e: unknown) {
  el.innerHTML = `<div style="color:red;padding:40px;">Fatal: ${String(e)}</div>`
}
