import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Visma - Free Prisma Schema Visualizer | Database Diagram Tool",
    template: "%s | Visma",
  },
  description:
    "Visualize your Prisma database schemas as beautiful, interactive diagrams. Free online tool to generate ER diagrams, understand database relationships, and create database documentation. No signup required.",
  keywords: [
    "Prisma visualizer",
    "database diagram tool",
    "ER diagram generator",
    "schema visualization",
    "Prisma schema viewer",
    "database relationship mapper",
    "free diagram tool",
    "online database designer",
    "Prisma ORM visualizer",
    "database schema generator",
    "Prisma ERD",
    "Prisma schema diagram",
    "visualize Prisma schema",
    "database visualization tool",
    "entity relationship diagram",
    "database design tool",
    "Prisma model visualizer",
    "database structure viewer",
    "schema diagram generator",
    "Prisma database diagram",
  ],
  authors: [{ name: "Mohammad Faizan", url: "https://mohammadfaizan.com" }],
  creator: "Mohammad Faizan",
  publisher: "Mohammad Faizan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://visma-main.vercel.app/"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://visma-main.vercel.app/", // Update with your actual domain
    siteName: "Visma - Prisma Schema Visualizer",
    title: "Visma - Free Prisma Schema Visualizer | Database Diagram Tool",
    description:
      "Visualize your Prisma database schemas as beautiful, interactive diagrams. Free online tool to generate ER diagrams and understand database relationships.",
    images: [
      {
        url: "https://flavortown.hackclub.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Njc0NTYsInB1ciI6ImJsb2JfaWQifX0=--2721e7d956a5ab11f8a7bb08523d942ce836341a/ChatGPT%20Image%20Jan%2015,%202026,%2010_44_44%20PM.png",
        width: 1200,
        height: 630,
        alt: "Visma - Prisma Schema Visualizer showing interactive database diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visma - Free Prisma Schema Visualizer | Database Diagram Tool",
    description:
      "Visualize your Prisma database schemas as beautiful, interactive diagrams. Free online tool to generate ER diagrams.",
    images: [
      "https://flavortown.hackclub.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Njc0NTYsInB1ciI6ImJsb2JfaWQifX0=--2721e7d956a5ab11f8a7bb08523d942ce836341a/ChatGPT%20Image%20Jan%2015,%202026,%2010_44_44%20PM.png",
    ],
    creator: "@curiousfaizaan", // Update with your Twitter handle if available
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "developer tools",
  classification: "Developer Tool",
  applicationName: "Visma",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Visma - Prisma Schema Visualizer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to visualize Prisma database schemas as interactive diagrams. Generate ER diagrams and understand database relationships.",
    url: "https://visma-main.vercel.app", // Update with your actual domain
    author: {
      "@type": "Person",
      name: "Mohammad Faizan",
      url: "https://mohammadfaizan.com",
    },
    featureList: [
      "Prisma schema visualization",
      "Interactive database diagrams",
      "ER diagram generation",
      "Real-time schema validation",
      "Relationship mapping",
      "Export diagrams",
    ],
    keywords:
      "Prisma visualizer, database diagram tool, ER diagram generator, schema visualization, Prisma schema viewer",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-[#1e1e1e]`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
