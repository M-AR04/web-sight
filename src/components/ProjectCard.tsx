"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  color: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
  imageUrl,
  color,
  index = 0,
}: ProjectCardProps) {
  const shortenUrl = (url: string): string => {
    try {
      const parsed = new URL(url);
      return parsed.hostname + parsed.pathname.slice(0, 20);
    } catch {
      return url.slice(0, 30);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group rounded-2xl border border-[#00D4FF]/10 bg-[#0D1B2A] overflow-hidden
                 transition-colors duration-300 hover:border-[#00D4FF]/40
                 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
    >
      {/* ── Browser Chrome ── */}
      <div className="bg-[#0A1628] border-b border-[#00D4FF]/10">
        {/* Tab bar */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-0">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-medium
                        bg-[#0D1B2A] text-[#E0F7FA] border border-b-0 border-[#00D4FF]/10 max-w-[160px] truncate"
          >
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            {title}
          </div>
        </div>

        {/* URL bar row */}
        <div className="flex items-center gap-3 px-4 py-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#28C840] inline-block" />
          </div>

          {/* URL bar */}
          <div
            className="flex-1 flex items-center gap-2 bg-[#050B15] rounded-lg px-3 py-1.5
                        text-xs text-[#7B8CA3] font-mono border border-[#00D4FF]/5"
          >
            <svg
              className="w-3 h-3 text-[#28C840] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{shortenUrl(liveUrl)}</span>
          </div>
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl.startsWith("gradient:") ? (
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out
                       group-hover:scale-110"
            style={{
              background: imageUrl.replace("gradient:", ""),
            }}
          >
            {/* Decorative UI elements to make it look like a page */}
            <div className="absolute inset-0 p-6 flex flex-col gap-3 opacity-30">
              <div className="w-1/3 h-3 rounded-full bg-white/40" />
              <div className="w-2/3 h-2 rounded-full bg-white/20" />
              <div className="w-1/2 h-2 rounded-full bg-white/20" />
              <div className="mt-4 flex gap-3">
                <div className="w-20 h-16 rounded-lg bg-white/15" />
                <div className="w-20 h-16 rounded-lg bg-white/15" />
                <div className="w-20 h-16 rounded-lg bg-white/15" />
              </div>
              <div className="mt-auto w-24 h-6 rounded-md bg-white/20" />
            </div>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out
                       group-hover:scale-110"
          />
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D1B2A] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="px-5 pb-5 pt-3 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-[#E0F7FA] leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#7B8CA3] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[11px] font-medium rounded-full border
                         text-[#00D4FF] bg-[#00D4FF]/5"
              style={{ borderColor: `${color}44` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-1">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                       text-sm font-medium text-[#050B15] bg-[#00D4FF]
                       hover:bg-[#00B4D8] transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                       text-sm font-medium text-[#E0F7FA] border border-[#00D4FF]/20
                       bg-[#00D4FF]/5 hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/40
                       transition-colors duration-200"
          >
            <Code className="w-4 h-4" />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
