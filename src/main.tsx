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

// Easter egg: a signature for anyone who opens the console.
console.log(
  '%c⚡ Muhammad Wahaj Khan %c\nYou found the console. Try the Konami code, or `help` in the contact terminal.',
  'font-size:16px;font-weight:bold;color:#4d8dff',
  'color:#8a94a8',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
