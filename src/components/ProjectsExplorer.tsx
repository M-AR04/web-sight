"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  color: string;
}

import { useSiteStore } from "@/store/siteStore";

export default function ProjectsExplorer() {
  const projects = useSiteStore((state) => state.projects);
  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050B15] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00D4FF]/[0.02] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E0F7FA] mb-4"
          >
            Live Projects Explorer
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mb-6 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00B4D8]"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#7B8CA3] max-w-2xl mx-auto"
          >
            Explore our latest work — live deployments with source code
          </motion.p>
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
