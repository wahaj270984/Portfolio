import { Spinner } from '@/components/ui/spinner'

/** Suspense fallback for lazily-loaded routes / code-split chunks. */
export function RouteFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="size-6" />
    </div>
  )
}
