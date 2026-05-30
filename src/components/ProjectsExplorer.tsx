"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useSiteStore } from "@/store/siteStore";

export default function ProjectsExplorer() {
  const projects = useSiteStore((state) => state.projects);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.04), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              border: "1px solid var(--border-color)",
              background: "var(--accent-dim)",
              color: "var(--accent)",
            }}
          >
            Our Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Our Work
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mb-6 h-1 w-24 origin-center rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--accent), #7C3AED)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Browse through our latest projects — click any card to view the full photo gallery
          </motion.p>
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
