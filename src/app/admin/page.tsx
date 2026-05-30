'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Shield, Save, AlertTriangle, Plus, Trash2, LogOut,
  MessageCircle, Globe, Link2, Star, Image as ImageIcon,
} from 'lucide-react';
import { useSiteStore, Project, PricingPlan } from '@/store/siteStore';
import { useRouter } from 'next/navigation';

interface AdminFormValues {
  agencyName: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  socialInstagram: string;
  socialLinkedin: string;
  projects: Project[];
  pricingPlans: PricingPlan[];
}

const inputClass =
  'w-full bg-[#050B15] border border-[#00D4FF]/20 rounded-lg px-4 py-3 text-[#E0F7FA] focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-[#3A5068]';

const smallInputClass =
  'w-full bg-[#0A1628] border border-[#00D4FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00D4FF] text-[#E0F7FA] placeholder:text-[#3A5068]';

const labelClass = 'block text-sm font-medium text-[#7B8CA3] mb-2';
const smallLabelClass = 'block text-xs text-[#7B8CA3] mb-1';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
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
      socialInstagram: '',
      socialLinkedin: '',
      projects: [],
      pricingPlans: [],
    },
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: 'projects' });

  const {
    fields: planFields,
    append: appendPlan,
    remove: removePlan,
  } = useFieldArray({ control, name: 'pricingPlans' });

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
      socialInstagram: store.socialInstagram,
      socialLinkedin: store.socialLinkedin,
      projects: store.projects,
      pricingPlans: store.pricingPlans,
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
    store.setSocialInstagram(data.socialInstagram);
    store.setSocialLinkedin(data.socialLinkedin);
    store.setProjects(data.projects);
    store.setPricingPlans(data.pricingPlans);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleMaintenanceToggle = () => {
    const confirmMessage = store.maintenanceMode
      ? 'Are you sure you want to turn OFF maintenance mode?'
      : 'WARNING: This will block all public access! Enable Maintenance Mode?';
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
    images: [],
    color: '#00D4FF',
  });

  const createEmptyPlan = (): PricingPlan => ({
    id: `plan-${Date.now()}`,
    name: '',
    price: 0,
    currency: 'JD',
    description: '',
    features: [],
    isPopular: false,
    ctaLabel: 'Get Started',
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
              <h1 className="text-3xl font-black tracking-tight">
                <span className="text-white">Co</span>
                <span className="text-[#00D4FF]">dev</span>
                <span className="text-[#7B8CA3] text-xl font-normal ml-2">Admin</span>
              </h1>
              <p className="text-[#7B8CA3] text-sm">Manage site content and configuration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

          {/* ═══ Global & Contact Settings ═══ */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-[#00D4FF]/10 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
              Global & Contact Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Agency Name</label>
                <input {...register('agencyName')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>
                  <MessageCircle className="inline w-4 h-4 mr-1 text-[#25D366]" />
                  WhatsApp Number (digits only, e.g. 962791234567)
                </label>
                <input {...register('contactPhone')} className={inputClass} placeholder="962791234567" />
              </div>
              <div>
                <label className={labelClass}>Contact Email</label>
                <input {...register('contactEmail')} type="email" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>
                <Globe className="inline w-4 h-4 mr-1 text-pink-400" />
                Instagram URL
              </label>
                <input {...register('socialInstagram')} className={inputClass} placeholder="https://instagram.com/yourpage" />
              </div>
              <div>
                <label className={labelClass}>
                <Link2 className="inline w-4 h-4 mr-1 text-blue-400" />
                LinkedIn URL
              </label>
                <input {...register('socialLinkedin')} className={inputClass} placeholder="https://linkedin.com/company/yourpage" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>About Section Text</label>
                <textarea
                  {...register('aboutText')}
                  rows={3}
                  className={inputClass + ' resize-none'}
                />
              </div>
            </div>
          </section>

          {/* ═══ Hero Section ═══ */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-[#00D4FF]/10 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Headline (Line 1)</label>
                <input {...register('heroHeadlineLine1')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Headline (Line 2 - Gradient)</label>
                <input {...register('heroHeadlineLine2')} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Subtitle</label>
                <textarea
                  {...register('heroSubtitle')}
                  rows={3}
                  className={inputClass + ' resize-none'}
                />
              </div>
            </div>
          </section>

          {/* ═══ Pricing Plans ═══ */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-[#00D4FF]/10 pb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                Pricing Plans
              </h2>
              <button
                type="button"
                onClick={() => appendPlan(createEmptyPlan())}
                className="flex items-center gap-2 bg-[#00D4FF]/10 text-[#00D4FF] hover:bg-[#00D4FF]/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Plan
              </button>
            </div>

            <div className="space-y-6">
              {planFields.map((field, index) => (
                <div key={field.id} className="relative bg-[#050B15] border border-[#00D4FF]/10 p-6 rounded-xl">
                  <button
                    type="button"
                    onClick={() => removePlan(index)}
                    className="absolute top-4 right-4 text-[#7B8CA3] hover:text-[#E11D48] transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-[#00D4FF] mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Plan {index + 1}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className={smallLabelClass}>Plan Name</label>
                      <input {...register(`pricingPlans.${index}.name`)} className={smallInputClass} placeholder="Landing Page" />
                    </div>
                    <div>
                      <label className={smallLabelClass}>Price (leave 0 for Custom)</label>
                      <input {...register(`pricingPlans.${index}.price`, { valueAsNumber: true })} type="number" className={smallInputClass} placeholder="35" />
                    </div>
                    <div>
                      <label className={smallLabelClass}>Currency</label>
                      <input {...register(`pricingPlans.${index}.currency`)} className={smallInputClass} placeholder="JD" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={smallLabelClass}>CTA Button Label</label>
                      <input {...register(`pricingPlans.${index}.ctaLabel`)} className={smallInputClass} placeholder="Get Started" />
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                      <input
                        type="checkbox"
                        id={`popular-${index}`}
                        {...register(`pricingPlans.${index}.isPopular`)}
                        className="w-4 h-4 accent-[#00D4FF]"
                      />
                      <label htmlFor={`popular-${index}`} className="text-sm text-[#7B8CA3] cursor-pointer">
                        Mark as Most Popular
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className={smallLabelClass}>Description</label>
                    <textarea
                      {...register(`pricingPlans.${index}.description`)}
                      rows={2}
                      className={smallInputClass + ' resize-none'}
                    />
                  </div>

                  <div>
                    <label className={smallLabelClass}>Features (one per line)</label>
                    <textarea
                      rows={4}
                      className={smallInputClass + ' resize-none'}
                      placeholder="Responsive design&#10;Up to 5 sections&#10;SEO optimized"
                      defaultValue={field.features?.join('\n') ?? ''}
                      onChange={(e) => {
                        const val = e.target.value.split('\n').filter(Boolean);
                        // We'll handle this through a controlled approach
                        (e.target as HTMLTextAreaElement).dataset.features = JSON.stringify(val);
                      }}
                      onBlur={(e) => {
                        const val = e.target.value.split('\n').filter(Boolean);
                        // Update via hidden input trick
                        const hiddenInput = e.target.closest('.relative')?.querySelector(`[data-feature-input="${index}"]`) as HTMLInputElement;
                        if (hiddenInput) hiddenInput.value = JSON.stringify(val);
                      }}
                    />
                    {/* Hidden input to hold features array */}
                    <input
                      type="hidden"
                      data-feature-input={index}
                      {...register(`pricingPlans.${index}.features`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ Projects Management ═══ */}
          <section className="bg-[#0A1628] rounded-2xl border border-[#00D4FF]/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-[#00D4FF]/10 pb-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                Our Work / Projects
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
                <div key={field.id} className="relative bg-[#050B15] border border-[#00D4FF]/10 p-6 rounded-xl">
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
                      <label className={smallLabelClass}>Title</label>
                      <input {...register(`projects.${index}.title`)} className={smallInputClass} />
                    </div>
                    <div>
                      <label className={smallLabelClass}>Accent Color (hex)</label>
                      <input {...register(`projects.${index}.color`)} className={smallInputClass} placeholder="#00D4FF" />
                    </div>
                    <div className="md:col-span-2">
                      <label className={smallLabelClass}>Description</label>
                      <textarea
                        {...register(`projects.${index}.description`)}
                        rows={2}
                        className={smallInputClass + ' resize-none'}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={smallLabelClass}>Tags (comma separated)</label>
                      <input
                        {...register(`projects.${index}.tags`)}
                        className={smallInputClass}
                        placeholder="React, Next.js, Tailwind"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={smallLabelClass}>
                        <ImageIcon className="inline w-4 h-4 mr-1 text-[#00D4FF]" />
                        Project Images (one URL per line)
                      </label>
                      <p className="text-[10px] text-[#4A5568] mb-2">
                        Enter image URLs (from Cloudinary, Imgur, etc.) or use gradient: prefix for placeholder.
                        Example: gradient:linear-gradient(135deg, #667eea 0%, #764ba2 100%)
                      </p>
                      <textarea
                        rows={4}
                        className={smallInputClass + ' resize-none font-mono text-xs'}
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                        defaultValue={field.images?.join('\n') ?? ''}
                        {...register(`projects.${index}.images`)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <div className="sticky bottom-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              id="admin-save-btn"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              style={{
                background: saved ? '#10B981' : '#00D4FF',
                color: '#050B15',
                boxShadow: saved
                  ? '0 0 20px rgba(16,185,129,0.4)'
                  : '0 0 20px rgba(0,212,255,0.3)',
              }}
            >
              <Save className="w-5 h-5" />
              {saved ? '✓ Saved!' : 'Save Configuration'}
            </motion.button>
          </div>

        </form>
      </div>
    </div>
  );
}
