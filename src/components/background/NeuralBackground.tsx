import { useEffect, useRef } from 'react'
import { animate, stagger, random } from 'animejs'
import { useExperience } from '@/store/useExperience'

interface Node {
  x: number
  y: number
  z: number // depth layer for parallax
  vx: number
  vy: number
  radius: number
  pulsePhase: number
}

interface Connection {
  from: number
  to: number
  strength: number
  pulse: number // 0..1 traveling activation wave
}

const NODE_COUNT = 80
const MAX_DISTANCE = 180
const DEPTH_LAYERS = 3

/**
 * Neural-constellation canvas: animated network of glowing nodes + firing synaptic
 * connections. Parallax depth layers respond to scroll + mouse. GPU-accelerated via
 * canvas compositing. Honors reduced-motion by rendering a single static frame.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const frameRef = useRef<number>(0)

  const { scrollProgress, hyperdrive, reducedMotion } = useExperience()

  // Initialize network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const nodes: Node[] = []
    const connections: Connection[] = []

    // Generate nodes across depth layers
    for (let i = 0; i < NODE_COUNT; i++) {
      const z = Math.floor(random(0, DEPTH_LAYERS))
      nodes.push({
        x: random(0, 1),
        y: random(0, 1),
        z,
        vx: random(-0.5, 0.5) * 0.0002,
        vy: random(-0.5, 0.5) * 0.0002,
        radius: random(2, 4) + z * 0.5,
        pulsePhase: random(0, Math.PI * 2),
      })
    }

    // Build connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const dx = (a.x - b.x) * canvas.width
        const dy = (a.y - b.y) * canvas.height
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MAX_DISTANCE && Math.abs(a.z - b.z) <= 1) {
          connections.push({
            from: i,
            to: j,
            strength: 1 - dist / MAX_DISTANCE,
            pulse: random(0, 1),
          })
        }
      }
    }

    nodesRef.current = nodes
    connectionsRef.current = connections

    // Intro reveal: stagger-fade nodes + connections
    if (!reducedMotion) {
      const nodeElements = nodes.map((_, i) => ({ index: i, opacity: 0 }))
      animate(nodeElements, {
        opacity: 1,
        duration: 1200,
        delay: stagger(30),
        ease: 'out(3)',
      })
    }
  }, [reducedMotion])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationId: number

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Get theme colors from CSS vars
    const getColor = (varName: string) => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
    }

    const render = () => {
      if (reducedMotion && frameRef.current > 0) {
        // Render once then stop
        return
      }

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const nodes = nodesRef.current
      const connections = connectionsRef.current

      // Clear with theme background
      ctx.fillStyle = getColor('--background')
      ctx.fillRect(0, 0, w, h)

      const speed = hyperdrive ? 2.5 : 1

      // Parallax offsets from mouse + scroll
      const mouseX = (mouseRef.current.x - 0.5) * 60
      const mouseY = (mouseRef.current.y - 0.5) * 60
      const scrollOffset = scrollProgress * h * 0.3

      // Update + draw connections
      ctx.lineWidth = 1.5
      connections.forEach((conn) => {
        const a = nodes[conn.from]
        const b = nodes[conn.to]

        // Parallax per depth layer
        const aDepth = a.z / DEPTH_LAYERS
        const bDepth = b.z / DEPTH_LAYERS
        const ax = a.x * w + mouseX * aDepth - scrollOffset * aDepth * 0.2
        const ay = a.y * h + mouseY * aDepth + scrollOffset * (1 - aDepth)
        const bx = b.x * w + mouseX * bDepth - scrollOffset * bDepth * 0.2
        const by = b.y * h + mouseY * bDepth + scrollOffset * (1 - bDepth)

        // Traveling pulse
        conn.pulse = (conn.pulse + 0.008 * speed) % 1
        const pulsePos = conn.pulse
        const pulseWidth = 0.15
        const pulseBrightness = Math.max(
          0,
          1 - Math.abs(pulsePos - 0.5) / pulseWidth
        )

        // Gradient: base connection + pulse highlight
        const gradient = ctx.createLinearGradient(ax, ay, bx, by)
        const baseOpacity = conn.strength * 0.25
        const primary = getColor('--primary')
        const accent = getColor('--accent')

        gradient.addColorStop(0, `color-mix(in srgb, ${primary} ${baseOpacity * 100}%, transparent)`)
        gradient.addColorStop(pulsePos, `color-mix(in srgb, ${accent} ${(baseOpacity + pulseBrightness * 0.6) * 100}%, transparent)`)
        gradient.addColorStop(1, `color-mix(in srgb, ${primary} ${baseOpacity * 100}%, transparent)`)

        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
      })

      // Update + draw nodes
      nodes.forEach((node) => {
        // Drift
        node.x += node.vx * speed
        node.y += node.vy * speed

        // Wrap edges
        if (node.x < -0.1) node.x = 1.1
        if (node.x > 1.1) node.x = -0.1
        if (node.y < -0.1) node.y = 1.1
        if (node.y > 1.1) node.y = -0.1

        // Parallax position
        const depth = node.z / DEPTH_LAYERS
        const nx = node.x * w + mouseX * depth - scrollOffset * depth * 0.2
        const ny = node.y * h + mouseY * depth + scrollOffset * (1 - depth)

        // Pulse glow
        node.pulsePhase += 0.02 * speed
        const pulse = 0.7 + 0.3 * Math.sin(node.pulsePhase)

        // Radial gradient glow
        const r = node.radius
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 3)
        const primary = getColor('--primary')
        gradient.addColorStop(0, `color-mix(in srgb, ${primary} ${pulse * 80}%, transparent)`)
        gradient.addColorStop(0.4, `color-mix(in srgb, ${primary} ${pulse * 40}%, transparent)`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nx, ny, r * 3, 0, Math.PI * 2)
        ctx.fill()

        // Solid core
        ctx.fillStyle = getColor('--primary')
        ctx.beginPath()
        ctx.arc(nx, ny, r * 0.6, 0, Math.PI * 2)
        ctx.fill()
      })

      frameRef.current++
      if (!reducedMotion) {
        animationId = requestAnimationFrame(render)
      }
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [scrollProgress, hyperdrive, reducedMotion])

  // Track mouse for parallax
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  )
}
