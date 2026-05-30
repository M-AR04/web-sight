"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Zap, Trophy, Users } from "lucide-react";
import { useSiteStore } from "@/store/siteStore";

/* ─── Types ───────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

/* ─── Constants ───────────────────────────────────────────── */

const PARTICLE_COUNT = 100;
const CONNECTION_DISTANCE = 130;

const TECH_BADGES = [
  "Next.js",
  "React",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "TypeScript",
] as const;

const STATS = [
  { icon: Zap, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Trophy, value: 100, suffix: "%", label: "Client Satisfaction" },
  { icon: Users, value: 3, suffix: "+ Yrs", label: "Experience" },
];

/* ─── Particle Canvas Background ──────────────────────────── */

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.25 + 0.08,
        hue: Math.random() > 0.7 ? 280 : 195, // mix cyan and purple
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

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx -= (dx / dist) * force * 0.3;
          p.vy -= (dy / dist) * force * 0.3;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

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
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.1;
            const hue = (particles[i].hue + particles[j].hue) / 2;
            ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
            ctx.lineWidth = 0.7;
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
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasRef, initParticles]);
}

/* ─── Animated Counter ────────────────────────────────────── */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Magnetic Button ─────────────────────────────────────── */

function MagneticButton({
  children,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (primary) {
    return (
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="group relative cursor-pointer rounded-xl px-8 py-3.5 font-bold text-[#050B15] transition-all duration-300 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--accent), #00B4D8)",
          x: springX,
          y: springY,
        }}
        whileTap={{ scale: 0.97 }}
        id="hero-get-quote-btn"
      >
        <span className="relative z-10">{children}</span>
        <span
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 32px 8px rgba(0,212,255,0.5), 0 0 80px 16px rgba(0,212,255,0.2)",
          }}
        />
        {/* Shimmer */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </motion.button>
    );
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      id="hero-explore-btn"
      className="cursor-pointer rounded-xl border px-8 py-3.5 font-bold transition-all duration-300 hover:bg-[var(--accent)] hover:text-[#050B15] hover:border-transparent"
      style={{
        x: springX,
        y: springY,
        borderColor: "var(--border-hover)",
        color: "var(--accent)",
      }}
    >
      {children}
    </motion.button>
  );
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
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
  }),
};

/* ─── Component ───────────────────────────────────────────── */

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useParticleCanvas(canvasRef);
  const { heroHeadlineLine1, heroHeadlineLine2, heroSubtitle, theme } = useSiteStore();
  const isLight = theme === "light";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* ── Radial glow overlays ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 80% 70%, rgba(124,58,237,0.05) 0%, transparent 60%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
          style={{
            border: "1px solid var(--border-color)",
            background: "var(--accent-dim)",
            color: "var(--accent)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          Modern Web Development Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ color: "var(--text-primary)" }}
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {heroHeadlineLine1}
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #00D4FF 0%, #00B4D8 40%, #7C3AED 100%)",
              backgroundSize: "200% auto",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            {heroHeadlineLine2}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl"
          style={{ color: "var(--text-secondary)" }}
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
          custom={0.5}
        >
          <MagneticButton primary onClick={() => scrollTo("pricing")}>
            🚀 Get a Quote
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("projects")}>
            Explore Our Work
          </MagneticButton>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
        >
          {TECH_BADGES.map((name, i) => (
            <motion.span
              key={name}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm select-none"
              style={{
                border: "1px solid var(--border-color)",
                background: isLight ? "rgba(255,255,255,0.6)" : "rgba(13,27,42,0.7)",
                color: "var(--text-secondary)",
              }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 w-full max-w-lg"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          custom={0.9}
        >
          {STATS.map(({ icon: Icon, value, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full mb-1"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              >
                <Icon size={16} />
              </div>
              <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                <AnimatedCounter target={value} suffix={suffix} />
              </span>
              <span className="text-[11px] text-center font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span
            className="text-[10px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--text-secondary)" }}
          >
            Scroll
          </span>
          <ChevronDown
            className="h-5 w-5 opacity-60"
            style={{ color: "var(--accent)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
