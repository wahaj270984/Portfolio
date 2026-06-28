import { useEffect, useRef } from 'react'
import { useExperience } from '@/store/useExperience'

const COLS = 36
const ROWS = 18

type RGB = readonly [number, number, number]

function hexToRgb(hex: string, fallback: RGB): RGB {
  const c = hex.trim().replace('#', '')
  if (c.length !== 3 && c.length !== 6) return fallback
  const n = c.length === 3 ? c.split('').map((x) => x + x).join('') : c
  const int = Number.parseInt(n, 16)
  if (Number.isNaN(int)) return fallback
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
const lerp = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
]

/**
 * Immersive 3D wireframe mesh, in the spirit of animejs.com: a perspective-tilted
 * grid of points connected by glowing lines that undulate in a travelling wave and
 * lift toward the cursor. Rendered on a canvas with hand-rolled 3D projection — so it
 * always paints (no fragile CSS 3D), runs off one rAF loop (no React re-renders), and
 * re-reads its colours from the live CSS theme vars whenever `[data-theme]` flips.
 * Honors reduced-motion by drawing a single calm frame.
 */
export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const hyperdrive = useExperience((s) => s.hyperdrive)
  // Live pointer in client coords; -1 marks "no pointer yet".
  const pointer = useRef({ x: -1, y: -1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // --- Theme colours (re-read live on theme toggle) -------------------
    const readVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name)
    let primary: RGB = [77, 141, 255]
    let accent: RGB = [34, 211, 238]
    let bg = '#05070e'
    const readTheme = () => {
      primary = hexToRgb(readVar('--primary'), primary)
      accent = hexToRgb(readVar('--accent'), accent)
      bg = readVar('--background').trim() || bg
    }
    readTheme()
    const themeObserver = new MutationObserver(readTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // --- Geometry buffers ----------------------------------------------
    const N = COLS * ROWS
    const sx = new Float32Array(N) // projected screen x
    const sy = new Float32Array(N) // projected screen y
    const dep = new Float32Array(N) // perspective scale (depth cue)
    const lift = new Float32Array(N) // 0..1 cursor influence

    const pitch = 0.92 // plane tilt toward the camera
    const cosP = Math.cos(pitch)
    const sinP = Math.sin(pitch)

    let raf = 0
    let startTs = -1

    const frame = (ts: number) => {
      if (startTs < 0) startTs = ts
      const time = (ts - startTs) / 1000
      const t = reducedMotion ? 0.8 : time * (hyperdrive ? 1.7 : 1)

      const cx = w / 2
      const cy = h * 0.46
      const span = Math.max(w, h)
      const spanX = span * 1.5
      const spanZ = span * 1.0
      const focal = h * 1.05
      const camDist = span * 0.85
      const amp = span * (hyperdrive ? 0.085 : 0.05)

      // Background wash + soft radial glow for depth.
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, span * 0.7)
      glow.addColorStop(0, rgba(primary, 0.1))
      glow.addColorStop(1, rgba(primary, 0))
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Pointer in canvas-local space.
      const rect = canvas.getBoundingClientRect()
      const pxRaw = pointer.current.x
      const px = pxRaw < 0 ? -9999 : pointer.current.x - rect.left
      const py = pxRaw < 0 ? -9999 : pointer.current.y - rect.top
      const sigma = (Math.min(w, h) * 0.26) ** 2

      // --- Project every vertex --------------------------------------
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const idx = j * COLS + i
          const u = i / (COLS - 1) - 0.5
          const v = j / (ROWS - 1) - 0.5
          const lx = u * spanX
          const lz = v * spanZ
          const ly =
            amp *
            (Math.sin(u * 6.5 + t * 1.1) * 0.6 +
              Math.cos(v * 5.0 - t * 0.9) * 0.6 +
              Math.sin((u + v) * 4.0 + t * 0.6) * 0.4)

          // Rotate around X, then perspective-project.
          const yR = ly * cosP - lz * sinP
          const zR = ly * sinP + lz * cosP
          const scale = focal / (zR + camDist)
          let screenX = cx + lx * scale
          let screenY = cy - yR * scale

          // Cursor lift (screen-space gaussian).
          let l = 0
          if (px > -9000 && !reducedMotion) {
            const dx = screenX - px
            const dy = screenY - py
            l = Math.exp(-(dx * dx + dy * dy) / sigma)
            screenY -= l * (hyperdrive ? 60 : 42)
          }

          sx[idx] = screenX
          sy[idx] = screenY
          dep[idx] = scale
          lift[idx] = l
        }
      }

      // --- Lines (the star): connect right + down neighbours ----------
      ctx.lineWidth = 1
      const depMin = focal / (spanZ * 0.5 + camDist)
      const depMax = focal / (-spanZ * 0.5 + camDist)
      const stroke = (a: number, b: number) => {
        const ld = Math.max(lift[a], lift[b])
        const d = (dep[a] + dep[b]) * 0.5
        const dn = (d - depMin) / (depMax - depMin) // 0 far → 1 near
        const alpha = Math.min(0.85, 0.06 + dn * 0.32 + ld * 0.6)
        ctx.strokeStyle = rgba(lerp(primary, accent, Math.min(1, ld * 1.3)), alpha)
        ctx.beginPath()
        ctx.moveTo(sx[a], sy[a])
        ctx.lineTo(sx[b], sy[b])
        ctx.stroke()
      }
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const idx = j * COLS + i
          if (i < COLS - 1) stroke(idx, idx + 1)
          if (j < ROWS - 1) stroke(idx, idx + COLS)
        }
      }

      // --- Vertices: subtle glowing nodes -----------------------------
      for (let idx = 0; idx < N; idx++) {
        const dn = (dep[idx] - depMin) / (depMax - depMin)
        const l = lift[idx]
        const r = (0.8 + dn * 1.6) * (1 + l * 2.2)
        const col = lerp(primary, accent, Math.min(1, l * 1.4))
        ctx.fillStyle = rgba(col, Math.min(0.95, 0.18 + dn * 0.4 + l * 0.6))
        ctx.beginPath()
        ctx.arc(sx[idx], sy[idx], r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Vignette: fade the mesh into the page edges.
      const vig = ctx.createRadialGradient(cx, h * 0.5, h * 0.2, cx, h * 0.5, span * 0.75)
      vig.addColorStop(0, rgba(hexToRgb(bg, [5, 7, 14]), 0))
      vig.addColorStop(1, bg)
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      if (!reducedMotion) raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      themeObserver.disconnect()
    }
  }, [reducedMotion, hyperdrive])

  // Track the pointer globally so the lift follows the cursor across the hero.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => {
      pointer.current = { x: -1, y: -1 }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}
