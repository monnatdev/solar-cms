import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default SEO metadata for the site
export const metadata: Metadata = {
  title: {
    default: "Solar Cell CMS - โซลูชันโซล่าเซลล์ครบวงจร",
    template: "%s | Solar Cell CMS",
  },
  description:
    "ระบบจัดการเนื้อหาสำหรับธุรกิจโซล่าเซลล์ พร้อมเครื่องมือคำนวณความคุ้มค่า บริการติดตั้งโซล่าเซลล์คุณภาพสูง และคำปรึกษาด้านพลังงานทดแทน",
  keywords: [
    "โซล่าเซลล์",
    "solar cell",
    "พลังงานทดแทน",
    "renewable energy",
    "ติดตั้งโซล่าเซลล์",
    "solar installation",
    "คำนวณโซล่าเซลล์",
    "solar calculator",
  ],
  authors: [{ name: "Solar Cell CMS" }],
  creator: "Solar Cell CMS",
  publisher: "Solar Cell CMS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "/",
    siteName: "Solar Cell CMS",
    title: "Solar Cell CMS - โซลูชันโซล่าเซลล์ครบวงจร",
    description:
      "ระบบจัดการเนื้อหาสำหรับธุรกิจโซล่าเซลล์ พร้อมเครื่องมือคำนวณความคุ้มค่า บริการติดตั้งโซล่าเซลล์คุณภาพสูง",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Solar Cell CMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Cell CMS - โซลูชันโซล่าเซลล์ครบวงจร",
    description:
      "ระบบจัดการเนื้อหาสำหรับธุรกิจโซล่าเซลล์ พร้อมเครื่องมือคำนวณความคุ้มค่า",
    images: ["/og-image.jpg"],
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
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Semantic HTML structure with header, main, and footer elements */}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
