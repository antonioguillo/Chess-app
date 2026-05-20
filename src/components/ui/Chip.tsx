"use client";

import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  tone?: "default" | "copper";
}

const PALETTES = {
  default: {
    bg: "rgba(241,234,215,0.04)",
    bd: "rgba(241,234,215,0.10)",
    fg: "var(--ink-2)",
  },
  active: {
    bg: "rgba(199,155,101,0.16)",
    bd: "rgba(199,155,101,0.45)",
    fg: "var(--gold)",
  },
  copper: {
    bg: "rgba(199,155,101,0.10)",
    bd: "rgba(199,155,101,0.28)",
    fg: "var(--copper)",
  },
} as const;

export function Chip({ children, active, onClick, tone = "default" }: Props) {
  const p = active ? PALETTES.active : PALETTES[tone];
  const style: CSSProperties = {
    padding: "6px 11px",
    borderRadius: 999,
    background: p.bg,
    border: `1px solid ${p.bd}`,
    color: p.fg,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.3,
    cursor: onClick ? "pointer" : "default",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--sans)",
    whiteSpace: "nowrap",
  };
  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
