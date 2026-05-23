'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import TechStackGrid from '@/components/TechStackGrid';
import ProjectBuilder from '@/components/ProjectBuilder/ProjectBuilder';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while preloader is active
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
      {/* 
        The Preloader component manages its own 3 second timer.
        We pass an onComplete callback to unlock scrolling.
      */}
      <Preloader onComplete={() => setLoading(false)} />

      <Navbar />
      
      <main className="flex-1 w-full bg-[#050B15]">
        <HeroSection />
        <ProjectsExplorer />
        <TechStackGrid />
        <ProjectBuilder />
      </main>

      <Footer />
    </>
  );
}
