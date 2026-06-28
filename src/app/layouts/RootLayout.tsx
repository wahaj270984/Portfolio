import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { NeuralBackground } from '@/components/background/NeuralBackground'
import { Preloader } from '@/components/loading/Preloader'
import { RouteFallback } from '@/components/loading/RouteFallback'
import { Navbar } from '@/components/nav/Navbar'
import { ScrollProgress } from '@/components/nav/ScrollProgress'
import { SectionIndicator } from '@/components/nav/SectionIndicator'
import { Cursor } from '@/components/cursor/Cursor'
import { Toaster } from '@/components/Toaster'

/**
 * App chrome shared across all routes: the neural-constellation canvas background,
 * boot preloader, navigation + progress UI, custom cursor, the routed outlet, and toasts.
 */
export function RootLayout() {
  return (
    <>
      <NeuralBackground />
      <Preloader />

      <ScrollProgress />
      <Navbar />
      <SectionIndicator />
      <Cursor />

      <main className="relative">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Toaster />
    </>
  )
}
