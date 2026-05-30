import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutGuard from "@/components/ClientLayoutGuard";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codev | Modern Web Development Agency",
  description:
    "Codev crafts cutting-edge digital experiences — landing pages, full websites, online stores, and custom web apps. Fast delivery, competitive pricing, professional results.",
  keywords: [
    "web development",
    "web agency",
    "Next.js",
    "React",
    "landing page",
    "online store",
    "e-commerce",
    "full-stack development",
    "custom web apps",
    "Flutter",
    "Node.js",
    "Codev",
    "Jordan web agency",
  ],
  authors: [{ name: "Codev" }],
  openGraph: {
    title: "Codev | Modern Web Development Agency",
    description:
      "Transforming vision into high-performance web realities with cutting-edge technology.",
    type: "website",
    locale: "en_US",
    siteName: "Codev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codev | Modern Web Development Agency",
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
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ClientLayoutGuard>
            {children}
          </ClientLayoutGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
