import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Newsreader, DM_Sans } from "next/font/google";
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
        url: "https://emmanuel-obi.vercel.app/avatar.png",
        width: 586,
        height: 588,
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
    images: ["https://emmanuel-obi.vercel.app/avatar.png"],
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

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
  adjustFontFallback: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans selection:bg-primary/15 selection:text-foreground">
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
