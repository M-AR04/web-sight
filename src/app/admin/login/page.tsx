'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B15] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Cyber Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0891B2]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-[#0A1628]/90 backdrop-blur-xl border border-[#00D4FF]/20 p-8 rounded-3xl shadow-2xl shadow-[#00D4FF]/5"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4">
            <Image
              src="/icon.png"
              alt="Web Sight Logo"
              width={64}
              height={64}
              className="rounded-xl drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#E0F7FA] mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00D4FF]" /> Admin Secure Login
          </h1>
          <p className="text-sm text-[#7B8CA3]">Restricted access area.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#7B8CA3] mb-2">
              Master Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-[#00D4FF]/50" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-xl pl-10 pr-12 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                placeholder="Enter password..."
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7B8CA3] hover:text-[#00D4FF] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-sm text-[#E11D48] font-medium"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D4FF] text-[#050B15] py-3 rounded-xl font-bold hover:bg-[#00B4D8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
