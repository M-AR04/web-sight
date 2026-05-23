"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

// --- SVG Eye Geometry ---

// Outer hexagonal ring nodes (6 nodes)
const outerNodes: [number, number][] = [
  [150, 40],   // top
  [220, 75],   // top-right
  [220, 155],  // bottom-right
  [150, 190],  // bottom
  [80, 155],   // bottom-left
  [80, 75],    // top-left
];

// Mid ring nodes (secondary connectors)
const midNodes: [number, number][] = [
  [150, 60],   // top
  [200, 90],   // top-right
  [200, 140],  // bottom-right
  [150, 170],  // bottom
  [100, 140],  // bottom-left
  [100, 90],   // top-left
];

// Inner eye-shape nodes (almond shape)
const innerNodes: [number, number][] = [
  [110, 115],  // left point
  [130, 95],   // upper-left curve
  [150, 88],   // top center
  [170, 95],   // upper-right curve
  [190, 115],  // right point
  [170, 135],  // lower-right curve
  [150, 142],  // bottom center
  [130, 135],  // lower-left curve
];

// Pupil center
const pupilCenter: [number, number] = [150, 115];

// All nodes combined for stagger animation
const allNodes = [...outerNodes, ...midNodes, ...innerNodes];

// Lines: connections between node indices within their respective arrays
interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function generateLines(): Line[] {
  const lines: Line[] = [];

  // Outer ring connections
  for (let i = 0; i < outerNodes.length; i++) {
    const next = (i + 1) % outerNodes.length;
    lines.push({
      x1: outerNodes[i][0], y1: outerNodes[i][1],
      x2: outerNodes[next][0], y2: outerNodes[next][1],
    });
  }

  // Outer to mid connections
  for (let i = 0; i < outerNodes.length; i++) {
    lines.push({
      x1: outerNodes[i][0], y1: outerNodes[i][1],
      x2: midNodes[i][0], y2: midNodes[i][1],
    });
  }

  // Mid ring connections
  for (let i = 0; i < midNodes.length; i++) {
    const next = (i + 1) % midNodes.length;
    lines.push({
      x1: midNodes[i][0], y1: midNodes[i][1],
      x2: midNodes[next][0], y2: midNodes[next][1],
    });
  }

  // Mid to inner connections (cross links for neural-net feel)
  lines.push({ x1: midNodes[0][0], y1: midNodes[0][1], x2: innerNodes[2][0], y2: innerNodes[2][1] });
  lines.push({ x1: midNodes[1][0], y1: midNodes[1][1], x2: innerNodes[3][0], y2: innerNodes[3][1] });
  lines.push({ x1: midNodes[2][0], y1: midNodes[2][1], x2: innerNodes[4][0], y2: innerNodes[4][1] });
  lines.push({ x1: midNodes[3][0], y1: midNodes[3][1], x2: innerNodes[6][0], y2: innerNodes[6][1] });
  lines.push({ x1: midNodes[4][0], y1: midNodes[4][1], x2: innerNodes[7][0], y2: innerNodes[7][1] });
  lines.push({ x1: midNodes[5][0], y1: midNodes[5][1], x2: innerNodes[1][0], y2: innerNodes[1][1] });

  // Inner eye-shape connections (almond outline)
  for (let i = 0; i < innerNodes.length; i++) {
    const next = (i + 1) % innerNodes.length;
    lines.push({
      x1: innerNodes[i][0], y1: innerNodes[i][1],
      x2: innerNodes[next][0], y2: innerNodes[next][1],
    });
  }

  // Inner nodes to pupil center
  lines.push({ x1: innerNodes[0][0], y1: innerNodes[0][1], x2: pupilCenter[0], y2: pupilCenter[1] });
  lines.push({ x1: innerNodes[2][0], y1: innerNodes[2][1], x2: pupilCenter[0], y2: pupilCenter[1] });
  lines.push({ x1: innerNodes[4][0], y1: innerNodes[4][1], x2: pupilCenter[0], y2: pupilCenter[1] });
  lines.push({ x1: innerNodes[6][0], y1: innerNodes[6][1], x2: pupilCenter[0], y2: pupilCenter[1] });

  return lines;
}

