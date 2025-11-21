import { createRoot } from 'react-dom/client'
import './app.css'
import { Router } from './app/router'

createRoot(document.getElementById('root')!).render(<Router />)
