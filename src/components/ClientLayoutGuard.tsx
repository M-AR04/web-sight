'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert, Settings, Activity } from 'lucide-react';
import { useSiteStore } from '@/store/siteStore';

export default function ClientLayoutGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const maintenanceMode = useSiteStore((state) => state.maintenanceMode);
  const agencyName = useSiteStore((state) => state.agencyName);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by returning null until mounted
  if (!mounted) return null;

  // The admin routes should bypass maintenance mode
  const isAdminRoute = pathname?.startsWith('/admin');

  if (maintenanceMode && !isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#050B15] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Cyber Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E11D48]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center bg-[#0A1628]/80 backdrop-blur-xl border border-[#E11D48]/20 p-12 rounded-3xl max-w-2xl shadow-2xl shadow-[#E11D48]/10"
        >
          {/* Animated Icon */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-20%] border border-[#E11D48]/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-40%] border border-[#00D4FF]/20 rounded-full border-dashed"
            />
            <div className="w-24 h-24 bg-[#E11D48]/10 rounded-2xl flex items-center justify-center border border-[#E11D48]/30 shadow-[0_0_30px_rgba(225,29,72,0.2)]">
              <ShieldAlert className="w-12 h-12 text-[#E11D48]" />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-[#E0F7FA] mb-4 tracking-tight">
            SYSTEM <span className="text-[#E11D48]">UPGRADE</span> IN PROGRESS
          </h1>

          <p className="text-[#7B8CA3] text-lg mb-8 max-w-md leading-relaxed">
            {agencyName} is currently undergoing scheduled maintenance to enhance
            performance and deploy new features. We will be back online shortly.
          </p>

          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 text-[#00D4FF]">
              <Settings className="w-4 h-4 animate-spin-slow" />
              <span>Optimizing Cores</span>
            </div>
            <div className="flex items-center gap-2 text-[#25D366]">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Status: Offline</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // If not in maintenance mode, or if on an admin route, render normal children
  return <>{children}</>;
}
