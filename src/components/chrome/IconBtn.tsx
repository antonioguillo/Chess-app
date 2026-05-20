"use client";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  ariaLabel?: string;
}

export function IconBtn({ children, onClick, active, ariaLabel }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 34,
        height: 34,
        borderRadius: 17,
        background: active ? "rgba(199,155,101,0.14)" : "transparent",
        border: `1px solid ${
          active ? "rgba(199,155,101,0.35)" : "rgba(241,234,215,0.10)"
        }`,
        color: "var(--ink-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
