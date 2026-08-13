import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Urbanist, JetBrains_Mono, Libre_Baskerville } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--next-font-display",
});

const urbanist = Urbanist({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--next-font-body",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--next-font-mono",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--next-font-quote",
});

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import DynamicWebGL from "@/components/DynamicWebGL";
import { getShaders } from "@/lib/shaderParser";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "MeetPrerna | Mumbai Tattoo Artist",
  description: "Art that ages beautifully. Specializing in fine-line botanicals, neo-traditional, and original canvas works in Mumbai.",
  metadataBase: new URL("https://meetprerna.com"),
  keywords: ["Tattoo Artist", "Mumbai", "Fine Line Tattoo", "Botanical Tattoo", "Prerna"],
  openGraph: {
    title: "MeetPrerna | Mumbai Tattoo Artist",
    description: "Art that ages beautifully.",
    url: "https://meetprerna.com",
    siteName: "MeetPrerna",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetPrerna | Mumbai Tattoo Artist",
    description: "Art that ages beautifully.",
  },
};

export const viewport: import("next").Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read shaders on the server at build/render time
  const { vertex, fragment } = getShaders();

  return (
    <html lang="en" className={`${cormorant.variable} ${urbanist.variable} ${jetbrainsMono.variable} ${libreBaskerville.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-ink text-ivory overflow-x-hidden relative" suppressHydrationWarning>
        {/* WebGL Background */}
        <DynamicWebGL vertexShader={vertex} fragmentShader={fragment} />
        <div className="fixed inset-0 pointer-events-none ambient-noise" />
        <Preloader />
        <Header />
        <main className="w-full flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
