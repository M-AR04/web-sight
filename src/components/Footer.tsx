"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Globe, Link2 } from "lucide-react";
import { useSiteStore } from "@/store/siteStore";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Work", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Pricing", href: "#pricing" },
];

const services = [
  "Landing Pages",
  "Full Websites",
  "Online Stores",
  "Mobile Apps (Flutter)",
  "AI Integrations",
  "Custom Web Apps",
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

export default function Footer() {
  const {
    agencyName,
    aboutText,
    contactPhone,
    contactEmail,
    socialInstagram,
    socialLinkedin,
    theme,
  } = useSiteStore();

  const isLight = theme === "light";
  const whatsappUrl = `https://wa.me/${contactPhone.replace(/[^0-9]/g, "")}`;

  const connectLinks = [
    {
      label: contactEmail,
      href: `mailto:${contactEmail}`,
      icon: Mail,
    },
    {
      label: socialInstagram.replace(/^https?:\/\//, ""),
      href: socialInstagram,
      icon: Globe,
    },
    {
      label: socialLinkedin.replace(/^https?:\/\//, ""),
      href: socialLinkedin,
      icon: Link2,
    },
  ];

  return (
    <footer
      style={{
        background: "var(--footer-bg)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      {/* WhatsApp CTA Banner */}
      <div
        className="py-10 px-6"
        style={{ background: "var(--accent-dim)", borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-xl font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to start your project?
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Contact us on WhatsApp and get a free consultation today.
            </p>
          </div>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-whatsapp-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shrink-0"
            style={{
              background: "#25D366",
              color: "#fff",
              boxShadow: "0 0 24px rgba(37, 211, 102, 0.3)",
            }}
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </motion.a>
        </div>
      </div>

      {/* Main Footer Content */}
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
              <span className="text-xl font-black tracking-wide">
                <span style={{ color: "var(--text-primary)" }}>Co</span>
                <span style={{ color: "var(--accent)" }}>dev</span>
              </span>
            </div>

            <p
              className="text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Professional & Interactive Web Solutions
            </p>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {aboutText}
            </p>
          </motion.div>

          {/* Column 2 – Quick Links */}
          <motion.div variants={columnVariants}>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 – Services */}
          <motion.div variants={columnVariants}>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm transition-colors duration-200 cursor-default"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 – Connect */}
          <motion.div variants={columnVariants}>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Connect
            </h4>

            {/* WhatsApp big link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold mb-4 transition-all duration-200 group"
              style={{ color: "#25D366" }}
            >
              <MessageCircle size={16} className="shrink-0 group-hover:scale-110 transition-transform" />
              <span>{contactPhone}</span>
            </a>

            <ul className="space-y-3">
              {connectLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate max-w-[160px]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            &copy; 2026 {agencyName}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            طُور بكل فخر 💙 🇯🇴
          </p>
        </div>
      </div>
    </footer>
  );
}
