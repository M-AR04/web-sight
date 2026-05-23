"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Code,
  Users,
  Truck,
  Check,
  ArrowRight,
} from "lucide-react";
import { useProjectBuilder } from "@/store/projectBuilder";
import type { LucideIcon } from "lucide-react";

interface ProjectTypeOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const projectTypes: ProjectTypeOption[] = [
  {
    id: "e-commerce",
    label: "E-Commerce Platform",
    description: "Online stores with payment integration",
    icon: ShoppingCart,
  },
  {
    id: "web-app",
    label: "Custom Web Application",
    description: "Tailored solutions for your business",
    icon: Code,
  },
  {
    id: "intermediary",
    label: "Intermediary Platform",
    description: "Connect buyers and sellers seamlessly",
    icon: Users,
  },
  {
    id: "delivery",
    label: "Delivery Application",
    description: "Real-time tracking and logistics",
    icon: Truck,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 22 },
  },
};

export default function StepScope() {
  const { projectType, setProjectType, setStep } = useProjectBuilder();

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-[#E0F7FA] mb-2">
          What are you building?
        </h2>
        <p className="text-[#7B8CA3] text-lg">
          Select the type of project that best fits your vision.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
      >
        {projectTypes.map((type) => {
          const isSelected = projectType === type.id;
          const Icon = type.icon;

          return (
            <motion.button
              key={type.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setProjectType(type.id)}
              className={`
                relative flex flex-col items-center gap-4 p-7 rounded-2xl
                bg-[#0D1B2A] border-2 transition-colors duration-200
                cursor-pointer text-center
                ${
                  isSelected
                    ? "border-[#00D4FF] shadow-[0_0_24px_rgba(0,212,255,0.18)]"
                    : "border-[rgba(0,212,255,0.15)] hover:border-[rgba(0,212,255,0.35)]"
                }
              `}
            >
              {/* Check badge */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 bg-[#00D4FF] rounded-full p-1"
                >
                  <Check className="w-4 h-4 text-[#050B15]" />
                </motion.span>
              )}

              {/* Icon */}
              <div
                className={`
                  w-14 h-14 rounded-xl flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-[#00D4FF]/15 text-[#00D4FF]"
                      : "bg-[#132D46] text-[#7B8CA3]"
                  }
                  transition-colors duration-200
                `}
              >
                <Icon className="w-7 h-7" />
              </div>

              {/* Text */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-1 transition-colors duration-200 ${
                    isSelected ? "text-[#00D4FF]" : "text-[#E0F7FA]"
                  }`}
                >
                  {type.label}
                </h3>
                <p className="text-sm text-[#7B8CA3]">{type.description}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 w-full flex justify-end"
      >
        <button
          disabled={!projectType}
          onClick={() => setStep(1)}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-base
            transition-all duration-200
            ${
              projectType
                ? "bg-[#00D4FF] text-[#050B15] hover:bg-[#00B4D8] shadow-[0_0_20px_rgba(0,212,255,0.25)] cursor-pointer"
                : "bg-[#132D46] text-[#7B8CA3] cursor-not-allowed opacity-60"
            }
          `}
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
