import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutGuard from "@/components/ClientLayoutGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Sight | Professional & Interactive Web Solutions",
  description:
    "Transforming vision into high-performance web realities. We craft cutting-edge digital experiences with AI-powered development, modern frameworks, and enterprise-grade security.",
  keywords: [
    "web development",
    "Next.js",
    "React",
    "AI development",
    "web agency",
    "full-stack development",
    "e-commerce",
    "custom web apps",
    "Flutter",
    "Node.js",
  ],
  authors: [{ name: "Web Sight" }],
  openGraph: {
    title: "Web Sight | Professional & Interactive Web Solutions",
    description:
      "Transforming vision into high-performance web realities with cutting-edge technology.",
    type: "website",
    locale: "en_US",
    siteName: "Web Sight",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Sight | Professional & Interactive Web Solutions",
    description:
      "Transforming vision into high-performance web realities with cutting-edge technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050B15] text-[#E0F7FA]">
        <ClientLayoutGuard>
          {children}
        </ClientLayoutGuard>
      </body>
    </html>
  );
}
