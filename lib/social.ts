/** Fallback quando NEXT_PUBLIC_* não está no .env (mesmo valor do .env.example). */
const DEFAULT_INSTAGRAM_URL =
  "https://www.instagram.com/jalapaogavioesdocerrado/";

const DEFAULT_TRIPADVISOR_URL =
  "https://www.tripadvisor.pt/ShowUserReviews-g2572347-d23042366-r1028254147-Jalapao_Gavioes_do_Cerrado-Ponte_Alta_do_Tocantins_State_of_Tocantins.html";

/** URL do perfil Instagram (página completa). */
export function instagramProfileUrl(): string | null {
  const raw =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || DEFAULT_INSTAGRAM_URL;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

/** URL da página no Tripadvisor (perfil, avaliações, etc.). */
export function tripAdvisorProfileUrl(): string | null {
  const raw =
    process.env.NEXT_PUBLIC_TRIPADVISOR_URL?.trim() ||
    DEFAULT_TRIPADVISOR_URL;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}
