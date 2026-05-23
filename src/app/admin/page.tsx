'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, Save, AlertTriangle, Plus, Trash2, LogOut } from 'lucide-react';
import { useSiteStore, Project } from '@/store/siteStore';
import { useRouter } from 'next/navigation';

interface AdminFormValues {
  agencyName: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  socialGithub: string;
  socialLinkedin: string;
  projects: Project[];
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const store = useSiteStore();
  const router = useRouter();
  
  const { register, control, handleSubmit, reset } = useForm<AdminFormValues>({
    defaultValues: {
      agencyName: '',
      heroHeadlineLine1: '',
      heroHeadlineLine2: '',
      heroSubtitle: '',
      aboutText: '',
      contactPhone: '',
      contactEmail: '',
      socialGithub: '',
      socialLinkedin: '',
      projects: [],
    },
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects"
  });

  useEffect(() => {
    setMounted(true);
    reset({
      agencyName: store.agencyName,
      heroHeadlineLine1: store.heroHeadlineLine1,
      heroHeadlineLine2: store.heroHeadlineLine2,
      heroSubtitle: store.heroSubtitle,
      aboutText: store.aboutText,
      contactPhone: store.contactPhone,
      contactEmail: store.contactEmail,
      socialGithub: store.socialGithub,
      socialLinkedin: store.socialLinkedin,
      projects: store.projects,
    });
  }, [store, reset]);

  if (!mounted) return null;

  const onSubmit = (data: AdminFormValues) => {
    store.setAgencyName(data.agencyName);
    store.setHeroHeadlineLine1(data.heroHeadlineLine1);
    store.setHeroHeadlineLine2(data.heroHeadlineLine2);
    store.setHeroSubtitle(data.heroSubtitle);
    store.setAboutText(data.aboutText);
    store.setContactPhone(data.contactPhone);
    store.setContactEmail(data.contactEmail);
    store.setSocialGithub(data.socialGithub);
    store.setSocialLinkedin(data.socialLinkedin);
    store.setProjects(data.projects);
    alert('Settings saved successfully!');
  };

  const handleMaintenanceToggle = () => {
    const confirmMessage = store.maintenanceMode
      ? "Are you sure you want to turn OFF maintenance mode?"
      : "WARNING: This will block all public access to the site! Are you sure you want to enable Maintenance Mode?";
    if (confirm(confirmMessage)) {
      store.setMaintenanceMode(!store.maintenanceMode);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const createEmptyProject = (): Project => ({
    id: `proj-${Date.now()}`,
    title: '',
    description: '',
    tags: [],
    liveUrl: '',
    githubUrl: '',
    imageUrl: 'gradient:linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    color: '#00D4FF'
  });

  return (
    <div className="min-h-screen bg-[#050B15] text-[#E0F7FA] p-6 lg:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#00D4FF]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center border border-[#00D4FF]/30">
              <Shield className="w-6 h-6 text-[#00D4FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-[#7B8CA3]">Manage site configuration and content</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleMaintenanceToggle}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 border-2 ${
                store.maintenanceMode
                  ? 'bg-[#E11D48]/10 border-[#E11D48] text-[#E11D48] shadow-[0_0_20px_rgba(225,29,72,0.3)]'
                  : 'bg-[#0D1B2A] border-[#7B8CA3]/30 text-[#7B8CA3] hover:border-[#E11D48]/50 hover:text-[#E11D48]'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              {store.maintenanceMode ? 'Maintenance ON' : 'Maintenance OFF'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wide bg-[#0D1B2A] border-2 border-[#7B8CA3]/30 text-[#7B8CA3] hover:border-[#00D4FF]/50 hover:text-[#00D4FF] transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          
          {/* Global Settings */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-[#00D4FF]/10 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" /> Global & Contact Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">Agency Name</label>
                <input
                  {...register('agencyName')}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">Contact Phone</label>
                <input
                  {...register('contactPhone')}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">Contact Email</label>
                <input
                  {...register('contactEmail')}
                  type="email"
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">GitHub URL</label>
                <input
                  {...register('socialGithub')}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">LinkedIn URL</label>
                <input
                  {...register('socialLinkedin')}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">About Section Text</label>
                <textarea
                  {...register('aboutText')}
                  rows={3}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF] resize-none"
                />
              </div>
            </div>
          </section>

          {/* Hero Settings */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-[#00D4FF]/10 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" /> Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">Headline (Line 1)</label>
                <input
                  {...register('heroHeadlineLine1')}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">Headline (Line 2 - Gradient)</label>
                <input
                  {...register('heroHeadlineLine2')}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#7B8CA3] mb-2">Subtitle</label>
                <textarea
                  {...register('heroSubtitle')}
                  rows={3}
                  className="w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF] resize-none"
                />
              </div>
            </div>
          </section>

          {/* Projects Management */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-[#00D4FF]/10 pb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D4FF]" /> Projects
              </h2>
              <button
                type="button"
                onClick={() => appendProject(createEmptyProject())}
                className="flex items-center gap-2 bg-[#00D4FF]/10 text-[#00D4FF] hover:bg-[#00D4FF]/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="space-y-6">
              {projectFields.map((field, index) => (
                <div key={field.id} className="relative bg-[#050B15] border border-[#00D4FF]/10 p-6 rounded-xl group">
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="absolute top-4 right-4 text-[#7B8CA3] hover:text-[#E11D48] transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-[#00D4FF] mb-4">Project {index + 1}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#7B8CA3] mb-1">Title</label>
                      <input
                        {...register(`projects.${index}.title` as const)}
                        className="w-full bg-[#0A1628] border border-[#00D4FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7B8CA3] mb-1">Accent Color</label>
                      <input
                        {...register(`projects.${index}.color` as const)}
                        className="w-full bg-[#0A1628] border border-[#00D4FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-[#7B8CA3] mb-1">Description</label>
                      <textarea
                        {...register(`projects.${index}.description` as const)}
                        rows={2}
                        className="w-full bg-[#0A1628] border border-[#00D4FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7B8CA3] mb-1">Live URL</label>
                      <input
                        {...register(`projects.${index}.liveUrl` as const)}
                        className="w-full bg-[#0A1628] border border-[#00D4FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7B8CA3] mb-1">GitHub URL</label>
                      <input
                        {...register(`projects.${index}.githubUrl` as const)}
                        className="w-full bg-[#0A1628] border border-[#00D4FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Footer */}
          <div className="sticky bottom-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center gap-2 bg-[#00D4FF] text-[#050B15] px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-shadow"
            >
              <Save className="w-5 h-5" />
              Save Configuration
            </motion.button>
          </div>

        </form>
      </div>
    </div>
  );
}
