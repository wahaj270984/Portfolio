import { useEffect, useRef } from 'react'
import { useExperience } from '@/store/useExperience'

const COLS = 34
const ROWS = 20

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
 * The single, site-wide 3D background — one fixed, transparent canvas behind the
 * whole page so there is no seam between the hero and the rest of the site. A
 * perspective wireframe mesh undulates in a travelling wave, lifts toward the
 * cursor, and — crucially — its camera is driven by scroll: as you move down the
 * page the camera tilts further onto the plane, the horizon drifts, the surface
 * flows toward you and the field yaws slightly, so scrolling feels like flying
 * over the mesh.
 *
 * Scroll is read live from the store every frame (never via effect deps) so the
 * rAF loop is created once and never torn down. Colours come from the live CSS
 * theme vars; reduced-motion draws a single calm frame.
 */
export function MeshField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const hyperdrive = useExperience((s) => s.hyperdrive)
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
    let bg: RGB = [5, 7, 14]
    const readTheme = () => {
      primary = hexToRgb(readVar('--primary'), primary)
      accent = hexToRgb(readVar('--accent'), accent)
      bg = hexToRgb(readVar('--background'), bg)
    }
    readTheme()
    const themeObserver = new MutationObserver(readTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // --- Geometry buffers ----------------------------------------------
    const N = COLS * ROWS
    const sx = new Float32Array(N)
    const sy = new Float32Array(N)
    const dep = new Float32Array(N)
    const lift = new Float32Array(N)

    let raf = 0
    let startTs = -1
    let camScroll = useExperience.getState().scrollProgress // eased scroll camera

    const frame = (ts: number) => {
      if (startTs < 0) startTs = ts
      const time = (ts - startTs) / 1000

      // Live, eased scroll value drives the camera.
      const targetScroll = useExperience.getState().scrollProgress
      camScroll += (targetScroll - camScroll) * (reducedMotion ? 1 : 0.06)
      const scroll = camScroll

      const t = reducedMotion ? 0.8 : time * (hyperdrive ? 1.7 : 1) + scroll * 9

      // --- Scroll-driven camera --------------------------------------
      const pitch = 0.7 + scroll * 0.55 // tilt further onto the plane while descending
      const cosP = Math.cos(pitch)
      const sinP = Math.sin(pitch)
      const yaw = (scroll - 0.5) * 0.5 // gentle rotation around vertical
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)

      const cx = w / 2
      const cy = h * (0.4 + scroll * 0.17) // horizon drifts down as you scroll
      const span = Math.max(w, h)
      const spanX = span * 1.6
      const spanZ = span * 1.05
      const focal = h * 1.05
      const camDist = span * 0.85
      const amp = span * (hyperdrive ? 0.085 : 0.05)

      // Transparent: clear so the themed page background shows through, then a
      // soft primary glow + the mesh on top, so it blends with every section.
      ctx.clearRect(0, 0, w, h)
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, span * 0.7)
      glow.addColorStop(0, rgba(primary, 0.08))
      glow.addColorStop(1, rgba(primary, 0))
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

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
          let lx = u * spanX
          let lz = v * spanZ
          // Yaw around the vertical axis.
          const rx = lx * cosY - lz * sinY
          lz = lx * sinY + lz * cosY
          lx = rx

          const ly =
            amp *
            (Math.sin(u * 6.5 + t * 1.1) * 0.6 +
              Math.cos(v * 5.0 - t * 0.9) * 0.6 +
              Math.sin((u + v) * 4.0 + t * 0.6) * 0.4)

          const yR = ly * cosP - lz * sinP
          const zR = ly * sinP + lz * cosP
          const scale = focal / (zR + camDist)
          const screenX = cx + lx * scale
          let screenY = cy - yR * scale

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

      // --- Lines: connect right + down neighbours ---------------------
      ctx.lineWidth = 1
      const depMin = focal / (spanZ * 0.5 + camDist)
      const depMax = focal / (-spanZ * 0.5 + camDist)
      const stroke = (a: number, b: number) => {
        const ld = Math.max(lift[a], lift[b])
        const d = (dep[a] + dep[b]) * 0.5
        const dn = (d - depMin) / (depMax - depMin)
        const alpha = Math.min(0.8, 0.05 + dn * 0.3 + ld * 0.6)
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

      // --- Vertices ---------------------------------------------------
      for (let idx = 0; idx < N; idx++) {
        const dn = (dep[idx] - depMin) / (depMax - depMin)
        const l = lift[idx]
        const r = (0.7 + dn * 1.5) * (1 + l * 2.2)
        const col = lerp(primary, accent, Math.min(1, l * 1.4))
        ctx.fillStyle = rgba(col, Math.min(0.95, 0.15 + dn * 0.38 + l * 0.6))
        ctx.beginPath()
        ctx.arc(sx[idx], sy[idx], r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Vignette: fade the mesh into the page edges with the theme bg.
      const vig = ctx.createRadialGradient(cx, h * 0.5, h * 0.25, cx, h * 0.5, span * 0.8)
      vig.addColorStop(0, rgba(bg, 0))
      vig.addColorStop(1, rgba(bg, 0.85))
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
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  )
}
