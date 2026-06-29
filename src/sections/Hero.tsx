import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { TypeCycle, WordsReveal } from '@/components/ui/animated-text'
import { TechMarquee } from '@/components/ui/tech-marquee'
import { site } from '@/config/site'
import { scrollToSection } from '@/hooks'

const tech = [
  'Python',
  'C / C++',
  'Verilog HDL',
  'NumPy',
  'Pandas',
  'Scikit-learn',
  'Matplotlib',
  'MySQL',
  'Proteus',
  'ModelSim',
]

const socials = [
  { href: site.links.github, label: 'GitHub', Icon: FaGithub },
  { href: site.links.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
]

/**
 * Landing section. The neural-constellation canvas renders behind;
 * here we layer the identity, animated roles, CTAs and scroll cue on top.
 */
export function Hero() {
  return (
    <Section id="hero" full bare aria-label="Introduction">
      <Container className="relative z-10">
      <div className="flex flex-col items-start gap-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge variant="outline" className="gap-2 py-1 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Research Officer Intern · Video Analytics Lab, PNEC NUST
          </Badge>
        </motion.div>

        <div className="space-y-3">
          <motion.p
            className="flex items-center gap-2 font-mono text-sm text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="size-4" /> Hi, I'm
          </motion.p>
          <h1 className="font-heading text-5xl font-bold leading-[1.15] tracking-tight sm:text-7xl lg:text-8xl">
            {/* Gradient must live on the animated word spans, not the wrapper:
                with the per-word reveal transform, a wrapper-level
                background-clip:text leaves the glyphs transparent (invisible). */}
            <WordsReveal text="Muhammad Wahaj Khan" wordClassName="text-gradient" />
          </h1>
        </div>

        <div className="flex min-h-[2.2em] items-center font-heading text-2xl font-medium text-foreground/90 sm:text-3xl lg:text-4xl">
          <TypeCycle words={site.roles} />
        </div>

        <motion.p
          className="max-w-xl text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          I'm a Computer Engineering student at NUST and a Research Officer
          Intern at PNEC's Video Analytics Lab, building a foundation in machine
          learning, Python, and digital systems — from an 8-bit CPU in Verilog
          to database-driven software.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <MagneticButton size="lg" className="rounded-full" onClick={() => scrollToSection('projects')}>
            View my work <ArrowRight />
          </MagneticButton>
          <MagneticButton
            size="lg"
            variant="outline"
            className="rounded-full"
            onClick={() => scrollToSection('contact')}
          >
            Get in touch
          </MagneticButton>

          <div className="ml-1 flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor="hover"
                className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-2 w-full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
            Tooling
          </p>
          <TechMarquee items={tech} />
        </motion.div>
      </div>
      </Container>

      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll to about"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" />
      </motion.button>
    </Section>
  )
}
