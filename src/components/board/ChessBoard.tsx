import type { BoardPiece, Move } from "@/lib/types";
import { FILES, RANKS, squareToCoords } from "./boardEngine";
import { Piece } from "./Piece";

interface Props {
  pieces: BoardPiece[];
  lastMove?: Move | null;
  size?: number;
  showCoords?: boolean;
  frame?: boolean;
}

/**
 * Renders an 8×8 chess board with a stable, transform-animated pieces layer.
 *
 * Pieces are positioned absolutely via `transform: translate(...)` and keyed by
 * `piece.id`. When the same piece object moves to a new square it stays in the
 * DOM and React only updates the transform — the CSS transition takes over and
 * the piece slides. Re-creating piece nodes on every ply would break this.
 */
export function ChessBoard({
  pieces,
  lastMove,
  size = 320,
  showCoords = true,
  frame = true,
}: Props) {
  const sq = size / 8;

  const squares: React.ReactNode[] = [];
  for (let ri = 7; ri >= 0; ri--) {
    for (let fi = 0; fi < 8; fi++) {
      const dark = (ri + fi) % 2 === 0;
      const name = `${FILES[fi]}${RANKS[ri]}`;
      const isLast =
        lastMove && (lastMove.from === name || lastMove.to === name);
      squares.push(
        <div
          key={name}
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
