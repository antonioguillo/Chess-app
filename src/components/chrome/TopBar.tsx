import type { ReactNode } from "react";

interface Props {
  left?: ReactNode;
  right?: ReactNode;
  center?: ReactNode;
}

export function TopBar({ left, right, center }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "6px 18px 10px",
        gap: 12,
        minHeight: 38,
      }}
    >
      <div style={{ minWidth: 28, display: "flex" }}>{left}</div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {center}
      </div>
      <div
        style={{
          minWidth: 28,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {right}
      </div>
    </div>
  );
}
