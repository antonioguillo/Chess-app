/**
 * Core domain types for Gambito.
 *
 * These are kept narrow and explicit so the data layer can stay typed end-to-end
 * and future iterations (variants, exercises, user progress sync) can extend
 * cleanly without ad-hoc shape changes.
 */

export type Square =
  | `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"}${
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"}`;

export type PieceColor = "w" | "b";
export type PieceKind = "K" | "Q" | "R" | "B" | "N" | "P";
export type PieceType = `${PieceColor}${PieceKind}`;

export interface Move {
  /** Origin square in algebraic notation (e.g. "e2"). */
  from: Square;
  /** Destination square (e.g. "e4"). */
  to: Square;
  /** Spanish algebraic notation, e.g. "Cf3", "Ab5", "cxd4". */
  san: string;
  /** 1-2 sentence Spanish commentary shown in the detail screen. */
  note: string;
}

export type OpeningFamily = "open" | "semi-open" | "closed" | "indian" | "flank";
export type OpeningColor = "Blancas" | "Negras";
export type OpeningDifficulty = "Principiante" | "Intermedio" | "Avanzado";
export type Popularity = 1 | 2 | 3 | 4 | 5;

export interface Opening {
  id: string;
  name: string;
  spanish: string;
  eco: string;
  family: OpeningFamily;
  familyLabel: string;
  color: OpeningColor;
  popularity: Popularity;
  difficulty: OpeningDifficulty;
  year: number;
  tagline: string;
  description: string;
  idea: string;
  moves: Move[];
}

export interface Family {
  id: OpeningFamily;
  label: string;
  subtitle: string;
  roman: string;
}

/** Live piece on the board — stable ID enables smooth transform animation. */
export interface BoardPiece {
  id: string;
  type: PieceType;
  square: Square;
  captured: boolean;
}

/** User progress for a single opening — persisted locally. */
export interface OpeningProgress {
  pliesViewed: number;
  completed: boolean;
  lastViewedAt: string; // ISO timestamp
}

export interface UserProgress {
  openings: Record<string, OpeningProgress>;
  streakDays: number;
  lastOpenedDate: string | null; // YYYY-MM-DD
}
