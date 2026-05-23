import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  color: string;
}

export interface SiteState {
  agencyName: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  maintenanceMode: boolean;
  projects: Project[];
  
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  socialGithub: string;
  socialLinkedin: string;
  
  // Actions
  setAgencyName: (name: string) => void;
  setHeroHeadlineLine1: (text: string) => void;
  setHeroHeadlineLine2: (text: string) => void;
  setHeroSubtitle: (text: string) => void;
  setMaintenanceMode: (isActive: boolean) => void;
  
  setAboutText: (text: string) => void;
  setContactPhone: (phone: string) => void;
  setContactEmail: (email: string) => void;
  setSocialGithub: (url: string) => void;
  setSocialLinkedin: (url: string) => void;
  
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setProjects: (projects: Project[]) => void;
}

const defaultProjects: Project[] = [
  {
    id: "proj-1",
    title: "E-Commerce Platform",
    description: "A full-featured online store with AI-powered product recommendations, real-time inventory management, and seamless Stripe checkout integration.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    liveUrl: "https://ecommerce-platform.vercel.app",
    githubUrl: "https://github.com/websight/ecommerce-platform",
    imageUrl: "gradient:linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#764ba2",
  },
  {
    id: "proj-2",
    title: "Healthcare Dashboard",
    description: "Real-time patient monitoring dashboard with interactive D3.js visualizations, alert systems, and HIPAA-compliant data handling for medical staff.",
    tags: ["React", "D3.js", "Node.js"],
    liveUrl: "https://health-dashboard.vercel.app",
    githubUrl: "https://github.com/websight/health-dashboard",
    imageUrl: "gradient:linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#f5576c",
  },
  {
    id: "proj-3",
    title: "Delivery Tracking App",
    description: "Live GPS delivery tracking application with real-time map updates, push notifications, route optimization, and driver performance analytics.",
    tags: ["Flutter", "Firebase", "Maps"],
    liveUrl: "https://delivery-tracker.vercel.app",
    githubUrl: "https://github.com/websight/delivery-tracker",
    imageUrl: "gradient:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#00f2fe",
  },
  {
    id: "proj-4",
    title: "AI Content Studio",
    description: "AI-powered content generation platform leveraging OpenAI GPT models for blog posts, social media copy, and marketing materials with brand voice training.",
    tags: ["Next.js", "OpenAI", "Prisma"],
    liveUrl: "https://ai-content-studio.vercel.app",
    githubUrl: "https://github.com/websight/ai-content-studio",
    imageUrl: "gradient:linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    color: "#43e97b",
  },
  {
    id: "proj-5",
    title: "Financial Analytics",
    description: "Investment portfolio tracker with real-time market data, interactive charts, risk assessment tools, and automated rebalancing suggestions.",
    tags: ["React", "PostgreSQL", "Charts"],
    liveUrl: "https://financial-analytics.vercel.app",
    githubUrl: "https://github.com/websight/financial-analytics",
    imageUrl: "gradient:linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    color: "#fee140",
  },
  {
    id: "proj-6",
    title: "Social Media Platform",
    description: "Real-time social networking app with WebSocket-powered live feeds, Redis-cached timelines, media sharing, and intelligent content moderation.",
    tags: ["Next.js", "WebSocket", "Redis"],
    liveUrl: "https://social-platform.vercel.app",
    githubUrl: "https://github.com/websight/social-platform",
    imageUrl: "gradient:linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    color: "#a18cd1",
  },
];

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      agencyName: 'Web Sight',
      heroHeadlineLine1: 'Transforming Vision into',
      heroHeadlineLine2: 'High-Performance Web Realities',
      heroSubtitle: 'We craft cutting-edge digital experiences with AI-powered development, modern frameworks, and enterprise-grade security.',
      maintenanceMode: false,
      aboutText: 'Transforming digital visions into high-performance realities with cutting-edge technology.',
      contactPhone: '+966 000 000 000',
      contactEmail: 'contact@websight.dev',
      socialGithub: 'https://github.com/websight',
      socialLinkedin: 'https://linkedin.com/company/websight',
      projects: defaultProjects,

      setAgencyName: (agencyName) => set({ agencyName }),
      setHeroHeadlineLine1: (heroHeadlineLine1) => set({ heroHeadlineLine1 }),
      setHeroHeadlineLine2: (heroHeadlineLine2) => set({ heroHeadlineLine2 }),
      setHeroSubtitle: (heroSubtitle) => set({ heroSubtitle }),
      setMaintenanceMode: (maintenanceMode) => set({ maintenanceMode }),
      
      setAboutText: (aboutText) => set({ aboutText }),
      setContactPhone: (contactPhone) => set({ contactPhone }),
      setContactEmail: (contactEmail) => set({ contactEmail }),
      setSocialGithub: (socialGithub) => set({ socialGithub }),
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
    }),
    {
      name: 'web-sight-site-storage',
    }
  )
);
