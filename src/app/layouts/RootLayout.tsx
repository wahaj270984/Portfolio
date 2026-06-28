import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { MeshField } from '@/components/background/MeshField'
import { Preloader } from '@/components/loading/Preloader'
import { RouteFallback } from '@/components/loading/RouteFallback'
import { Navbar } from '@/components/nav/Navbar'
import { ScrollProgress } from '@/components/nav/ScrollProgress'
import { SectionIndicator } from '@/components/nav/SectionIndicator'
import { Toaster } from '@/components/Toaster'

/**
 * App chrome shared across all routes: the site-wide scroll-driven 3D mesh
 * background, boot preloader, navigation + progress UI, the routed outlet, and
 * toasts. (The native OS cursor is used — no custom cursor overlay.)
 */
export function RootLayout() {
  return (
    <>
      <MeshField />
      <Preloader />

      <ScrollProgress />
      <Navbar />
      <SectionIndicator />

      <main className="relative">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Toaster />
    </>
  )
}
