"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  LayoutDashboard,
  Bot,
  Shield,
  Bell,
  BarChart3,
  Globe,
  Plug,
  Lock,
  Cloud,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useProjectBuilder } from "@/store/projectBuilder";
import type { LucideIcon } from "lucide-react";

interface FeatureOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

const featureOptions: FeatureOption[] = [
  { id: "online-payments", label: "Online Payments", icon: CreditCard },
  { id: "admin-dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { id: "ai-chatbot", label: "AI Chatbot", icon: Bot },
  { id: "advanced-security", label: "Advanced Security / WAF", icon: Shield },
  {
    id: "realtime-notifications",
    label: "Real-time Notifications",
    icon: Bell,
  },
  { id: "analytics-reports", label: "Analytics & Reports", icon: BarChart3 },
  {
    id: "multi-language",
    label: "Multi-language Support",
    icon: Globe,
  },
  { id: "api-integration", label: "API Integration", icon: Plug },
  {
    id: "user-authentication",
    label: "User Authentication",
    icon: Lock,
  },
  { id: "cloud-hosting", label: "Cloud Hosting", icon: Cloud },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 24 },
  },
};

export default function StepFeatures() {
  const { features, toggleFeature, setStep } = useProjectBuilder();

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
          Pick your features
        </h2>
        <p className="text-[#7B8CA3] text-lg">
          Select all the capabilities you need — you can always change later.
        </p>
      </motion.div>

      {/* Feature Toggle Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
      >
        {featureOptions.map((feature) => {
          const isSelected = features.includes(feature.id);
          const Icon = feature.icon;

          return (
            <motion.button
              key={feature.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFeature(feature.id)}
              className={`
                relative flex flex-col items-center gap-3 p-5 rounded-2xl
                bg-[#0D1B2A] border-2 transition-colors duration-200
                cursor-pointer text-center
                ${
                  isSelected
                    ? "border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.16)]"
                    : "border-[rgba(0,212,255,0.15)] hover:border-[rgba(0,212,255,0.35)]"
                }
              `}
            >
              {/* Checkmark */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-[#00D4FF] rounded-full p-0.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#050B15]" />
                </motion.span>
              )}

              {/* Icon */}
              <div
                className={`
                  w-11 h-11 rounded-xl flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-[#00D4FF]/15 text-[#00D4FF]"
                      : "bg-[#132D46] text-[#7B8CA3]"
                  }
                  transition-colors duration-200
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label */}
              <span
                className={`text-sm font-medium leading-tight transition-colors duration-200 ${
                  isSelected ? "text-[#00D4FF]" : "text-[#E0F7FA]"
                }`}
              >
                {feature.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-10 w-full flex justify-between"
      >
        {/* Back */}
        <button
          onClick={() => setStep(0)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base
            border-2 border-[rgba(0,212,255,0.15)] text-[#E0F7FA]
            hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all duration-200
            cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Next */}
        <button
          disabled={features.length === 0}
          onClick={() => setStep(2)}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-base
            transition-all duration-200
            ${
              features.length > 0
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
