# Design System — Master File

> **LOGIC:** When building a specific page/section, first check `design-system/wahaj-khan-portfolio/pages/[name].md`.
> If that file exists, its rules **override** this Master file. Otherwise, follow the rules below.
>
> **Source of truth for tokens is code, not this doc.** The live values live in
> [src/styles/globals.css](../../src/styles/globals.css) (`:root` / `[data-theme='dark']` + `@theme inline`).
> This file documents and rationalizes them. If they diverge, the CSS wins — update this file to match.

---

**Project:** Wahaj Khan Portfolio — immersive, scroll-driven 3D portfolio
**Owner:** Muhammad Wahaj Khan — ML Engineer & AI Researcher (NUST SEECS)
**Generated:** 2026-06-28 (reconciled with the implemented token layer)
**Category:** Personal portfolio · AI/ML · Immersive/Interactive Experience

> **Note on origin:** The `ui-ux-pro-max` generator initially proposed a light-mode
> purple/pink "AI-Native UI" palette with a DM Sans body. That was overridden: the
> portfolio is **dark-first** with an electric-blue / cyan / violet system and an
> Inter body, which suits an immersive WebGL experience better. The kept ideas from
> the generator: the **AI-Native UI** style direction, the **Immersive/Interactive**
> page pattern, and the anti-patterns + checklist below.

---

## Global Rules

### Color Palette (semantic tokens — dark-first)

Tokens are CSS variables resolved at runtime per `[data-theme]`, mapped to Tailwind
utilities via `@theme inline` (e.g. `bg-background`, `text-primary`, `border-border`).
**Never** hardcode hex in components — reference the token.

| Role | Light (`:root`) | Dark (`[data-theme='dark']`) | Utility |
|------|-----------------|------------------------------|---------|
| Background | `#f6f8fc` | `#05070e` | `bg-background` |
| Foreground | `#0a0e17` | `#e8edf7` | `text-foreground` |
| Card | `#ffffff` | `#0b0f1a` | `bg-card` |
| Primary (electric blue) | `#2563eb` | `#4d8dff` | `bg-primary` / `text-primary` |
| Primary foreground | `#ffffff` | `#04060c` | `text-primary-foreground` |
| Secondary / Muted surface | `#eef1f8` | `#121826` | `bg-secondary` / `bg-muted` |
| Muted foreground | `#5b6577` | `#8a94a8` | `text-muted-foreground` |
| Accent (cyan) | `#0891b2` | `#22d3ee` | `bg-accent` / `text-accent` |
| Violet (tertiary) | `#7c3aed` | `#a855f7` | `text-violet` |
| Destructive | `#e5484d` | `#ff6166` | `bg-destructive` |
| Border / Input | `#dfe4ee` | `#1b2334` | `border-border` |
| Ring (focus) | `#2563eb` | `#4d8dff` | `ring-ring` |

**Accent system for 3D + section theming:** the trio **primary `#4d8dff` → accent
`#22d3ee` → violet `#a855f7`** (dark values) is the through-line. It appears in the
WebGL layer (SkillField orbs, NeuralNetwork hot nodes, nebula) and in section accents.
When a component cycles accent colors, use this order: `primary → accent → violet`.

### Typography

- **Heading:** Space Grotesk (`--font-heading`) — tech/futuristic, tight tracking (`-0.02em`).
- **Body:** Inter (`--font-sans`).
- **Mono:** JetBrains Mono / `ui-monospace` (`--font-mono`) — terminal, code, eyebrow labels.
- Self-hosted via `@fontsource/*` (no runtime Google Fonts fetch).
- Headings use `text-wrap: balance`. Hero scale: `text-5xl → sm:text-7xl → lg:text-8xl`.

### Spacing & Radius

- Spacing rhythm: 4 / 8 px scale (Tailwind defaults). Section vertical rhythm tiers: 16 / 24 / 32 / 48.
- Radius token `--radius: 0.75rem` → `rounded-sm/md/lg/xl` derive from it. Pills use `rounded-full`.

### Signature Effects (use these, defined in globals.css `@layer utilities`)

| Utility | Purpose |
|---------|---------|
| `.glass` / `.glass-strong` | Frosted panels (backdrop-blur + saturate). Default surface for cards/overlays. |
| `.text-gradient` | Foreground→primary→accent gradient text. Hero name, section emphasis. |
| `.text-glow` / `.ring-glow` | Primary-tinted glow for focal elements. |
| `.bg-grid` | Subtle blueprint grid background. |
| `.mask-fade-y` | Vertical fade mask (marquees, edges). |
| `--animate-shine` / `--animate-float` / `--animate-pulse-glow` | Reusable keyframe animations. |

---

## Style Guidelines

**Style:** AI-Native UI, immersive — minimal chrome, deep-space dark canvas, glass surfaces,
neon-accent glows, motion that conveys cause/effect. The single persistent R3F canvas IS the
backdrop; DOM sections float above it with translucent panels.

**Page Pattern:** Immersive/Interactive Experience — full-screen 3D hero, then scroll-driven
sections that the camera rig + presence system react to. Provide reduced-motion + fallback paths
(already wired via `useExperience.reducedMotion` and the Spline→R3F hero fallback).

**Key effects:** smooth scroll (Lenis), scroll-linked camera, cross-fading 3D motifs, staggered
reveals, magnetic buttons, custom cursor, typewriter roles.

---

## Anti-Patterns (Do NOT use)

- ❌ Hardcoded hex in components — use semantic tokens (so light/dark + theme switching stay live).
- ❌ Emojis as structural icons — use Lucide / react-icons (already the convention).
- ❌ Heavy opaque chrome over the 3D canvas — prefer `.glass` so the world reads through.
- ❌ Decorative-only motion — every animation should express a relationship; respect `prefers-reduced-motion`.
- ❌ Animating `width`/`height`/`top`/`left` — use `transform`/`opacity`.
- ❌ Ungated heavy GPU work — gate off `quality` from the experience store.
- ❌ Invisible focus states — keep the visible focus ring (`ring-ring`).

---

## Pre-Delivery Checklist

- [ ] Tokens only (no raw hex); verified in both light and dark.
- [ ] Text contrast ≥ 4.5:1 (body) / ≥ 3:1 (large) in both themes.
- [ ] Decorative icons/SVGs have `aria-hidden`; meaningful ones have labels.
- [ ] Focus states visible for keyboard nav; tab order matches visual order.
- [ ] `prefers-reduced-motion` honored (motion gated via store + CSS media query).
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll on mobile.
- [ ] Hover/press transitions 150–300ms; exits faster than enters.
- [ ] Heavy 3D/effects gated off `quality`; nothing tanks FPS on low tier.
