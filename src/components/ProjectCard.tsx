"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import Image from "next/image";
import ImageGalleryModal from "./ImageGalleryModal";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  color: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  images,
  color,
  index = 0,
}: ProjectCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const previewImage = images?.[0] ?? "gradient:linear-gradient(135deg, #0f2027 0%, #2c5364 100%)";
  const isGradient = previewImage.startsWith("gradient:");

  return (
    <>
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
        className="group rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}66`;
          e.currentTarget.style.boxShadow = `0 0 30px ${color}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* ── Browser Chrome ── */}
        <div
          className="border-b"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Tab bar */}
          <div className="flex items-center gap-2 px-4 pt-3 pb-0">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-medium border border-b-0 max-w-[160px] truncate"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                borderColor: "var(--border-color)",
              }}
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

            {/* URL bar — shows image count */}
            <div
              className="flex-1 flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono"
              style={{
                background: "var(--bg-primary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              <Images size={11} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="truncate">
                {images.length} image{images.length !== 1 ? "s" : ""} • {title}
              </span>
            </div>
          </div>
        </div>

        {/* ── Preview Area ── */}
        <div
          className="relative h-48 overflow-hidden cursor-pointer"
          onClick={() => setGalleryOpen(true)}
        >
          {isGradient ? (
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
              style={{ background: previewImage.replace("gradient:", "") }}
            >
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
              src={previewImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          )}

          {/* View Gallery Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: "var(--accent)",
                color: "#050B15",
              }}
            >
              <Images size={16} />
              View Gallery
            </div>
          </div>

          {/* Image count badge */}
          {images.length > 1 && (
            <div
              className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(0,0,0,0.7)",
                color: "var(--accent)",
                border: "1px solid var(--border-color)",
              }}
            >
              {images.length} photos
            </div>
          )}

          {/* Gradient overlay at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{
              background: "linear-gradient(to top, var(--bg-card), transparent)",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div className="px-5 pb-5 pt-3 flex flex-col gap-3 flex-1">
          <h3
            className="text-lg font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>

          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] font-medium rounded-full border"
                style={{
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                  borderColor: `${color}44`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Gallery Button */}
          <button
            onClick={() => setGalleryOpen(true)}
            id={`view-gallery-${title.toLowerCase().replace(/\s+/g, "-")}`}
            className="mt-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid var(--border-color)",
            }}
          >
            <Images size={16} />
            View Project Gallery
          </button>
        </div>
      </motion.div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <ImageGalleryModal
          images={images}
          title={title}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}
