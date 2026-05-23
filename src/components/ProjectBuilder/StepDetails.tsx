'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowLeft, Clock, FileText } from 'lucide-react';
import { useProjectBuilder } from '@/store/projectBuilder';

const timelineOptions = [
  { value: '5 days - 1 week', tag: 'Sprint' },
  { value: '1-3 Months', tag: 'Standard' },
  { value: '3-6 Months', tag: 'Complex' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function StepDetails() {
  const { timeline, notes, setTimeline, setNotes, setStep, generateWhatsAppLink } =
    useProjectBuilder();

  const handleSubmit = () => {
    const url = generateWhatsAppLink();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setNotes(e.target.value);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center w-full max-w-3xl mx-auto px-4"
    >
      {/* Heading */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-[#E0F7FA] mb-2">
          Final Details
        </h2>
        <p className="text-[#7B8CA3] text-lg">
          Set your timeline and any additional notes.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={itemVariants} className="w-full mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#00D4FF]" />
          <h3 className="text-lg font-semibold text-[#E0F7FA]">Timeline</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {timelineOptions.map((option) => {
            const isSelected = timeline === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setTimeline(option.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00D4FF]/10 border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.15)]'
                    : 'bg-[#0D1B2A] border-[rgba(0,212,255,0.15)] hover:border-[#00D4FF]/40 hover:bg-[#132D46]'
                }`}
              >
                <span
                  className={`block text-xs font-medium uppercase tracking-wider mb-1 ${
                    isSelected ? 'text-[#00D4FF]' : 'text-[#7B8CA3]'
                  }`}
                >
                  {option.tag}
                </span>
                <span
                  className={`block text-base font-bold ${
                    isSelected ? 'text-[#E0F7FA]' : 'text-[#7B8CA3]'
                  }`}
                >
                  {option.value}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="timeline-indicator"
                    className="absolute inset-0 rounded-xl border-2 border-[#00D4FF] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Additional Notes */}
      <motion.div variants={itemVariants} className="w-full mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#00D4FF]" />
          <h3 className="text-lg font-semibold text-[#E0F7FA]">Additional Notes</h3>
        </div>
        <div className="relative">
          <textarea
            value={notes}
            onChange={handleNotesChange}
            maxLength={500}
            rows={5}
            placeholder="Tell us about your project vision, specific requirements, or any questions..."
            className="w-full bg-[#0D1B2A] border border-[rgba(0,212,255,0.15)] rounded-xl p-4 text-[#E0F7FA] placeholder-[#7B8CA3]/60 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50 focus:border-[#00D4FF]"
          />
          <span className="absolute bottom-3 right-4 text-xs text-[#7B8CA3]">
            {notes.length}/500
          </span>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="w-full flex items-center justify-between pt-4">
        <motion.button
          type="button"
          onClick={() => setStep(1)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[rgba(0,212,255,0.15)] text-[#E0F7FA] hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all duration-200 cursor-pointer font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.button
          type="button"
          onClick={handleSubmit}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(37, 211, 102, 0.35)',
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#25D366] text-white font-semibold shadow-lg shadow-[#25D366]/20 transition-all duration-200 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          Send via WhatsApp
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
