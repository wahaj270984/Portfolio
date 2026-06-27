import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function NotFound() {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Button asChild className="mt-2">
        <Link to="/">Back home</Link>
      </Button>
    </Container>
  )
}
