"use client";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  ariaLabel?: string;
}

export function CtrlBtn({
  children,
  onClick,
  disabled,
  primary,
  ariaLabel,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        width: primary ? 40 : 32,
        height: 32,
        borderRadius: 16,
        background: primary
          ? disabled
            ? "rgba(199,155,101,0.2)"
            : "linear-gradient(180deg, #d2a26d 0%, #a47a48 100%)"
          : "transparent",
        border: `1px solid ${
          primary ? "rgba(199,155,101,0.5)" : "rgba(241,234,215,0.14)"
        }`,
        color: primary ? "#1a1410" : "var(--ink-2)",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.4 : 1,
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
