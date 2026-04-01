import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "../styles/globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meet prerna | Artist & Creator based in Mumbai",
  description: "meet prerna — Artist & Creator based in Mumbai. Tattoo, illustration, painting, wall art, vitiligo art, and permanent art. Custom commissions. By appointment.",
  keywords: ["artist mumbai", "custom tattoo india", "vitiligo art", "meet prerna"],
};

import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-lato">
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
