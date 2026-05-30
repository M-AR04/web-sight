"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageGalleryModalProps {
  images: string[];
  initialIndex?: number;
  title: string;
  onClose: () => void;
}

export default function ImageGalleryModal({
  images,
  initialIndex = 0,
  title,
  onClose,
}: ImageGalleryModalProps) {
  const [current, setCurrent] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isGradient = images[current]?.startsWith("gradient:");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.92)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </span>
              {images.length > 1 && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                  }}
                >
                  {current + 1} / {images.length}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              id="gallery-close-btn"
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative h-[60vh] bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {isGradient ? (
                  <div
                    className="w-full h-full"
                    style={{
                      background: images[current].replace("gradient:", ""),
                    }}
                  >
                    {/* Decorative UI mockup */}
                    <div className="absolute inset-0 p-10 flex flex-col gap-4 opacity-30">
                      <div className="w-1/3 h-4 rounded-full bg-white/40" />
                      <div className="w-2/3 h-3 rounded-full bg-white/20" />
                      <div className="w-1/2 h-3 rounded-full bg-white/20" />
                      <div className="mt-6 flex gap-4">
                        <div className="w-32 h-24 rounded-xl bg-white/15" />
                        <div className="w-32 h-24 rounded-xl bg-white/15" />
                        <div className="w-32 h-24 rounded-xl bg-white/15" />
                      </div>
                      <div className="mt-auto w-28 h-8 rounded-lg bg-white/25" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={images[current]}
                    alt={`${title} - image ${current + 1}`}
                    fill
                    className="object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  id="gallery-prev-btn"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    color: "var(--accent)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  id="gallery-next-btn"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    color: "var(--accent)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div
              className="flex gap-2 p-3 overflow-x-auto"
              style={{ borderTop: "1px solid var(--border-color)" }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200"
                  style={{
                    border: i === current
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                    opacity: i === current ? 1 : 0.5,
                  }}
                >
                  {img.startsWith("gradient:") ? (
                    <div
                      className="w-full h-full"
                      style={{ background: img.replace("gradient:", "") }}
                    />
                  ) : (
                    <Image src={img} alt={`thumb ${i}`} fill className="object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
