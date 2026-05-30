"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useSiteStore } from "@/store/siteStore";

interface NavLink {
  label: string;
  href: string;
  isButton?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Our Work", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Pricing", href: "#pricing" },
  { label: "Get a Quote", href: "#pricing", isButton: true },
];

export default function Navbar() {
  const { agencyName, theme, setTheme } = useSiteStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isLight = mounted && theme === "light";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-xl border-b ${
          scrolled
            ? isLight
              ? "bg-white/90 shadow-lg shadow-black/10 border-blue-200/40"
              : "bg-[#050B15]/95 shadow-lg shadow-black/20 border-[#00D4FF]/15"
            : isLight
            ? "bg-white/70 border-blue-100/20"
            : "bg-[#050B15]/75 border-[#00D4FF]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleLinkClick("#home")}
              className="flex items-center gap-2.5 group"
              id="navbar-logo"
            >
              <Image
                src="/icon.png"
                alt="Codev Logo"
                width={38}
                height={38}
                className="rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                priority
              />
              <span className="text-xl font-black tracking-tight">
                <span className={isLight ? "text-[#0D1B2A]" : "text-white"}>Co</span>
                <span
                  className="relative"
                  style={{ color: "var(--accent)" }}
                >
                  dev
                  {/* Animated underline dot */}
                  <span
                    className="absolute -bottom-0.5 left-0 w-full h-[2px] rounded-full opacity-60"
                    style={{ background: "var(--accent)" }}
                  />
                </span>
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.isButton ? (
                  <motion.button
                    key={`${link.href}-btn`}
                    onClick={() => handleLinkClick(link.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    id="navbar-get-quote"
                    className="ml-3 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300"
                    style={{
                      background: "var(--accent)",
                      color: "#050B15",
                      boxShadow: "0 0 20px var(--accent-glow)",
                    }}
                  >
                    {link.label}
                  </motion.button>
                ) : (
                  <NavItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    isLight={isLight}
                  />
                )
              )}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                id="theme-toggle"
                className={`ml-2 p-2 rounded-lg transition-all duration-300 ${
                  isLight
                    ? "text-amber-500 hover:bg-amber-50"
                    : "text-[#00D4FF] hover:bg-[#00D4FF]/10"
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isLight ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-2">
              {/* Theme Toggle Mobile */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  isLight ? "text-amber-500" : "text-[#00D4FF]"
                }`}
                aria-label="Toggle theme"
              >
                {isLight ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Menu Toggle */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className={`p-2 rounded-lg transition-colors ${
                  isLight
                    ? "text-[#0D1B2A] hover:bg-gray-100"
                    : "text-[#E0F7FA] hover:bg-[#0D1B2A]"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className={`fixed top-0 right-0 z-50 h-full w-72 backdrop-blur-xl border-l shadow-2xl md:hidden ${
                isLight
                  ? "bg-white/95 border-blue-200/30"
                  : "bg-[#0D1B2A]/95 border-[#00D4FF]/15"
              }`}
            >
              {/* Drawer Header */}
              <div
                className={`flex items-center justify-between px-5 h-16 border-b ${
                  isLight ? "border-gray-200/60" : "border-[#00D4FF]/10"
                }`}
              >
                <span className="text-lg font-black tracking-tight">
                  <span className={isLight ? "text-[#0D1B2A]" : "text-white"}>Co</span>
                  <span style={{ color: "var(--accent)" }}>dev</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isLight
                      ? "text-gray-500 hover:bg-gray-100"
                      : "text-[#7B8CA3] hover:bg-[#132D46]"
                  }`}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-1 p-4 mt-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href + i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      link.isButton
                        ? "mt-4 text-center font-bold"
                        : isLight
                        ? "text-[#0D1B2A] hover:bg-gray-100"
                        : "text-[#E0F7FA] hover:bg-[#132D46]"
                    }`}
                    style={
                      link.isButton
                        ? {
                            background: "var(--accent)",
                            color: "#050B15",
                          }
                        : {}
                    }
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

/* ─── Desktop Nav Link ─── */

interface NavItemProps {
  label: string;
  href: string;
  onClick: () => void;
  isLight: boolean;
}

function NavItem({ label, onClick, isLight }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
        isLight
          ? "text-[#4A6080] hover:text-[#0078C8]"
          : "text-[#7B8CA3] hover:text-[#00D4FF]"
      }`}
    >
      {label}
      <span
        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-3/5"
        style={{ background: "var(--accent)" }}
      />
    </button>
  );
}
