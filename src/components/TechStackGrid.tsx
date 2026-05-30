"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Shield } from "lucide-react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TechItem {
  name: string;
  abbr: string;
}

interface TechCategory {
  title: string;
  icon: ReactNode;
  color: string;          // hex for accent / glow
  colorClass: string;     // tailwind‑friendly border / shadow color
  items: TechItem[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories: TechCategory[] = [
  {
    title: "Frontend",
    icon: <Monitor className="h-5 w-5" />,
    color: "#00D4FF",
    colorClass: "#00D4FF",
    items: [
      { name: "Next.js", abbr: "Nx" },
      { name: "React", abbr: "Re" },
      { name: "Tailwind CSS", abbr: "Tw" },
      { name: "Flutter", abbr: "Fl" },
      { name: "TypeScript", abbr: "Ts" },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-5 w-5" />,
    color: "#10B981",
    colorClass: "#10B981",
    items: [
      { name: "Node.js", abbr: "Nd" },
      { name: "Prisma", abbr: "Pr" },
      { name: "PostgreSQL", abbr: "Pg" },
      { name: "Express", abbr: "Ex" },
      { name: "Python", abbr: "Py" },
    ],
  },
  {
    title: "Security & DevOps",
    icon: <Shield className="h-5 w-5" />,
    color: "#F59E0B",
    colorClass: "#F59E0B",
    items: [
      { name: "Linux", abbr: "Li" },
      { name: "WAF", abbr: "Wf" },
      { name: "Docker", abbr: "Dk" },
      { name: "CI/CD", abbr: "CI" },
      { name: "Cloudflare", abbr: "Cf" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const itemContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub‑components                                                     */
/* ------------------------------------------------------------------ */

function TechCard({ item, color }: { item: TechItem; color: string }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.08,
        borderColor: color,
        boxShadow: `0 0 20px ${color}33, 0 0 40px ${color}1a`,
        transition: { duration: 0.25 },
      }}
      className="flex flex-col items-center gap-3 rounded-xl p-5 transition-colors"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Styled abbreviation circle */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold tracking-wide"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}0a)`,
          border: `1.5px solid ${color}44`,
          color: color,
        }}
      >
        {item.abbr}
      </div>

      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.name}</span>
    </motion.div>
  );
}


function CategoryColumn({ category }: { category: TechCategory }) {
  return (
    <motion.div variants={columnVariants} className="flex flex-col gap-5">
      {/* Category header */}
      <div
        className="flex items-center gap-3 rounded-lg px-4 py-3"
        style={{ borderLeft: `3px solid ${category.color}` }}
      >
        <span style={{ color: category.color }}>{category.icon}</span>
        <h3
          className="text-lg font-semibold"
          style={{ color: category.color }}
        >
          {category.title}
        </h3>
      </div>

      {/* Items grid – 2 cols on small, 3 on md inside the column, wrapping nicely */}
      <motion.div
        variants={itemContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
      >
        {category.items.map((item) => (
          <TechCard key={item.name} item={item} color={category.color} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function TechStackGrid() {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Subtle radial background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#00D4FF]/[0.03] blur-[120px]" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* ---- Heading ---- */}
        <motion.div
          variants={headingVariants}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#E0F7FA] sm:text-4xl lg:text-5xl">
            Our Technology Arsenal
          </h2>

          {/* Animated underline */}
          <motion.div
            className="mx-auto mt-4 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
          />

          <p className="mt-5 text-base leading-relaxed text-[#7B8CA3] sm:text-lg">
            Cutting-edge tools powering your digital transformation
          </p>
        </motion.div>

        {/* ---- Category columns ---- */}
        <div className="grid gap-10 md:grid-cols-3">
          {categories.map((cat) => (
            <CategoryColumn key={cat.title} category={cat} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
