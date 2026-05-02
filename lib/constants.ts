/** Dígitos com código do país, sem espaços ou símbolos (Brasil +55). */
export const FALLBACK_WHATSAPP_PHONE = "5563991187274";

export const SITE_NAME = "Jalapão Gaviões do Cerrado";

export const CONTACT_EMAIL_FALLBACK =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@jalapaogavioes.example";

export function getProductionBaseUrl(): string {
  const fallback = "https://www.gavioesdocerrado.example";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return fallback;
  }
  try {
    const parsed = new URL(raw);
    const href = parsed.href.replace(/\/$/, "");
    return href || fallback;
  } catch {
    return fallback;
  }
}
