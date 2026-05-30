import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[]; // Array of image URLs
  color: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number | null; // null = contact us
  currency: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaLabel: string;
}

export type Theme = 'dark' | 'light';

export interface SiteState {
  agencyName: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  maintenanceMode: boolean;
  projects: Project[];
  pricingPlans: PricingPlan[];
  theme: Theme;

  aboutText: string;
  contactPhone: string;    // WhatsApp number (digits only, e.g. 962791234567)
  contactEmail: string;
  socialInstagram: string;
  socialLinkedin: string;

  // Actions
  setAgencyName: (name: string) => void;
  setHeroHeadlineLine1: (text: string) => void;
  setHeroHeadlineLine2: (text: string) => void;
  setHeroSubtitle: (text: string) => void;
  setMaintenanceMode: (isActive: boolean) => void;
  setTheme: (theme: Theme) => void;

  setAboutText: (text: string) => void;
  setContactPhone: (phone: string) => void;
  setContactEmail: (email: string) => void;
  setSocialInstagram: (url: string) => void;
  setSocialLinkedin: (url: string) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setProjects: (projects: Project[]) => void;

  setPricingPlans: (plans: PricingPlan[]) => void;
}

const defaultPricingPlans: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'Landing Page',
    price: 35,
    currency: 'JD',
    description: 'Perfect for showcasing your brand or product with a stunning single page.',
    features: [
      'Responsive design',
      'Up to 5 sections',
      'Contact form',
      'SEO optimized',
      '1 revision round',
      'Delivery in 3 days',
    ],
    isPopular: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'plan-2',
    name: 'Full Website',
    price: 80,
    currency: 'JD',
    description: 'A complete multi-page website with everything your business needs.',
    features: [
      'Up to 8 pages',
      'Responsive design',
      'Admin dashboard',
      'Contact & booking forms',
      'Blog/News section',
      '3 revision rounds',
      'Delivery in 7 days',
    ],
    isPopular: true,
    ctaLabel: 'Most Popular',
  },
  {
    id: 'plan-3',
    name: 'Online Store',
    price: 150,
    currency: 'JD',
    description: 'A full-featured e-commerce platform ready to sell your products online.',
    features: [
      'Unlimited products',
      'Payment gateway',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Analytics dashboard',
      'Delivery in 14 days',
    ],
    isPopular: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'plan-4',
    name: 'Custom Project',
    price: null,
    currency: 'JD',
    description: 'Have a unique idea? We build fully custom solutions tailored to your vision.',
    features: [
      'Mobile apps (Flutter)',
      'AI integrations',
      'Complex web apps',
      'API & backend systems',
      'Dedicated support',
      'Custom timeline',
    ],
    isPopular: false,
    ctaLabel: 'Contact Us',
  },
];

const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with AI-powered product recommendations, real-time inventory management, and seamless checkout integration.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    images: ['gradient:linear-gradient(135deg, #667eea 0%, #764ba2 100%)'],
    color: '#764ba2',
  },
  {
    id: 'proj-2',
    title: 'Healthcare Dashboard',
    description: 'Real-time patient monitoring dashboard with interactive visualizations, alert systems, and compliant data handling for medical staff.',
    tags: ['React', 'D3.js', 'Node.js'],
    images: ['gradient:linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'],
    color: '#f5576c',
  },
  {
    id: 'proj-3',
    title: 'Delivery Tracking App',
    description: 'Live GPS delivery tracking application with real-time map updates, push notifications, and route optimization.',
    tags: ['Flutter', 'Firebase', 'Maps'],
    images: ['gradient:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'],
    color: '#00f2fe',
  },
  {
    id: 'proj-4',
    title: 'AI Content Studio',
    description: 'AI-powered content generation platform for blog posts, social media copy, and marketing materials.',
    tags: ['Next.js', 'OpenAI', 'Prisma'],
    images: ['gradient:linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'],
    color: '#43e97b',
  },
  {
    id: 'proj-5',
    title: 'Financial Analytics',
    description: 'Investment portfolio tracker with real-time market data, interactive charts, and automated rebalancing suggestions.',
    tags: ['React', 'PostgreSQL', 'Charts'],
    images: ['gradient:linear-gradient(135deg, #fa709a 0%, #fee140 100%)'],
    color: '#fee140',
  },
  {
    id: 'proj-6',
    title: 'Social Media Platform',
    description: 'Real-time social networking app with WebSocket-powered live feeds, Redis-cached timelines, and media sharing.',
    tags: ['Next.js', 'WebSocket', 'Redis'],
    images: ['gradient:linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'],
    color: '#a18cd1',
  },
];

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      agencyName: 'Codev',
      heroHeadlineLine1: 'Transforming Vision into',
      heroHeadlineLine2: 'High-Performance Web Realities',
      heroSubtitle: 'We craft cutting-edge digital experiences with AI-powered development, modern frameworks, and enterprise-grade security.',
      maintenanceMode: false,
      theme: 'dark',
      aboutText: 'Transforming digital visions into high-performance realities with cutting-edge technology.',
      contactPhone: '962790000000',
      contactEmail: 'contact@codev.dev',
      socialInstagram: 'https://instagram.com/codev',
      socialLinkedin: 'https://linkedin.com/company/codev',
      projects: defaultProjects,
      pricingPlans: defaultPricingPlans,

      setAgencyName: (agencyName) => set({ agencyName }),
      setHeroHeadlineLine1: (heroHeadlineLine1) => set({ heroHeadlineLine1 }),
      setHeroHeadlineLine2: (heroHeadlineLine2) => set({ heroHeadlineLine2 }),
      setHeroSubtitle: (heroSubtitle) => set({ heroSubtitle }),
      setMaintenanceMode: (maintenanceMode) => set({ maintenanceMode }),
      setTheme: (theme) => set({ theme }),

      setAboutText: (aboutText) => set({ aboutText }),
      setContactPhone: (contactPhone) => set({ contactPhone }),
      setContactEmail: (contactEmail) => set({ contactEmail }),
      setSocialInstagram: (socialInstagram) => set({ socialInstagram }),
      setSocialLinkedin: (socialLinkedin) => set({ socialLinkedin }),

      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updatedProject } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
      setProjects: (projects) => set({ projects }),

      setPricingPlans: (pricingPlans) => set({ pricingPlans }),
    }),
    {
      name: 'codev-site-storage',
    }
  )
);
