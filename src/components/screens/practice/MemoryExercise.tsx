"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChessBoard, type SquareHighlight } from "@/components/board/ChessBoard";
import {
  pieceAt,
  piecesAfter,
  sideToMove,
} from "@/components/board/boardEngine";
import { Feedback } from "@/components/practice/Feedback";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ResultsCard } from "@/components/practice/ResultsCard";
import { useUserProgress } from "@/lib/progress";
import type { Opening, Square } from "@/lib/types";

interface Props {
  opening: Opening;
}

type Mood = "playing" | "wrong" | "hinting" | "done";

interface State {
  ply: number;
  mood: Mood;
  selected: Square | null;
  mistakes: number;
  /** Latest user attempt that was wrong, for the error highlight on the board. */
  wrongSquares: { from: Square; to: Square } | null;
}

const INITIAL: State = {
  ply: 0,
  mood: "playing",
  selected: null,
  mistakes: 0,
  wrongSquares: null,
};

export function MemoryExercise({ opening }: Props) {
  const [state, setState] = useState<State>(INITIAL);
  const { recordPractice } = useUserProgress();
  const recordedRef = useRef(false);

  const moves = opening.moves;
  const total = moves.length;

  const pieces = useMemo(
    () => piecesAfter(moves, state.ply),
    [moves, state.ply],
  );

  // Reset when the user comes back to the same opening
  useEffect(() => {
    setState(INITIAL);
    recordedRef.current = false;
  }, [opening.id]);

  const expected = state.ply < total ? moves[state.ply]! : null;
  const turn = sideToMove(state.ply);

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (state.mood === "done") return;

      if (state.selected == null) {
        // Selecting a piece — only allow your turn's color
        const piece = pieceAt(pieces, square);
        if (!piece) return;
        if (piece.type[0] !== turn) return;
        setState((s) => ({ ...s, selected: square, mood: "playing", wrongSquares: null }));
        return;
      }

      // Re-selecting another own piece
      const piece = pieceAt(pieces, square);
      if (piece && piece.type[0] === turn && square !== state.selected) {
        setState((s) => ({ ...s, selected: square, mood: "playing", wrongSquares: null }));
        return;
      }

      // Tapping the same square deselects
      if (square === state.selected) {
        setState((s) => ({ ...s, selected: null, mood: "playing" }));
        return;
      }

      // Attempt a move
      const from = state.selected;
      const to = square;
      if (!expected) return;

      if (from === expected.from && to === expected.to) {
        // Correct
        setState((s) => ({
          ply: s.ply + 1,
          mood: s.ply + 1 >= total ? "done" : "playing",
          selected: null,
          mistakes: s.mistakes,
          wrongSquares: null,
        }));
      } else {
        setState((s) => ({
          ...s,
          mood: "wrong",
          mistakes: s.mistakes + 1,
          selected: null,
          wrongSquares: { from, to },
        }));
      }
    },
    [expected, pieces, state.mood, state.selected, total, turn],
  );

  const handleHint = useCallback(() => {
    setState((s) => ({ ...s, mood: "hinting", selected: null, wrongSquares: null }));
  }, []);

  const handleReset = useCallback(() => {
    setState(INITIAL);
    recordedRef.current = false;
  }, []);

  // Record practice stats once on completion
  useEffect(() => {
    if (state.mood === "done" && !recordedRef.current) {
      recordedRef.current = true;
      recordPractice("memoria", total, total + state.mistakes, state.mistakes);
    }
  }, [state.mood, state.mistakes, total, recordPractice]);

  // Highlights — selection, hint, error feedback
  const highlights: SquareHighlight[] = useMemo(() => {
    const h: SquareHighlight[] = [];
    if (state.selected) h.push({ square: state.selected, tone: "selected" });
    if (state.mood === "hinting" && expected) {
      h.push({ square: expected.from, tone: "hint" });
      h.push({ square: expected.to, tone: "hint" });
    }
    if (state.mood === "wrong" && state.wrongSquares) {
      h.push({ square: state.wrongSquares.from, tone: "error" });
      h.push({ square: state.wrongSquares.to, tone: "error" });
    }
    return h;
  }, [state.selected, state.mood, state.wrongSquares, expected]);

  const lastMove = state.ply > 0 ? moves[state.ply - 1] : null;

  // ── Done screen ─────────────────────────────────────────────
  if (state.mood === "done") {
    return (
      <div style={{ paddingBottom: 110 }}>
        <PracticeHeader
          backHref="/practica/memoria"
          label={`Memoria · ${opening.name}`}
        />
        <ResultsCard
          title="Línea completada"
          italicWord="completada"
          subtitle={`Has reproducido la línea principal de ${opening.name} de memoria.`}
          stats={[
            { value: total.toString(), label: "jugadas" },
            { value: state.mistakes.toString(), label: "errores" },
            {
              value: state.mistakes === 0 ? "100%" : `${Math.round((total / (total + state.mistakes)) * 100)}%`,
              label: "precisión",
            },
          ]}
          actions={[
            {
              label: "Repetir esta apertura",
              primary: true,
              onClick: handleReset,
            },
            { label: "Elegir otra apertura", href: "/practica/memoria" },
            { label: "Ver detalle", href: `/apertura/${opening.id}` },
          ]}
        />
      </div>
    );
  }

  // ── Exercise screen ─────────────────────────────────────────
  const turnLabel = turn === "w" ? "Blancas" : "Negras";

  return (
    <div style={{ paddingBottom: 110 }}>
      <PracticeHeader
        backHref="/practica/memoria"
        label={`Memoria · ${opening.name}`}
        progress={`JUGADA ${state.ply
          .toString()
          .padStart(2, "0")} / ${total.toString().padStart(2, "0")}`}
      />

      {/* Board */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <ChessBoard
          pieces={pieces}
          lastMove={lastMove}
          highlights={highlights}
          onSquareClick={handleSquareClick}
          size={362}
        />
      </div>

      {/* Turn + side panel */}
      <div
        style={{
          padding: "14px 22px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div>
          <div
            className="tab-label"
            style={{
              fontSize: 9.5,
              color: "var(--ink-faint)",
              letterSpacing: 0.4,
            }}
          >
            Te toca
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 17,
              fontWeight: 500,
              color: "var(--ink)",
              marginTop: 2,
            }}
          >
            Mover {turnLabel.toLowerCase()}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <SecondaryBtn onClick={handleHint} disabled={state.mood === "hinting"}>
            Pista
          </SecondaryBtn>
          <SecondaryBtn onClick={handleReset}>Reiniciar</SecondaryBtn>
        </div>
      </div>

      {/* Feedback box */}
      <div style={{ padding: "14px 22px 0" }}>
        {state.mood === "wrong" ? (
          <Feedback
            tone="error"
            title="Esa no es la jugada de la línea principal."
            detail="Inténtalo de nuevo o pulsa «Pista» para ver las casillas correctas."
          />
        ) : state.mood === "hinting" && expected ? (
          <Feedback
            tone="neutral"
            title={`Mueve de ${expected.from} a ${expected.to}.`}
            detail={expected.note}
          />
        ) : (
          <Feedback
            tone="neutral"
            title={
              state.ply === 0
                ? `Empieza la línea de ${opening.name}.`
                : "Sigue con la siguiente jugada de la línea."
            }
            detail={
              state.ply === 0
                ? "Selecciona la pieza que abre y llévala a su casilla."
                : "Selecciona una pieza para ver tus opciones."
            }
          />
        )}
      </div>

      {/* Score row */}
      <div
        style={{
          margin: "20px 22px 0",
          padding: "12px 14px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stat label="Aciertos" value={state.ply.toString()} />
        <Stat label="Errores" value={state.mistakes.toString()} />
        <Stat
          label="Restantes"
          value={(total - state.ply).toString()}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 20,
          fontWeight: 500,
          color: "var(--ink)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        className="tab-label"
        style={{ fontSize: 9, color: "var(--ink-mute)", marginTop: 3 }}
      >
        {label}
      </div>
    </div>
  );
}

function SecondaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 12px",
        borderRadius: 999,
        background: "rgba(241,234,215,0.04)",
        border: "1px solid rgba(241,234,215,0.14)",
        color: disabled ? "var(--ink-faint)" : "var(--ink-2)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.3,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {children}
    </button>
  );
}
