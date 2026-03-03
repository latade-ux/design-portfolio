import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://latade.design";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Latade — Senior Product Designer",
    template: "%s | Latade",
  },
  description:
    "Senior Product Designer specializing in AI-powered workflows, enterprise SaaS, and data visualization. 7+ years designing systems that turn complexity into clarity.",
  keywords: [
    "Product Designer",
    "Senior Product Designer",
    "AI Workflows",
    "Enterprise SaaS",
    "Design Systems",
    "Data Visualization",
    "UX Design",
  ],
  authors: [{ name: "Latade", url: siteUrl }],
  creator: "Latade",
  openGraph: {
    title: "Latade — Senior Product Designer",
    description:
      "Designing AI-powered systems that turn complexity into clarity.",
    url: siteUrl,
    siteName: "Latade — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latade — Senior Product Designer",
    description:
      "Designing AI-powered systems that turn complexity into clarity.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