const lines = generateLines();

const tagline = "Professional & Interactive Web Solutions";

import { useSiteStore } from "@/store/siteStore";

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const agencyName = useSiteStore((state) => state.agencyName);
  const titleText = agencyName.toUpperCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    onComplete?.();
  };

  // Timing constants (in seconds)
  const nodeStaggerStart = 0.1;
  const nodeStaggerDelay = 0.04;
  const nodeTotalTime = nodeStaggerStart + allNodes.length * nodeStaggerDelay;

  const lineDrawStart = nodeTotalTime * 0.5;
  const lineStaggerDelay = 0.03;

  const pupilStart = lineDrawStart + lines.length * lineStaggerDelay * 0.5;

  const textStart = pupilStart + 0.3;
  const letterDelay = 0.06;

  const taglineStart = textStart + titleText.length * letterDelay + 0.2;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050B15]"
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          {/* SVG Eye Icon */}
          <motion.div
            className="relative"
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.6))",
            }}
          >
            <svg
              width="300"
              height="230"
              viewBox="0 0 300 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glow filter */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="pupilGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Lines connecting nodes */}
              {lines.map((line, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#00D4FF"
                  strokeWidth={1}
                  strokeOpacity={0.4}
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: {
                      delay: lineDrawStart + i * lineStaggerDelay,
                      duration: 0.3,
                      ease: "easeOut",
                    },
                    opacity: {
                      delay: lineDrawStart + i * lineStaggerDelay,
                      duration: 0.1,
                    },
                  }}
                />
              ))}

              {/* Nodes */}
              {allNodes.map((node, i) => (
                <motion.circle
                  key={`node-${i}`}
                  cx={node[0]}
                  cy={node[1]}
                  r={4}
                  fill="#00D4FF"
                  filter="url(#glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: nodeStaggerStart + i * nodeStaggerDelay,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Pupil - crescent / filled circle with glow pulse */}
              <motion.circle
                cx={pupilCenter[0]}
                cy={pupilCenter[1]}
                r={14}
                fill="#00D4FF"
                filter="url(#pupilGlow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.15, 1, 1.1, 1],
                  opacity: [0, 1, 1, 1, 1, 1],
                }}
                transition={{
                  delay: pupilStart,
                  duration: 1.5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
              />
              {/* Crescent overlay to make it look like a crescent pupil */}
              <motion.circle
                cx={pupilCenter[0] + 5}
                cy={pupilCenter[1] - 3}
                r={10}
                fill="#050B15"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: pupilStart + 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              />

              {/* Pupil ambient pulse ring */}
              <motion.circle
                cx={pupilCenter[0]}
                cy={pupilCenter[1]}
                r={18}
                fill="none"
                stroke="#00D4FF"
                strokeWidth={1.5}
                strokeOpacity={0.3}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  delay: pupilStart + 0.3,
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </svg>
          </motion.div>

          {/* Title - WEB SIGHT typed letter by letter */}
          <div className="mt-8 flex overflow-hidden">
            {titleText.split("").map((char, i) => (
              <motion.span
                key={`title-${i}`}
                className="text-4xl font-bold tracking-[0.3em] text-[#00D4FF]"
                style={{
                  textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: textStart + i * letterDelay,
                  duration: 0.15,
                  ease: "easeOut",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-sm tracking-widest text-[#7B8CA3]"
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{
              delay: taglineStart,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {tagline}
          </motion.p>

          {/* Bottom loading bar */}
          <motion.div
            className="absolute bottom-12 h-[2px] w-48 overflow-hidden rounded-full bg-[#0D1B2A]"
          >
            <motion.div
              className="h-full rounded-full bg-[#00D4FF]"
              style={{
                boxShadow: "0 0 10px rgba(0, 212, 255, 0.6)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.8,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
