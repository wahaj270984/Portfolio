import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

/** Full-page fallback for unrecoverable render errors. */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-primary">Something broke</p>
      <h1 className="text-3xl font-semibold">An unexpected error occurred</h1>
      <p className="max-w-md text-muted-foreground">
        {import.meta.env.DEV && error instanceof Error
          ? error.message
          : 'Try reloading the page. If the problem persists, please reach out.'}
      </p>
      <div className="mt-2 flex gap-3">
        <Button onClick={resetErrorBoundary}>Try again</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    </Container>
  )
}
