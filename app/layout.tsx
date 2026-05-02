import type { ReactNode } from "react";

/**
 * Wrapper raiz mínimo. Tag html/body e lang ficam em [locale]/layout (padrão next-intl starter).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
