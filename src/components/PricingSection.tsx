"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { useSiteStore } from "@/store/siteStore";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function PricingSection() {
  const { pricingPlans, contactPhone } = useSiteStore();

  const handleWhatsApp = (planName: string) => {
    const phone = contactPhone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `مرحباً، أريد الاستفسار عن باقة ${planName} 🚀`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              border: "1px solid var(--border-color)",
              background: "var(--accent-dim)",
              color: "var(--accent)",
            }}
          >
            <Sparkles size={12} />
            Transparent Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Simple, Honest{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, var(--accent), #7C3AED)",
              }}
            >
              Pricing
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mb-6 h-1 w-24 origin-center rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--accent), #7C3AED)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            No hidden fees. Choose the package that fits your needs, or contact us for a custom solution.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className={`relative rounded-2xl p-6 flex flex-col overflow-hidden shimmer-hover ${
                plan.isPopular ? "popular-glow" : ""
              }`}
              style={{
                background: plan.isPopular
                  ? "linear-gradient(135deg, var(--bg-card), #0A1628)"
                  : "var(--bg-card)",
                border: plan.isPopular
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border-color)",
              }}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl rounded-tr-xl"
                  style={{ background: "var(--accent)", color: "#050B15" }}
                >
                  ⭐ Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-end gap-1 mb-3">
                {plan.price !== null ? (
                  <>
                    <span
                      className="text-4xl font-black"
                      style={{ color: "var(--accent)" }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-sm font-semibold mb-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {plan.currency}
                    </span>
                  </>
                ) : (
                  <span
                    className="text-2xl font-black"
                    style={{ color: "var(--accent)" }}
                  >
                    Custom
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                className="h-px mb-5"
                style={{ background: "var(--border-color)" }}
              />

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full shrink-0"
                      style={{
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleWhatsApp(plan.name)}
                whileTap={{ scale: 0.97 }}
                id={`pricing-cta-${plan.id}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300"
                style={
                  plan.isPopular
                    ? {
                        background: "var(--accent)",
                        color: "#050B15",
                        boxShadow: "0 0 20px var(--accent-glow)",
                      }
                    : {
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                        border: "1px solid var(--border-color)",
                      }
                }
              >
                <MessageCircle size={16} />
                {plan.ctaLabel}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm mt-10"
          style={{ color: "var(--text-muted)" }}
        >
          * All prices are starting prices. Final cost depends on project complexity and requirements.
        </motion.p>
      </div>
    </section>
  );
}
