"use client";

import type { BoardPiece, Move, Square } from "@/lib/types";
import { FILES, RANKS, squareToCoords } from "./boardEngine";
import { Piece } from "./Piece";

export type HighlightTone = "selected" | "success" | "error" | "hint";

export interface SquareHighlight {
  square: Square;
  tone: HighlightTone;
}

interface Props {
  pieces: BoardPiece[];
  lastMove?: Move | null;
  size?: number;
  showCoords?: boolean;
  frame?: boolean;
  /** When provided, each square becomes clickable. */
  onSquareClick?: (square: Square) => void;
  /** Highlights drawn on top of the corresponding squares (e.g. selection). */
  highlights?: SquareHighlight[];
}

const HIGHLIGHT_STYLES: Record<
  HighlightTone,
  { bg: string; border: string }
> = {
  selected: {
    bg: "rgba(199, 155, 101, 0.42)",
    border: "rgba(199, 155, 101, 0.85)",
  },
  success: {
    bg: "rgba(120, 180, 110, 0.42)",
    border: "rgba(140, 200, 130, 0.85)",
  },
  error: {
    bg: "rgba(180, 70, 60, 0.42)",
    border: "rgba(220, 100, 90, 0.85)",
  },
  hint: {
    bg: "rgba(217, 184, 122, 0.28)",
    border: "rgba(217, 184, 122, 0.7)",
  },
};

/**
 * Renders an 8×8 chess board with a stable, transform-animated pieces layer.
 *
 * Pieces are positioned absolutely via `transform: translate(...)` and keyed by
 * `piece.id`. When the same piece object moves to a new square it stays in the
 * DOM and React only updates the transform — the CSS transition takes over and
 * the piece slides. Re-creating piece nodes on every ply would break this.
 *
 * Pass `onSquareClick` and `highlights` to use the board interactively
 * (practice modes). The highlights layer sits between the squares and pieces.
 */
export function ChessBoard({
  pieces,
  lastMove,
  size = 320,
  showCoords = true,
  frame = true,
  onSquareClick,
  highlights,
}: Props) {
  const sq = size / 8;

  const highlightMap = new Map<Square, HighlightTone>(
    highlights?.map((h) => [h.square, h.tone]),
  );

  const squares: React.ReactNode[] = [];
  for (let ri = 7; ri >= 0; ri--) {
    for (let fi = 0; fi < 8; fi++) {
      const dark = (ri + fi) % 2 === 0;
      const name = `${FILES[fi]}${RANKS[ri]}` as Square;
      const isLast =
        lastMove && (lastMove.from === name || lastMove.to === name);
      const highlight = highlightMap.get(name);
      squares.push(
        <div
          key={name}
          onClick={onSquareClick ? () => onSquareClick(name) : undefined}
          style={{
            position: "absolute",
            left: fi * sq,
            top: (7 - ri) * sq,
            width: sq,
            height: sq,
            background: dark ? "var(--board-dark)" : "var(--board-light)",
            boxShadow: dark
              ? "inset 0 0 0 0.5px rgba(0,0,0,0.05)"
              : "inset 0 0 0 0.5px rgba(0,0,0,0.02)",
            cursor: onSquareClick ? "pointer" : "default",
          }}
        >
          {isLast && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(199, 155, 101, 0.42)",
                boxShadow: "inset 0 0 0 1.5px rgba(199, 155, 101, 0.85)",
              }}
            />
          )}
          {highlight && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: HIGHLIGHT_STYLES[highlight].bg,
                boxShadow: `inset 0 0 0 1.5px ${HIGHLIGHT_STYLES[highlight].border}`,
              }}
            />
          )}
          {showCoords && fi === 0 && (
            <span
              className="mono"
              style={{
                position: "absolute",
                left: 3,
                top: 2,
                fontSize: Math.max(8, sq * 0.18),
                fontWeight: 600,
                color: dark
                  ? "rgba(241,234,215,0.55)"
                  : "rgba(30,22,14,0.5)",
                pointerEvents: "none",
              }}
            >
              {RANKS[ri]}
            </span>
          )}
          {showCoords && ri === 0 && (
            <span
              className="mono"
              style={{
                position: "absolute",
                right: 3,
                bottom: 1,
                fontSize: Math.max(8, sq * 0.18),
                fontWeight: 600,
                color: dark
                  ? "rgba(241,234,215,0.55)"
                  : "rgba(30,22,14,0.5)",
                pointerEvents: "none",
              }}
            >
              {FILES[fi]}
            </span>
          )}
        </div>,
      );
    }
  }

  return (
    <div
      style={{
        padding: frame ? 10 : 0,
        background: frame
          ? "linear-gradient(160deg, #3a2818 0%, #20140c 100%)"
          : "transparent",
        borderRadius: frame ? 6 : 0,
        boxShadow: frame
          ? "0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 60px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.4)"
          : "none",
        display: "inline-block",
        lineHeight: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          background: "#000",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)",
        }}
      >
        {squares}
        {pieces
          .filter((p) => !p.captured)
          .map((p) => {
            const { fi, ri } = squareToCoords(p.square);
            return (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: sq,
                  height: sq,
                  transform: `translate(${fi * sq}px, ${(7 - ri) * sq}px)`,
                  transition: "transform var(--piece-anim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <Piece type={p.type} size={sq * 0.82} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
