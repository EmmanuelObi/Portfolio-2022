import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Raleway } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Emmanuel Obi | Senior Engineer & AI Researcher",
  description:
    "Builder at heart with a strong track record of shipping user-centric products and driving growth through onboarding, activation, and retention improvements. Led AI-powered initiatives that 60× onboarding speed and delivered $2M+ in recovered revenue.",
  keywords: [
    "Emmanuel Obi",
    "Software Engineer",
    "Product Growth",
    "TypeScript",
    "React",
    "Angular",
    "Node.js",
    "AWS",
    "AI/ML",
    "Fintech",
    "Researcher",
  ],
  authors: [{ name: "Emmanuel Obi" }],
  creator: "Emmanuel Obi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emmanuel-obi.vercel.app",
    title: "Emmanuel Obi | Senior Software Engineer - Product Growth",
    description:
      "Builder at heart with a strong track record of shipping user-centric products and driving growth. Led AI-powered initiatives that 60× onboarding speed and delivered $2M+ in recovered revenue.",
    siteName: "Emmanuel Obi Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/63916312?v=4",
        width: 1200,
        height: 630,
        alt: "Emmanuel Obi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Obi | Senior Software Engineer - Product Growth",
    description:
      "Builder at heart driving product growth through AI-powered initiatives and user-centric development.",
    creator: "@kolikothe1st",
    images: ["https://avatars.githubusercontent.com/u/63916312?v=4"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${raleway.className}`}>
      <body className="min-h-screen selection:bg-primary/20 selection:text-primary">
        <div className="relative">
          {children}
          <ThemeToggle />
          <ChatWidget />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
