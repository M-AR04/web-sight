"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ─── Types ───────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

/* ─── Constants ───────────────────────────────────────────── */

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 140;
const ACCENT = "#00D4FF";

const TECH_BADGES = [
  "Next.js",
  "React",
  "Node.js",
  "Flutter",
  "PostgreSQL",
] as const;

/* ─── Particle Canvas Background ──────────────────────────── */

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasRef, initParticles]);
}

/* ─── Scroll helper ───────────────────────────────────────── */

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/* ─── Animation variants ──────────────────────────────────── */

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
  }),
};

const badgeFloat = (i: number) => ({
  y: [0, -6, 0],
  transition: {
    duration: 3 + i * 0.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

/* ─── Component ───────────────────────────────────────────── */

import { useSiteStore } from "@/store/siteStore";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useParticleCanvas(canvasRef);
  const { heroHeadlineLine1, heroHeadlineLine2, heroSubtitle } = useSiteStore();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050B15]">
      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* ── Radial glow overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Headline */}
        <motion.h1
          className="text-4xl font-extrabold leading-tight tracking-tight text-[#E0F7FA] sm:text-5xl md:text-6xl lg:text-7xl"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {heroHeadlineLine1}
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #00D4FF, #0891B2)",
            }}
          >
            {heroHeadlineLine2}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[#7B8CA3] sm:text-lg md:text-xl"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          {heroSubtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
        >
          {/* Primary */}
          <button
            onClick={() => scrollTo("project-builder")}
            className="group relative cursor-pointer rounded-lg px-8 py-3.5 font-semibold text-[#050B15] transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #00D4FF, #00B4D8)" }}
          >
            <span className="relative z-10">Build Your Project</span>
            {/* Hover glow */}
            <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow: "0 0 28px 6px rgba(0,212,255,0.45), 0 0 60px 12px rgba(0,212,255,0.18)",
              }}
            />
          </button>

          {/* Secondary */}
          <button
            onClick={() => scrollTo("projects")}
            className="cursor-pointer rounded-lg border border-[rgba(0,212,255,0.4)] px-8 py-3.5 font-semibold text-[#00D4FF] transition-all duration-300 hover:border-transparent hover:bg-[#00D4FF] hover:text-[#050B15]"
          >
            Explore Our Work
          </button>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
        >
          {TECH_BADGES.map((name, i) => (
            <motion.span
              key={name}
              animate={badgeFloat(i)}
              className="rounded-full border border-[rgba(0,212,255,0.15)] bg-[#0D1B2A]/70 px-4 py-1.5 text-xs font-medium tracking-wide text-[#7B8CA3] backdrop-blur-sm select-none"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#7B8CA3]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-[#00D4FF] opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
