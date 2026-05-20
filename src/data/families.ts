import type { Family } from "@/lib/types";

export const FAMILIES: readonly Family[] = [
  { id: "open", label: "Juegos abiertos", subtitle: "1.e4 e5", roman: "I" },
  {
    id: "semi-open",
    label: "Semi-abiertas",
    subtitle: "1.e4 con otra respuesta",
    roman: "II",
  },
  { id: "closed", label: "Juegos cerrados", subtitle: "1.d4 d5", roman: "III" },
  { id: "indian", label: "Defensas indias", subtitle: "1.d4 Cf6", roman: "IV" },
  {
    id: "flank",
    label: "Aperturas de flanco",
    subtitle: "1.c4, 1.Cf3 y otras",
    roman: "V",
  },
] as const;

export const LIBRARY_FILTERS = [
  { id: "all", label: "Todas" },
  { id: "open", label: "Abiertas" },
  { id: "semi-open", label: "Semi-abiertas" },
  { id: "closed", label: "Cerradas" },
  { id: "indian", label: "Indias" },
  { id: "flank", label: "Flanco" },
] as const;

export type LibraryFilter = (typeof LIBRARY_FILTERS)[number]["id"];
