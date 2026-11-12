import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SITE_NAME } from "@/lib/constants";

const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
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
    icon: [{ url: "/images/brand/logo-mark.png", type: "image/png" }],
    apple: [{ url: "/images/brand/logo-mark.png", type: "image/png", sizes: "180x180" }],
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
