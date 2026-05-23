"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  isButton?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Build Your Project", href: "#project-builder", isButton: true },
];

import { useSiteStore } from "@/store/siteStore";

export default function Navbar() {
  const agencyName = useSiteStore((state) => state.agencyName);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b border-[#00D4FF]/10 ${
          scrolled
            ? "bg-[#050B15]/95 shadow-lg shadow-black/20"
            : "bg-[#050B15]/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleLinkClick("#home")}
              className="flex items-center gap-2.5 group"
            >
              <Image
                src="/icon.png"
                alt="Web Sight Logo"
                width={40}
                height={40}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">WEB</span>
                <span className="text-[#00D4FF]">SIGHT</span>
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.isButton ? (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="ml-3 px-5 py-2 rounded-lg border border-[#00D4FF]/40 text-[#00D4FF] text-sm font-semibold
                      transition-all duration-300
                      hover:border-[#00D4FF] hover:bg-[#00D4FF]/10
                      hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]
                      active:scale-95"
                  >
                    {link.label}
                  </button>
                ) : (
                  <NavItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                  />
                )
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-[#E0F7FA] hover:bg-[#0D1B2A] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-[#0D1B2A]/95 backdrop-blur-xl
                border-l border-[#00D4FF]/15 shadow-2xl shadow-black/40 md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-[#00D4FF]/10">
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-white">WEB</span>
                  <span className="text-[#00D4FF]">SIGHT</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[#7B8CA3] hover:text-[#E0F7FA] hover:bg-[#132D46] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-1 p-4 mt-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      link.isButton
                        ? "mt-4 border border-[#00D4FF]/40 text-[#00D4FF] text-center hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]"
                        : "text-[#E0F7FA] hover:text-[#00D4FF] hover:bg-[#132D46]"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Desktop Nav Link with underline animation ─── */

interface NavItemProps {
  label: string;
  href: string;
  onClick: () => void;
}

function NavItem({ label, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 text-sm font-medium text-[#7B8CA3] transition-colors duration-200 hover:text-[#00D4FF] group"
    >
      {label}
      {/* Animated underline */}
      <span
        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#00D4FF] rounded-full
          transition-all duration-300 group-hover:w-3/5"
      />
    </button>
  );
}
