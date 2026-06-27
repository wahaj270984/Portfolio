import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (only the weights we use).
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'

import '@/styles/globals.css'
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
