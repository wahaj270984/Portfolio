import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { SceneCanvas } from '@/three/SceneCanvas'
import { Preloader } from '@/components/loading/Preloader'
import { RouteFallback } from '@/components/loading/RouteFallback'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Toaster } from '@/components/Toaster'

/**
 * App chrome shared across all routes: the persistent 3D canvas behind the
 * content, boot preloader, top-bar controls, the routed outlet, and toasts.
 */
export function RootLayout() {
  return (
    <>
      <SceneCanvas />
      <Preloader />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-end p-4">
        <ThemeToggle />
      </header>

      <main className="relative">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Toaster />
    </>
  )
}
