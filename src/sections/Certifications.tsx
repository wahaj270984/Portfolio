import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { TiltCard } from '@/components/ui/tilt-card'
import { BrandLogo } from '@/components/ui/brand-logo'
import { Reveal } from '@/components/motion/Reveal'
import { certifications, type Certification } from '@/data/certifications'
import { cn } from '@/lib/utils'

const DOT: Record<Certification['accent'], string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  violet: 'text-violet',
}

export function Certifications() {
  return (
    <Section id="certifications" aria-label="Certifications">
      <SectionHeading
        index="06"
        eyebrow="Certifications"
        title={<>Credentials, <span className="text-gradient">verified</span></>}
        description="Formal stamps on the skills — click any to verify the credential."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} from="up" delay={i} className="h-full">
            <TiltCard className="h-full" max={7}>
            <GlassPanel
              tone="strong"
              pad="lg"
              className="group relative h-full overflow-hidden"
              data-cursor="hover"
            >
              {/* Animated shine sweep on hover. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />

              <div className="flex items-start justify-between gap-3">
                {/* Issuer brand mark, tinted to the card's accent. */}
                <span
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur',
                    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
                    DOT[cert.accent],
                  )}
                >
                  <BrandLogo brand={cert.logo} className="size-6" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold leading-snug">
                {cert.title}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <BadgeCheck className={cn('size-4', DOT[cert.accent])} />
                {cert.issuer}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Verify credential <ArrowUpRight className="size-3.5" />
                </a>
              )}
              {!cert.credentialUrl && cert.credentialId && (
                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ID · {cert.credentialId}
                </p>
              )}
            </GlassPanel>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
