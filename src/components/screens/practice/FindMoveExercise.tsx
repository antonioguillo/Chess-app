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

type Phase = "thinking" | "wrong" | "hinting" | "solved";

interface State {
  phase: Phase;
  selected: Square | null;
  attempts: number;
  wrongSquares: { from: Square; to: Square } | null;
}

const INITIAL: State = {
  phase: "thinking",
  selected: null,
  attempts: 0,
  wrongSquares: null,
};

export function FindMoveExercise({ opening }: Props) {
  const [state, setState] = useState<State>(INITIAL);
  const { recordPractice } = useUserProgress();
  const recordedRef = useRef(false);

  const targetIndex = opening.characteristicMoveIndex;
  const target = opening.moves[targetIndex]!;
  const setupPly = targetIndex;

  const pieces = useMemo(
    () => piecesAfter(opening.moves, setupPly),
    [opening.moves, setupPly],
  );
  const turn = sideToMove(setupPly);
  const turnLabel = turn === "w" ? "Blancas" : "Negras";

  useEffect(() => {
    setState(INITIAL);
    recordedRef.current = false;
  }, [opening.id]);

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (state.phase === "solved") return;

      if (state.selected == null) {
        const piece = pieceAt(pieces, square);
        if (!piece) return;
        if (piece.type[0] !== turn) return;
        setState((s) => ({ ...s, selected: square, phase: "thinking", wrongSquares: null }));
        return;
      }

      // Re-select another own piece
      const piece = pieceAt(pieces, square);
      if (piece && piece.type[0] === turn && square !== state.selected) {
        setState((s) => ({ ...s, selected: square, phase: "thinking", wrongSquares: null }));
        return;
      }

      // Tap same square to deselect
      if (square === state.selected) {
        setState((s) => ({ ...s, selected: null, phase: "thinking" }));
        return;
      }

      const from = state.selected;
      const to = square;
      if (from === target.from && to === target.to) {
        setState((s) => ({
          ...s,
          phase: "solved",
          selected: null,
          wrongSquares: null,
        }));
      } else {
        setState((s) => ({
          ...s,
          phase: "wrong",
          selected: null,
          attempts: s.attempts + 1,
          wrongSquares: { from, to },
        }));
      }
    },
    [pieces, state.phase, state.selected, target, turn],
  );

  const handleHint = useCallback(() => {
    setState((s) => ({ ...s, phase: "hinting", selected: null, wrongSquares: null }));
  }, []);

  const handleRetry = useCallback(() => {
    setState(INITIAL);
    recordedRef.current = false;
  }, []);

  useEffect(() => {
    if (state.phase === "solved" && !recordedRef.current) {
      recordedRef.current = true;
      const correct = state.attempts === 0 ? 1 : 0;
      recordPractice("jugada", correct, 1, state.attempts);
    }
  }, [state.phase, state.attempts, recordPractice]);

  const highlights: SquareHighlight[] = useMemo(() => {
    const h: SquareHighlight[] = [];
    if (state.selected) h.push({ square: state.selected, tone: "selected" });
    if (state.phase === "hinting") {
      h.push({ square: target.from, tone: "hint" });
      h.push({ square: target.to, tone: "hint" });
    }
    if (state.phase === "solved") {
      h.push({ square: target.from, tone: "success" });
      h.push({ square: target.to, tone: "success" });
    }
    if (state.phase === "wrong" && state.wrongSquares) {
      h.push({ square: state.wrongSquares.from, tone: "error" });
      h.push({ square: state.wrongSquares.to, tone: "error" });
    }
    return h;
  }, [state.phase, state.selected, state.wrongSquares, target]);

  if (state.phase === "solved") {
    return (
      <div style={{ paddingBottom: 110 }}>
        <PracticeHeader
          backHref="/practica/jugada"
          label={`Jugada · ${opening.name}`}
        />
        <ResultsCard
          title="Jugada encontrada"
          italicWord="encontrada"
          subtitle={`Has identificado la jugada característica de ${opening.name}.`}
          stats={[
            { value: target.san, label: "jugada" },
            { value: (state.attempts + 1).toString(), label: "intentos" },
            {
              value: state.attempts === 0 ? "Sí" : "—",
              label: "al primero",
            },
          ]}
          actions={[
            { label: "Probar otra apertura", primary: true, href: "/practica/jugada" },
            { label: "Repetir", onClick: handleRetry },
            { label: "Ver detalle", href: `/apertura/${opening.id}` },
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 110 }}>
      <PracticeHeader
        backHref="/practica/jugada"
        label={`Jugada · ${opening.name}`}
        progress={`INTENTOS ${state.attempts.toString().padStart(2, "0")}`}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <ChessBoard
          pieces={pieces}
          highlights={highlights}
          onSquareClick={handleSquareClick}
          size={362}
        />
      </div>

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
            Encuentra la jugada de
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 19,
              fontWeight: 500,
              color: "var(--ink)",
              marginTop: 2,
              lineHeight: 1.1,
            }}
          >
            {opening.name}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: "var(--ink-mute)",
              marginTop: 3,
              letterSpacing: 0.3,
            }}
          >
            Mueven {turnLabel.toLowerCase()}
          </div>
        </div>
        <button
          type="button"
          onClick={handleHint}
          disabled={state.phase === "hinting"}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            background: "rgba(241,234,215,0.04)",
            border: "1px solid rgba(241,234,215,0.14)",
            color:
              state.phase === "hinting"
                ? "var(--ink-faint)"
                : "var(--ink-2)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.3,
            cursor: state.phase === "hinting" ? "default" : "pointer",
          }}
        >
          Pista
        </button>
      </div>

      <div style={{ padding: "14px 22px 0" }}>
        {state.phase === "wrong" ? (
          <Feedback
            tone="error"
            title="Esa no es la jugada característica."
            detail="Piensa qué movimiento define esta apertura. Pulsa «Pista» si lo necesitas."
          />
        ) : state.phase === "hinting" ? (
          <Feedback
            tone="neutral"
            title={`La jugada es ${target.san} (de ${target.from} a ${target.to}).`}
            detail={target.note}
          />
        ) : (
          <Feedback
            tone="neutral"
            title={`Las ${turnLabel.toLowerCase()} acaban de llegar aquí. Encuentra el movimiento que define esta apertura.`}
            detail={opening.idea}
          />
        )}
      </div>
    </div>
  );
}
