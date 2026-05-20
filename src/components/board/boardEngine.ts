import type { BoardPiece, Move, PieceType, Square } from "@/lib/types";

export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

const BACK_RANK: ReadonlyArray<"R" | "N" | "B" | "Q" | "K"> = [
  "R",
  "N",
  "B",
  "Q",
  "K",
  "B",
  "N",
  "R",
];

/** The standard starting position as a square → piece map. */
export const INITIAL_POSITION: Readonly<Record<Square, PieceType>> = (() => {
  const map: Partial<Record<Square, PieceType>> = {};
  for (let i = 0; i < 8; i++) {
    const f = FILES[i]!;
    map[(f + "1") as Square] = ("w" + BACK_RANK[i]!) as PieceType;
    map[(f + "2") as Square] = "wP";
    map[(f + "7") as Square] = "bP";
    map[(f + "8") as Square] = ("b" + BACK_RANK[i]!) as PieceType;
  }
  return map as Record<Square, PieceType>;
})();

/**
 * Build the initial piece array with stable IDs.
 *
 * The IDs are derived from the starting square so they remain identical across
 * renders — this is what lets CSS `transition: transform 380ms` animate piece
 * movement instead of remounting DOM nodes each ply.
 */
export function initialPieces(): BoardPiece[] {
  const arr: BoardPiece[] = [];
  for (const [sq, type] of Object.entries(INITIAL_POSITION) as Array<
    [Square, PieceType]
  >) {
    arr.push({ id: `p-${sq}`, type, square: sq, captured: false });
  }
  return arr;
}

/**
 * Apply a single move to a pieces array, returning a new array.
 *
 * Handles ordinary moves and captures. The 12 canonical opening lines do not
 * contain castling, en-passant or promotion; when we extend to user-driven
 * play, swap this for chess.js' authoritative engine.
 */
export function applyMove(pieces: BoardPiece[], move: Move): BoardPiece[] {
  return pieces.map((p) => {
    if (p.captured) return p;
    if (p.square === move.from) return { ...p, square: move.to };
    if (p.square === move.to) return { ...p, captured: true };
    return p;
  });
}

/** Replay the first `n` moves of an opening line from the initial position. */
export function piecesAfter(moves: readonly Move[], n: number): BoardPiece[] {
  let arr = initialPieces();
  const clamped = Math.max(0, Math.min(moves.length, n));
  for (let i = 0; i < clamped; i++) arr = applyMove(arr, moves[i]!);
  return arr;
}

/** Convert a square name to file/rank indices (0–7). */
export function squareToCoords(sq: Square): { fi: number; ri: number } {
  return {
    fi: sq.charCodeAt(0) - 97,
    ri: parseInt(sq[1]!, 10) - 1,
  };
}
