/** Dígitos com código do país, sem espaços ou símbolos (Brasil +55). */
export const FALLBACK_WHATSAPP_PHONE = "5563999999999";

export const SITE_NAME = "Jalapão Gaviões do Cerrado";

export const CONTACT_EMAIL_FALLBACK =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@jalapaogavioes.example";

export function getProductionBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gavioesdocerrado.example";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
