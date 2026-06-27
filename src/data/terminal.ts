/**
 * Command registry for the interactive contact terminal. Each command returns
 * structured lines the UI renders; some also request a side effect (open a URL,
 * clear the screen, fire an easter egg). Keeping this data-driven means the
 * terminal component stays a thin renderer + input loop.
 */
import { site } from '@/config/site'
import { profile } from './profile'
import { skillGroups } from './skills'
import { projects } from './projects'

export type LineKind = 'output' | 'error' | 'system' | 'accent' | 'link'

export interface TerminalLine {
  kind: LineKind
  text: string
  href?: string
}

export interface CommandResult {
  lines: TerminalLine[]
  /** Clear the screen before printing. */
  clear?: boolean
  /** Open this URL in a new tab. */
  open?: string
  /** Named easter-egg signal handled by the component. */
  effect?: 'matrix' | 'theme' | 'sudo'
}

export interface Command {
  name: string
  description: string
  hidden?: boolean
  run: (args: string[]) => CommandResult
}

const out = (text: string): TerminalLine => ({ kind: 'output', text })
const sys = (text: string): TerminalLine => ({ kind: 'system', text })
const accent = (text: string): TerminalLine => ({ kind: 'accent', text })
const link = (text: string, href: string): TerminalLine => ({ kind: 'link', text, href })

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List available commands',
    run: () => ({
      lines: [
        sys('Available commands:'),
        ...Object.values(commands)
          .filter((c) => !c.hidden)
          .map((c) => out(`  ${c.name.padEnd(12)} ${c.description}`)),
        out(''),
        sys('Tip: try `whoami`, `skills`, or `resume`. ↑/↓ for history.'),
      ],
    }),
  },
  whoami: {
    name: 'whoami',
    description: 'Who is this?',
    run: () => ({
      lines: [
        accent(profile.name),
        out(site.roles.join(' · ')),
        out(''),
        out(profile.summary),
      ],
    }),
  },
  about: {
    name: 'about',
    description: 'A short bio',
    run: () => ({ lines: profile.bio.map(out) }),
  },
  skills: {
    name: 'skills',
    description: 'List the tech stack',
    run: () => ({
      lines: skillGroups.flatMap((g) => [
        accent(`${g.label}:`),
        out('  ' + g.skills.map((s) => s.name).join(', ')),
      ]),
    }),
  },
  projects: {
    name: 'projects',
    description: 'List featured projects',
    run: () => ({
      lines: [
        sys('Featured projects:'),
        ...projects
          .filter((p) => p.featured)
          .map((p) => out(`  ${p.title} — ${p.tagline}`)),
        out(''),
        sys('Scroll to the Projects section for the full holographic gallery.'),
      ],
    }),
  },
  contact: {
    name: 'contact',
    description: 'How to reach me',
    run: () => ({
      lines: [
        out(`Email:    ${site.email}`),
        out(`Location: ${site.location}`),
        link('GitHub:   ' + site.links.github, site.links.github),
        link('LinkedIn: ' + site.links.linkedin, site.links.linkedin),
      ],
    }),
  },
  email: {
    name: 'email',
    description: 'Open a new email to me',
    run: () => ({ lines: [sys(`Opening mail client → ${site.email}`)], open: site.links.email }),
  },
  github: {
    name: 'github',
    description: 'Open my GitHub',
    run: () => ({ lines: [sys('Opening GitHub…')], open: site.links.github }),
  },
  linkedin: {
    name: 'linkedin',
    description: 'Open my LinkedIn',
    run: () => ({ lines: [sys('Opening LinkedIn…')], open: site.links.linkedin }),
  },
  resume: {
    name: 'resume',
    description: 'Download my résumé',
    run: () => ({ lines: [sys('Fetching résumé…')], open: site.resumeUrl }),
  },
  clear: {
    name: 'clear',
    description: 'Clear the terminal',
    run: () => ({ lines: [], clear: true }),
  },
  // ---- hidden easter eggs ----
  sudo: {
    name: 'sudo',
    description: 'Elevate privileges',
    hidden: true,
    run: () => ({
      lines: [out("Nice try. You already have root in my universe ⚡"), out('')],
      effect: 'sudo',
    }),
  },
  matrix: {
    name: 'matrix',
    description: 'Enter the matrix',
    hidden: true,
    run: () => ({ lines: [accent('Wake up, Neo…')], effect: 'matrix' }),
  },
  theme: {
    name: 'theme',
    description: 'Toggle theme',
    hidden: true,
    run: () => ({ lines: [sys('Flipping the lights…')], effect: 'theme' }),
  },
  coffee: {
    name: 'coffee',
    description: 'Brew coffee',
    hidden: true,
    run: () => ({ lines: [out('☕ Brewing… HTTP 418: I’m a teapot.')] }),
  },
}

/** Run a raw input line against the registry. */
export function runCommand(input: string): { echo: string; result: CommandResult } {
  const trimmed = input.trim()
  const [name, ...args] = trimmed.split(/\s+/)
  const echo = trimmed
  if (!name) return { echo, result: { lines: [] } }
  const cmd = commands[name.toLowerCase()]
  if (!cmd) {
    return {
      echo,
      result: {
        lines: [
          { kind: 'error', text: `command not found: ${name}` },
          { kind: 'system', text: "type `help` for a list of commands" },
        ],
      },
    }
  }
  return { echo, result: cmd.run(args) }
}

export const BANNER: TerminalLine[] = [
  accent('  Wahaj OS  ·  v1.0  '),
  sys("Interactive console. Type `help` to begin."),
]
