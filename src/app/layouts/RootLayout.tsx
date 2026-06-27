import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { SceneCanvas } from '@/three/SceneCanvas'
import { Preloader } from '@/components/loading/Preloader'
import { RouteFallback } from '@/components/loading/RouteFallback'
import { Navbar } from '@/components/nav/Navbar'
import { ScrollProgress } from '@/components/nav/ScrollProgress'
import { SectionIndicator } from '@/components/nav/SectionIndicator'
import { Cursor } from '@/components/cursor/Cursor'
import { Toaster } from '@/components/Toaster'

/**
 * App chrome shared across all routes: the persistent 3D canvas behind the
 * content, boot preloader, navigation + progress UI, custom cursor, the routed
 * outlet, and toasts.
 */
export function RootLayout() {
  return (
    <>
      <SceneCanvas />
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
