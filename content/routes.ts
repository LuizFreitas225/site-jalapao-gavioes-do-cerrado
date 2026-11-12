/**
 * Imagens esperadas em /public após cópia dos ativos — ver README ou scripts.
 */
export type RouteId = "jalapao" | "chapada-mesas" | "serra-gerais";

export type RouteContent = {
  id: RouteId;
  durationsKey: string;
  coverImage: string;
  pdfHref?: string;
};

export const routes: readonly RouteContent[] = [
  {
    id: "jalapao",
    durationsKey: "durations.twoSix",
    coverImage: "/images/routes/jalapao-cover.jpg",
    pdfHref: "/downloads/roteiro-jalapao-completo.pdf",
  },
  {
    id: "chapada-mesas",
    durationsKey: "durations.fourFive",
    coverImage: "/images/routes/chapada-cover.jpg",
    pdfHref: "/downloads/roteiro-chapada-mesas-completo.pdf",
  },
  {
    id: "serra-gerais",
    durationsKey: "durations.threeSeven",
    coverImage: "/images/routes/serra-gerais-cover.jpg",
    pdfHref: "/downloads/roteiro-serra-gerais-completo.pdf",
  },
] as const;
