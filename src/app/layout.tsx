import type { Metadata, Viewport } from "next";

import "./globals.css";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { clashDisplay, inter } from "@/lib/fonts";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Wedding & Event Catering in Pune`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  keywords: [
    "catering services Pune",
    "wedding caterers Pune",
    "mangalkarya catering",
    "vastu shanti catering Pune",
    "Maharashtrian catering",
    "corporate catering Pune",
    "veg caterers Pune",
    "Jain catering Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Wedding & Event Catering in Pune`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Wedding & Event Catering in Pune`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Food & Catering",
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${clashDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-saffron focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to main content
        </a>

        <div className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>

        <MobileCtaBar />

        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
