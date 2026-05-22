/**
 * Bespoke inline SVG icon set — 1.7px stroke, round caps/joins, currentColor.
 *
 * Per the design handoff we deliberately do NOT use an icon library. To add a
 * new icon, register it here so the visual weight stays consistent.
 */
export type IconName =
  | "search"
  | "menu"
  | "back"
  | "chevron-right"
  | "share"
  | "arrow-right"
  | "home"
  | "book"
  | "target"
  | "prev"
  | "next"
  | "reset"
  | "play"
  | "pause"
  | "puzzle";

interface Props {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 18, strokeWidth = 1.7 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} strokeWidth={2}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case "back":
      return (
        <svg {...common}>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common} strokeWidth={1.5}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
          <path d="M12 3v13M7 8l5-5 5 5" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common} strokeWidth={2}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9h14v-9" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5v-15z" />
          <path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "prev":
      return (
        <svg {...common} strokeWidth={2}>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      );
    case "next":
      return (
        <svg {...common} strokeWidth={2}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "reset":
      return (
        <svg {...common} strokeWidth={2}>
          <path d="M19 5v14M16 5l-9 7 9 7" />
        </svg>
      );
    case "play":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 5v14l12-7z" />
        </svg>
      );
    case "pause":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" />
          <rect x="14" y="5" width="4" height="14" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...common}>
          <path d="M9 3h6v3a1.5 1.5 0 0 0 3 0V3h3v6h-3a1.5 1.5 0 0 0 0 3h3v6h-3v-3a1.5 1.5 0 0 0-3 0v3H9v-3a1.5 1.5 0 0 0-3 0v3H3v-6h3a1.5 1.5 0 0 0 0-3H3V3h3v3a1.5 1.5 0 0 0 3 0V3z" />
        </svg>
      );
  }
}
