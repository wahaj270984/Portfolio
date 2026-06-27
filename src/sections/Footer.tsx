import { ArrowUp } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import { navigation } from '@/config/navigation'
import { scrollToSection, scrollToTop } from '@/hooks'

const socials = [
  { href: site.links.github, label: 'GitHub', Icon: FaGithub },
  { href: site.links.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: site.links.twitter, label: 'Twitter', Icon: FaXTwitter },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-14">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-sm space-y-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 font-heading text-lg font-bold"
              >
                <span className="grid size-8 place-items-center rounded-md bg-gradient-to-br from-primary to-accent text-sm text-primary-foreground">
                  W
                </span>
                {site.name}
              </button>
              <p className="text-sm text-muted-foreground">
                Building intelligent systems that see, reason, and ship. Always
                up for a good problem.
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3" aria-label="Footer">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © {site.author}. Built with React Three Fiber, GLSL & a lot of coffee.
            </p>

            <div className="flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="ml-2 rounded-full"
                onClick={scrollToTop}
                aria-label="Back to top"
              >
                <ArrowUp />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
