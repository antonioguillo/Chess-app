import type { PieceType } from "@/lib/types";

/**
 * Chess piece rendered as a Unicode glyph. The prototype uses these for the
 * fastest possible iteration; production should swap for an SVG piece set
 * (cburnett, merida, etc) without changing this component's API.
 */
const GLYPH: Record<string, string> = {
  K: "♚",
  Q: "♛",
  R: "♜",
  B: "♝",
  N: "♞",
  P: "♟",
};

interface Props {
  type: PieceType;
  size: number;
}

export function Piece({ type, size }: Props) {
  const isWhite = type[0] === "w";
  const kind = type[1]!;
  return (
    <span
      aria-hidden
      style={{
        fontSize: size,
        lineHeight: 1,
        color: isWhite ? "#f4ecd6" : "#15110b",
        textShadow: isWhite
          ? "0 1px 0 rgba(0,0,0,0.45), 0 0 1px rgba(0,0,0,0.6)"
          : "0 1px 0 rgba(255,255,255,0.08)",
        WebkitTextStroke: isWhite
          ? "0.6px rgba(20,15,8,0.55)"
          : "0.6px rgba(241,234,215,0.18)",
        userSelect: "none",
        fontFamily:
          '"Segoe UI Symbol", "Apple Symbols", "DejaVu Sans", system-ui, sans-serif',
        display: "inline-block",
        transform: "translateY(-2%)",
      }}
    >
      {GLYPH[kind]}
    </span>
  );
}
