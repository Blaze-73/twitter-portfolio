import { useEffect, useRef } from "react"
import { useMousePosition } from "../hooks/useMousePosition"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useMousePosition()
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const spawnParticle = () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.2 + Math.random() * 0.4
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.4,
        life: 0,
        maxLife: 300 + Math.random() * 400,
      }
    }

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(spawnParticle())
    }

    let animationId: number

    const animate = () => {
      timeRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smooth mouse following
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05

      // Spawn new particles
      if (particlesRef.current.length < 80 && Math.random() < 0.1) {
        particlesRef.current.push(spawnParticle())
      }

      const particles = particlesRef.current

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Mouse interaction - gentle attraction
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.02
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Max speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        // Fade out near end of life
        const fadeAlpha = p.life > p.maxLife - 60
          ? p.alpha * (p.maxLife - p.life) / 60
          : p.alpha

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(29, 155, 240, ${fadeAlpha * 0.15})`
        ctx.fill()

        // Remove dead particles
        if (p.life > p.maxLife) {
          particles.splice(i, 1)
        }
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(29, 155, 240, ${(1 - dist / 120) * 0.04})`
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [mouse])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
