"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Code, Briefcase } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Build Your Project", href: "#project-builder" },
];

const services = [
  "E-Commerce Development",
  "Custom Web Applications",
  "Mobile App Development",
  "AI Integration",
  "Security & DevOps",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

import { useSiteStore } from "@/store/siteStore";

export default function Footer() {
  const { agencyName, aboutText, contactPhone, contactEmail, socialGithub, socialLinkedin } = useSiteStore();

  const connectLinks = [
    {
      label: contactEmail,
      href: `mailto:${contactEmail}`,
      icon: Mail,
    },
    {
      label: contactPhone,
      href: `https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`,
      icon: MessageCircle,
    },
    {
      label: socialGithub.replace(/^https?:\/\//, ''),
      href: socialGithub,
      icon: Code,
    },
    {
      label: socialLinkedin.replace(/^https?:\/\//, ''),
      href: socialLinkedin,
      icon: Briefcase,
    },
  ];

  return (
    <footer className="bg-[#030A14] border-t border-[#00D4FF]/10">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 – Brand */}
          <motion.div variants={columnVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/icon.png"
                alt={`${agencyName} Logo`}
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl tracking-wide">
                <span className="font-bold text-white">{agencyName.split(' ')[0]}</span>
                <span className="font-bold text-[#00D4FF]">{agencyName.split(' ').slice(1).join(' ')}</span>
              </span>
            </div>

            <p className="text-sm font-medium text-[#E0F7FA] mb-2">
              Professional &amp; Interactive Web Solutions
            </p>

            <p className="text-sm leading-relaxed text-[#7B8CA3]">
              {aboutText}
            </p>
          </motion.div>

          {/* Column 2 – Quick Links */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E0F7FA] mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-sm text-[#7B8CA3] transition-colors duration-200 hover:text-[#00D4FF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 – Services */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E0F7FA] mb-5">
              Services
            </h4>

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-[#7B8CA3] transition-colors duration-200 hover:text-[#00D4FF] cursor-default"
                >
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 – Connect */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E0F7FA] mb-5">
              Connect
            </h4>

            <ul className="space-y-3">
              {connectLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#7B8CA3] transition-colors duration-200 hover:text-[#00D4FF]"
                  >
                    <Icon size={16} className="shrink-0" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-[#00D4FF]/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#7B8CA3]">
            &copy; 2026 {agencyName}. All rights reserved.
          </p>
          <p className="text-xs text-[#7B8CA3]">
            طُور بكل فخر💙 🇯🇴
          </p>
        </div>
      </div>
    </footer>
  );
}
