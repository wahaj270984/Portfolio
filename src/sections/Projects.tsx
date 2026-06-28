import { useState } from 'react'
import { ArrowUpRight, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { TiltCard } from '@/components/ui/tilt-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { projects, type Project } from '@/data/projects'
import { asset } from '@/config/assets'
import { cn } from '@/lib/utils'

const GRADIENT: Record<Project['accent'], string> = {
  primary: 'from-primary/40 via-primary/10 to-transparent',
  accent: 'from-accent/40 via-accent/10 to-transparent',
  violet: 'from-violet/40 via-violet/10 to-transparent',
}

const BADGE: Record<Project['accent'], 'default' | 'accent' | 'violet'> = {
  primary: 'default',
  accent: 'accent',
  violet: 'violet',
}

function ProjectCard({ project, onOpen, i }: { project: Project; onOpen: () => void; i: number }) {
  // Show the cover image when present; fall back to the gradient if it 404s.
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = !!project.image && !imgFailed

  return (
    <Reveal from="up" delay={i} className="h-full">
      <TiltCard className="group h-full">
        <GlassPanel
          pad="none"
          className="flex h-full flex-col overflow-hidden"
          tone="strong"
        >
          <button onClick={onOpen} className="flex h-full flex-col text-left" data-cursor="hover">
            {/* Cover image when available, otherwise a gradient + initials placeholder. */}
            <div
              className={cn(
                'relative aspect-[16/10] overflow-hidden bg-gradient-to-br',
                GRADIENT[project.accent],
              )}
            >
              {showImage ? (
                <img
                  src={asset(project.image!)}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                  className={cn(
                    'absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105',
                    project.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover',
                  )}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="absolute inset-0 [transform:translateZ(40px)] grid place-items-center">
                    <span className="font-heading text-5xl font-bold text-foreground/15">
                      {project.title
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  </div>
                </>
              )}
              <div className="absolute left-3 top-3 flex gap-2">
                <Badge variant={BADGE[project.accent]}>{project.category}</Badge>
              </div>
              <span className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold leading-tight">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
              </div>
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {project.tech.slice(0, 4).map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </button>
        </GlassPanel>
      </TiltCard>
    </Reveal>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <Section id="projects" aria-label="Projects">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title={<>Things I've <span className="text-gradient">designed, trained & shipped</span></>}
        description="A mix of hardware and software builds. Tap any card for the design, highlights, and the hard parts."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} onOpen={() => setActive(project)} />
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          {active && (
            <>
              <div
                className={cn(
                  'relative mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br',
                  active.image ? 'h-64' : 'h-28',
                  GRADIENT[active.accent],
                )}
              >
                {active.image ? (
                  <img
                    src={asset(active.image)}
                    alt={`${active.title} preview`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                    className={cn(
                      'absolute inset-0 h-full w-full',
                      active.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover',
                    )}
                  />
                ) : (
                  <span className="font-heading text-4xl font-bold text-foreground/20">
                    {active.title}
                  </span>
                )}
              </div>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={BADGE[active.accent]}>{active.category}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">{active.year}</span>
                </div>
                <DialogTitle className="font-heading text-2xl font-bold">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-base">{active.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 text-sm">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold">
                    <Layers className="size-4 text-primary" /> Tech stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tech.map((t) => (
                      <Badge key={t} variant="muted">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Highlights</h4>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">The hard part</h4>
                  <p className="text-muted-foreground">{active.challenges}</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {active.links.github && (
                    <Button asChild variant="outline" className="rounded-full">
                      <a href={active.links.github} target="_blank" rel="noreferrer">
                        <FaGithub /> Source
                      </a>
                    </Button>
                  )}
                  {active.links.demo && (
                    <Button asChild className="rounded-full">
                      <a href={active.links.demo} target="_blank" rel="noreferrer">
                        Live demo <ArrowUpRight />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  )
}
