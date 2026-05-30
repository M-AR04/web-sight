'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import TechStackGrid from '@/components/TechStackGrid';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />

      <Navbar />

      <main className="flex-1 w-full" style={{ background: 'var(--bg-primary)' }}>
        <HeroSection />
        <ProjectsExplorer />
        <TechStackGrid />
        <PricingSection />
      </main>

      <Footer />
    </>
  );
}
