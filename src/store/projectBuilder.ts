import { create } from 'zustand';

interface ProjectBuilderState {
  currentStep: number;
  projectType: string;
  features: string[];
  notes: string;
  timeline: string;
  setStep: (step: number) => void;
  setProjectType: (type: string) => void;
  toggleFeature: (feature: string) => void;
  setNotes: (notes: string) => void;
  setTimeline: (timeline: string) => void;
  reset: () => void;
  generateWhatsAppLink: () => string;
}

export const useProjectBuilderStore = create<ProjectBuilderState>((set, get) => ({
  currentStep: 1,
  projectType: '',
  features: [],
  notes: '',
  timeline: '',

  setStep: (step) => set({ currentStep: step }),

  setProjectType: (type) => set({ projectType: type }),

  toggleFeature: (feature) =>
    set((state) => ({
      features: state.features.includes(feature)
        ? state.features.filter((f) => f !== feature)
        : [...state.features, feature],
    })),

  setNotes: (notes) => set({ notes }),

  setTimeline: (timeline) => set({ timeline }),

  reset: () =>
    set({
      currentStep: 1,
      projectType: '',
      features: [],
      notes: '',
      timeline: '',
    }),

  generateWhatsAppLink: () => {
    const { projectType, features, notes, timeline } = get();

    const projectTypeLabels: Record<string, string> = {
      'e-commerce': 'E-Commerce Platform',
      'web-app': 'Custom Web Application',
      'intermediary': 'Intermediary Platform',
      'delivery': 'Delivery Application',
    };

    const featureList =
      features.length > 0
        ? features.map((f) => `• ${f}`).join('\n')
        : '• None selected';

    const message = [
      '🚀 *New Project Inquiry - Web Sight*',
      '',
      `📋 *Project Type:* ${projectTypeLabels[projectType] || projectType || 'Not specified'}`,
      '',
      '✨ *Features Needed:*',
      featureList,
      '',
      `⏰ *Timeline:* ${timeline || 'Not specified'}`,
      '',
      '📝 *Additional Notes:*',
      notes || 'No additional notes',
      '',
      '---',
      'Sent via Web Sight Project Builder',
    ].join('\n');

    const encoded = encodeURIComponent(message);
    // Replace XXXXXXXXX with contactPhone from siteStore if possible, but for now just use the existing one or placeholder
    return `https://wa.me/966XXXXXXXXX?text=${encoded}`;
  },
}));

// Also export with the old name for backwards compatibility
export const useProjectBuilder = useProjectBuilderStore;
