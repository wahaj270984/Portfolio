import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Download, MapPin, Mail, FileText } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/config/site'
import { useTheme } from '@/store/useTheme'
import { useExperience } from '@/store/useExperience'
import { BANNER, runCommand, type TerminalLine } from '@/data/terminal'
import { cn } from '@/lib/utils'

const PROMPT = 'wahaj@portfolio:~$'

const LINE_CLASS: Record<TerminalLine['kind'], string> = {
  output: 'text-foreground/80',
  system: 'text-muted-foreground',
  accent: 'text-primary',
  error: 'text-destructive',
  link: 'text-accent underline underline-offset-2 hover:text-primary',
}

interface HistoryEntry extends TerminalLine {
  id: number
}

function Terminal() {
  const preference = useTheme((s) => s.preference)
  const setPreference = useTheme((s) => s.setPreference)
  const toggleHyperdrive = useExperience((s) => s.toggleHyperdrive)

  const [lines, setLines] = useState<HistoryEntry[]>(() =>
    BANNER.map((l, i) => ({ ...l, id: i })),
  )
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState(-1)
  const idRef = useRef(BANNER.length)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  // Cancel any pending delayed-output timers if the terminal unmounts mid-sequence.
  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const push = (newLines: TerminalLine[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((l) => ({ ...l, id: idRef.current++ })),
    ])
  }

  const submit = () => {
    const value = input
    if (value.trim()) {
      setHistory((h) => [...h, value])
    }
    setHistIndex(-1)
    setInput('')

    push([{ kind: 'output', text: `${PROMPT} ${value}` }])

    const { result } = runCommand(value)
    if (result.clear) {
      setLines([])
      idRef.current = 0
    } else {
      push(result.lines)
    }

    if (result.delayed) {
      for (const step of result.delayed) {
        const t = window.setTimeout(() => push(step.lines), step.after)
        timersRef.current.push(t)
      }
    }

    if (result.open) window.open(result.open, '_blank', 'noopener,noreferrer')
    if (result.effect === 'theme') setPreference(preference === 'dark' ? 'light' : 'dark')
    if (result.effect === 'matrix') {
      toggleHyperdrive()
      toast('⚡ Reality bends', { description: 'Hyperdrive toggled from the terminal.' })
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1)
      setHistIndex(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIndex === -1) return
      const next = histIndex + 1
      if (next >= history.length) {
        setHistIndex(-1)
        setInput('')
      } else {
        setHistIndex(next)
        setInput(history[next])
      }
    }
  }

  return (
    <GlassPanel
      tone="strong"
      pad="none"
      glow="primary"
      className="flex h-[360px] flex-col overflow-hidden font-mono text-sm sm:h-[420px] lg:h-[440px]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
        <span className="size-3 rounded-full bg-destructive/80" />
        <span className="size-3 rounded-full bg-yellow-400/80" />
        <span className="size-3 rounded-full bg-accent/80" />
        <span className="ml-2 text-xs text-muted-foreground">wahaj — zsh — 80×24</span>
      </div>

      {/* Output */}
      <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto p-4">
        {lines.map((line) =>
          line.kind === 'link' && line.href ? (
            <a
              key={line.id}
              href={line.href}
              target="_blank"
              rel="noreferrer"
              className={cn('block break-words', LINE_CLASS[line.kind])}
            >
              {line.text}
            </a>
          ) : (
            <div key={line.id} className={cn('whitespace-pre-wrap break-words', LINE_CLASS[line.kind])}>
              {line.text}
            </div>
          ),
        )}

        {/* Live input line */}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-accent">{PROMPT}</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              className="w-full bg-transparent text-foreground caret-primary outline-none"
            />
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

export function Contact() {
  return (
    <Section id="contact" aria-label="Contact">
      <SectionHeading
        index="08"
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient">build something</span></>}
        description="Type a command, or just say hi the old-fashioned way. I read everything."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
        <Reveal from="left">
          <Terminal />
        </Reveal>

        <Reveal from="right">
          <GlassPanel pad="lg" className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold">
                Prefer a normal message?
              </h3>
              <p className="text-muted-foreground">
                I'm open to research collaborations, internships, and freelance
                builds. Reach out and I'll get back to you.
              </p>

              <div className="space-y-3 pt-2 text-sm">
                <a
                  href={site.links.email}
                  data-cursor="hover"
                  className="flex items-center gap-3 text-foreground/90 transition-colors hover:text-primary"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Mail className="size-4" />
                  </span>
                  {site.email}
                </a>
                <div className="flex items-center gap-3 text-foreground/90">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
                    <MapPin className="size-4" />
                  </span>
                  {site.location}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton asChild className="rounded-full">
                <a href={site.links.email}>
                  <Mail /> Email me
                </a>
              </MagneticButton>
              <MagneticButton asChild variant="outline" className="rounded-full">
                <a href={site.links.github} target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub
                </a>
              </MagneticButton>
              <MagneticButton asChild variant="outline" className="rounded-full">
                <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedinIn /> LinkedIn
                </a>
              </MagneticButton>
              <MagneticButton asChild variant="ghost" className="rounded-full">
                <a href={site.resumeUrl} download="Muhammad-Wahaj-Khan-Resume.pdf">
                  <FileText /> Download Résumé <Download />
                </a>
              </MagneticButton>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </Section>
  )
}
