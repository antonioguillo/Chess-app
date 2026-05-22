"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChessBoard, type SquareHighlight } from "@/components/board/ChessBoard";
import { pieceAt } from "@/components/board/boardEngine";
import { Feedback } from "@/components/practice/Feedback";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { useFischerProgress } from "@/lib/fischerProgress";
import type { BoardPiece, FischerPuzzle as FischerPuzzleType, Square } from "@/lib/types";

interface Props {
  puzzle: FischerPuzzleType;
  totalInChapter: number;
  indexInChapter: number;
  onNext: () => void;
  onBack: string;
}

type Phase = "thinking" | "wrong" | "hinting" | "partial" | "solved";

function buildPieces(position: Partial<Record<Square, string>>): BoardPiece[] {
  return Object.entries(position).map(([sq, type]) => ({
    id: `fp-${sq}`,
    type: type as BoardPiece["type"],
    square: sq as Square,
    captured: false,
  }));
}

export function FischerPuzzle({ puzzle, totalInChapter, indexInChapter, onNext, onBack }: Props) {
  const [pieces, setPieces] = useState<BoardPiece[]>(() => buildPieces(puzzle.position));
  const [phase, setPhase] = useState<Phase>("thinking");
  const [selected, setSelected] = useState<Square | null>(null);
  const [moveIndex, setMoveIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [wrongSquares, setWrongSquares] = useState<{ from: Square; to: Square } | null>(null);
  const recordedRef = useRef(false);
  const { recordSolved } = useFischerProgress();

  useEffect(() => {
    setPieces(buildPieces(puzzle.position));
    setPhase("thinking");
    setSelected(null);
    setMoveIndex(0);
    setAttempts(0);
    setWrongSquares(null);
    recordedRef.current = false;
  }, [puzzle.id]);

  const currentMove = puzzle.solution[moveIndex];
  const isUserTurn = moveIndex % 2 === 0; // user always plays first

  const applyMoveToPieces = useCallback((from: Square, to: Square, arr: BoardPiece[]): BoardPiece[] => {
    return arr.map((p) => {
      if (p.captured) return p;
      if (p.square === from) return { ...p, square: to };
      if (p.square === to) return { ...p, captured: true };
      return p;
    });
  }, []);

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (phase === "solved" || !isUserTurn || !currentMove) return;

      if (selected == null) {
        const piece = pieceAt(pieces, square);
        if (!piece) return;
        if (piece.type[0] !== puzzle.sideToMove) return;
        setSelected(square);
        setPhase("thinking");
        setWrongSquares(null);
        return;
      }

      const piece = pieceAt(pieces, square);
      if (piece && piece.type[0] === puzzle.sideToMove && square !== selected) {
        setSelected(square);
        setWrongSquares(null);
        return;
      }

      if (square === selected) {
        setSelected(null);
        return;
      }

      const from = selected;
      const to = square;
      setSelected(null);

      if (from === currentMove.from && to === currentMove.to) {
        const newPieces = applyMoveToPieces(from, to, pieces);
        setPieces(newPieces);
        const nextIndex = moveIndex + 1;

        if (nextIndex >= puzzle.solution.length) {
          setPhase("solved");
          if (!recordedRef.current) {
            recordedRef.current = true;
            recordSolved(puzzle.id, attempts === 0);
          }
        } else {
          // Show opponent's response automatically
          setMoveIndex(nextIndex);
          setPhase("partial");
          const oppMove = puzzle.solution[nextIndex]!;
          setTimeout(() => {
            setPieces((prev) => applyMoveToPieces(oppMove.from, oppMove.to, prev));
            setMoveIndex(nextIndex + 1);
            setPhase("thinking");
          }, 700);
        }
      } else {
        setAttempts((a) => a + 1);
        setPhase("wrong");
        setWrongSquares({ from, to });
      }
    },
    [
      phase, isUserTurn, currentMove, selected, pieces,
      puzzle.sideToMove, puzzle.solution, puzzle.id,
      moveIndex, attempts, applyMoveToPieces, recordSolved,
    ],
  );

  const handleHint = useCallback(() => {
    setPhase("hinting");
    setSelected(null);
    setWrongSquares(null);
  }, []);

  const highlights = useMemo((): SquareHighlight[] => {
    const h: SquareHighlight[] = [];
    if (selected) h.push({ square: selected, tone: "selected" });
    if (phase === "hinting" && currentMove) {
      h.push({ square: currentMove.from, tone: "hint" });
      h.push({ square: currentMove.to, tone: "hint" });
    }
    if (phase === "solved" && puzzle.solution.length > 0) {
      const last = puzzle.solution[puzzle.solution.length - 1]!;
      h.push({ square: last.from, tone: "success" });
      h.push({ square: last.to, tone: "success" });
    }
    if (phase === "wrong" && wrongSquares) {
      h.push({ square: wrongSquares.from, tone: "error" });
      h.push({ square: wrongSquares.to, tone: "error" });
    }
    return h;
  }, [phase, selected, wrongSquares, currentMove, puzzle.solution]);

  const sideLabel = puzzle.sideToMove === "w" ? "Blancas" : "Negras";
  const mateLabel = puzzle.movesToSolve === 1 ? "Mate en 1" : `Mate en ${puzzle.movesToSolve}`;

  return (
    <div style={{ paddingBottom: 110 }}>
      <PracticeHeader
        backHref={onBack}
        label={`Fischer · ${puzzle.chapterTitle}`}
        progress={`${indexInChapter + 1} / ${totalInChapter}`}
      />

      <div style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}>
        <ChessBoard
          pieces={pieces}
          highlights={highlights}
          onSquareClick={phase !== "solved" ? handleSquareClick : undefined}
          size={362}
        />
      </div>

      <div style={{ padding: "14px 22px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div className="tab-label" style={{ fontSize: 9.5, color: "var(--ink-faint)", letterSpacing: 0.4 }}>
            {mateLabel} · Mueven {sideLabel.toLowerCase()}
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 500, color: "var(--ink)", marginTop: 2, lineHeight: 1.1 }}>
            {puzzle.chapterTitle}
          </div>
        </div>
        {phase !== "solved" && (
          <button
            type="button"
            onClick={handleHint}
            disabled={phase === "hinting"}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(241,234,215,0.04)",
              border: "1px solid rgba(241,234,215,0.14)",
              color: phase === "hinting" ? "var(--ink-faint)" : "var(--ink-2)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 0.3,
              cursor: phase === "hinting" ? "default" : "pointer",
              flexShrink: 0,
            }}
          >
            Pista
          </button>
        )}
      </div>

      <div style={{ padding: "14px 22px 0" }}>
        {phase === "solved" ? (
          <Feedback tone="success" title="¡Correcto!" detail={puzzle.explanation} />
        ) : phase === "wrong" ? (
          <Feedback tone="error" title="Jugada incorrecta. Inténtalo de nuevo." />
        ) : phase === "hinting" && currentMove ? (
          <Feedback tone="neutral" title={`Juega ${currentMove.san} (de ${currentMove.from} a ${currentMove.to}).`} detail={puzzle.hint} />
        ) : (
          <Feedback tone="neutral" title={`Encuentra el mejor movimiento para las ${sideLabel.toLowerCase()}.`} detail={puzzle.hint} />
        )}
      </div>

      {phase === "solved" && (
        <div style={{ padding: "16px 22px 0" }}>
          <button
            type="button"
            onClick={onNext}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: "var(--gold)",
              border: "none",
              color: "#1a1000",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 0.3,
              cursor: "pointer",
            }}
          >
            Siguiente problema →
          </button>
        </div>
      )}
    </div>
  );
}
