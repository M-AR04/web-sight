'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useProjectBuilder } from '@/store/projectBuilder';
import StepScope from './StepScope';
import StepFeatures from './StepFeatures';
import StepDetails from './StepDetails';

const steps = [
  { number: 0, label: 'Scope' },
  { number: 1, label: 'Features' },
  { number: 2, label: 'Details' },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function ProjectBuilder() {
  const { currentStep } = useProjectBuilder();

  // Derive animation direction from step changes
  const directionRef = React.useRef(0);
  const prevStepRef = React.useRef(currentStep);

  React.useEffect(() => {
    if (currentStep > prevStepRef.current) {
      directionRef.current = 1;
    } else if (currentStep < prevStepRef.current) {
      directionRef.current = -1;
    }
    prevStepRef.current = currentStep;
  }, [currentStep]);

  const direction = directionRef.current;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepScope />;
      case 1:
        return <StepFeatures />;
      case 2:
        return <StepDetails />;
      default:
        return <StepScope />;
    }
  };

  return (
    <section id="project-builder" className="relative py-24 bg-[#050B15]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00D4FF]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E0F7FA] mb-4">
            Build Your Project
          </h2>
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mb-4 origin-center"
          />
          <p className="text-[#7B8CA3] text-lg max-w-md mx-auto">
            Configure your dream project in 3 simple steps
          </p>
        </motion.div>

        {/* Main Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0A1628] border border-[#00D4FF]/10 rounded-3xl p-6 sm:p-8 lg:p-10"
        >
          {/* Step Progress Indicator */}
          <div className="flex items-center justify-center mb-10">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              const isFuture = currentStep < step.number;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1 : 0.9,
                        backgroundColor: isCompleted || isCurrent ? '#00D4FF' : 'transparent',
                        borderColor: isFuture ? '#7B8CA3' : '#00D4FF',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCurrent
                          ? 'shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                          : ''
                      }`}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <Check className="w-5 h-5 text-[#050B15]" strokeWidth={3} />
                        </motion.div>
                      ) : (
                        <span
                          className={`text-sm font-bold ${
                            isCurrent ? 'text-[#050B15]' : 'text-[#7B8CA3]'
                          }`}
                        >
                          {step.number + 1}
                        </span>
                      )}
                    </motion.div>

                    {/* Step Label */}
                    <span
                      className={`mt-2 text-xs font-medium tracking-wide ${
                        isCurrent
                          ? 'text-[#00D4FF]'
                          : isCompleted
                          ? 'text-[#E0F7FA]'
                          : 'text-[#7B8CA3]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="relative w-16 sm:w-24 h-0.5 mx-2 mt-[-1.25rem]">
                      <div className="absolute inset-0 bg-[#7B8CA3]/30 rounded-full" />
                      <motion.div
                        initial={false}
                        animate={{
                          scaleX: currentStep > step.number ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#00D4FF] rounded-full origin-left"
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Step Content with AnimatePresence */}
          <div className="relative overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
