'use client';

import { create } from 'zustand';

export type ProjectType = 'landing' | 'ecommerce' | 'webapp' | 'mobile' | 'dashboard' | 'custom';

export interface ProjectScope {
  projectType: ProjectType | null;
  projectName: string;
  description: string;
}

export interface Feature {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
}

export type BudgetRange = '$1K - $5K' | '$5K - $15K' | '$15K - $50K' | '$50K+';
export type Timeline = '2-4 Weeks' | '1-3 Months' | '3-6 Months';

export interface ProjectDetails {
  budget: BudgetRange | null;
  timeline: Timeline | null;
  additionalNotes: string;
}

interface ProjectBuilderState {
  currentStep: number;
  direction: number;
  scope: ProjectScope;
  features: Feature[];
  details: ProjectDetails;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setProjectType: (type: ProjectType) => void;
  setProjectName: (name: string) => void;
  setDescription: (desc: string) => void;
  toggleFeature: (id: string) => void;
  setBudget: (budget: BudgetRange) => void;
  setTimeline: (timeline: Timeline) => void;
  setAdditionalNotes: (notes: string) => void;
  generateWhatsAppLink: () => string;
  resetForm: () => void;
}

const defaultFeatures: Feature[] = [
  { id: 'auth', label: 'Authentication', icon: 'Shield', selected: false },
  { id: 'payments', label: 'Payments', icon: 'CreditCard', selected: false },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', selected: false },
  { id: 'cms', label: 'CMS', icon: 'FileText', selected: false },
  { id: 'api', label: 'API Integration', icon: 'Plug', selected: false },
  { id: 'responsive', label: 'Responsive Design', icon: 'Smartphone', selected: false },
  { id: 'seo', label: 'SEO Optimization', icon: 'Search', selected: false },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', selected: false },
  { id: 'chat', label: 'Live Chat', icon: 'MessageSquare', selected: false },
  { id: 'social', label: 'Social Login', icon: 'Users', selected: false },
  { id: 'storage', label: 'Cloud Storage', icon: 'Cloud', selected: false },
  { id: 'ai', label: 'AI Features', icon: 'Sparkles', selected: false },
];

const initialScope: ProjectScope = {
  projectType: null,
  projectName: '',
  description: '',
};

const initialDetails: ProjectDetails = {
  budget: null,
  timeline: null,
  additionalNotes: '',
};

export const useProjectBuilderStore = create<ProjectBuilderState>((set, get) => ({
  currentStep: 1,
  direction: 1,
  scope: { ...initialScope },
  features: defaultFeatures.map((f) => ({ ...f })),
  details: { ...initialDetails },

  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3),
      direction: 1,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
      direction: -1,
    })),

  setProjectType: (type) =>
    set((state) => ({
      scope: { ...state.scope, projectType: type },
    })),

  setProjectName: (name) =>
    set((state) => ({
      scope: { ...state.scope, projectName: name },
    })),

  setDescription: (desc) =>
    set((state) => ({
      scope: { ...state.scope, description: desc },
    })),

  toggleFeature: (id) =>
    set((state) => ({
      features: state.features.map((f) =>
        f.id === id ? { ...f, selected: !f.selected } : f
      ),
    })),

  setBudget: (budget) =>
    set((state) => ({
      details: { ...state.details, budget },
    })),

  setTimeline: (timeline) =>
    set((state) => ({
      details: { ...state.details, timeline },
    })),

  setAdditionalNotes: (notes) =>
    set((state) => ({
      details: { ...state.details, additionalNotes: notes.slice(0, 500) },
    })),

  generateWhatsAppLink: () => {
    const { scope, features, details } = get();
    const selectedFeatures = features
      .filter((f) => f.selected)
      .map((f) => f.label)
      .join(', ');

    const message = [
      `🚀 *New Project Request*`,
      ``,
      `📋 *Project Type:* ${scope.projectType || 'Not specified'}`,
      `📝 *Project Name:* ${scope.projectName || 'Not specified'}`,
      `📄 *Description:* ${scope.description || 'Not provided'}`,
      ``,
      `⚡ *Features:* ${selectedFeatures || 'None selected'}`,
      ``,
      `💰 *Budget:* ${details.budget || 'Not specified'}`,
      `⏱️ *Timeline:* ${details.timeline || 'Not specified'}`,
      ``,
      `📝 *Additional Notes:* ${details.additionalNotes || 'None'}`,
    ].join('\n');

    const encoded = encodeURIComponent(message);
    return `https://wa.me/?text=${encoded}`;
  },

  resetForm: () =>
    set({
      currentStep: 1,
      direction: 1,
      scope: { ...initialScope },
      features: defaultFeatures.map((f) => ({ ...f })),
      details: { ...initialDetails },
    }),
}));
