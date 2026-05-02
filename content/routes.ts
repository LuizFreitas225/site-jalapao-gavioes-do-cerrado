/**
 * Imagens esperadas em /public após cópia dos ativos — ver README ou scripts.
 */
export type RouteId = "jalapao" | "chapada-mesas" | "serra-gerais";

export type RouteContent = {
  id: RouteId;
  durationsKey: string;
  highlightsKeys: readonly string[];
  coverImage: string;
  pdfHref?: string;
};

export const routes: readonly RouteContent[] = [
  {
    id: "jalapao",
    durationsKey: "durations.threeFive",
    highlightsKeys: ["hFervedouros", "hDunas", "hMico"],
    coverImage: "/images/routes/jalapao-cover.jpg",
    pdfHref: undefined,
  },
  {
    id: "chapada-mesas",
    durationsKey: "durations.fourFive",
    highlightsKeys: ["hCanyon", "hCachoeiras", "hHistoria"],
    coverImage: "/images/routes/chapada-cover.jpg",
    pdfHref: "/downloads/roteiro-chapada-mesas-5-dias.pdf",
  },
  {
    id: "serra-gerais",
    durationsKey: "durations.threeSeven",
    highlightsKeys: ["hQuilombos", "hTrilhas", "hRio"],
    coverImage: "/images/routes/serra-gerais-cover.jpg",
    pdfHref: undefined,
  },
] as const;
