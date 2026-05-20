import type { OpeningColor } from "@/lib/types";

interface Props {
  color: OpeningColor;
}

export function ColorDot({ color }: Props) {
  const isWhite = color === "Blancas";
  return (
    <span
      aria-label={color}
      style={{
        width: 9,
        height: 9,
        borderRadius: 9,
        background: isWhite ? "#f4ecd6" : "#15110b",
        border: `1px solid ${
          isWhite ? "rgba(0,0,0,0.4)" : "rgba(241,234,215,0.35)"
        }`,
        display: "inline-block",
      }}
    />
  );
}
