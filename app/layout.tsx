import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SITE_NAME } from "@/lib/constants";

const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const fontDisplay = Outfit({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#152238",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="pt"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body className="min-h-screen bg-brand-cream font-sans antialiased text-brand-earth">
        {children}
      </body>
    </html>
  );
}
