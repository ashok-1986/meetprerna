import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "../styles/globals.css";

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
  title: "meet prerna | Custom Tattoo Artist in Mumbai",
  description: "Meaningful custom tattoos that translate your story into permanent art. Based in Mumbai. Appointments only.",
  keywords: ["tattoo artist mumbai", "custom tattoo india", "meet prerna"],
};

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
      <body className="min-h-full flex flex-col font-lato">{children}</body>
    </html>
  );
}
