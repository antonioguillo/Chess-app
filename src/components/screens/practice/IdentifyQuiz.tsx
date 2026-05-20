"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChessBoard } from "@/components/board/ChessBoard";
import { piecesAfter } from "@/components/board/boardEngine";
import { Feedback } from "@/components/practice/Feedback";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ResultsCard } from "@/components/practice/ResultsCard";
import { OPENINGS } from "@/data/openings";
import { useUserProgress } from "@/lib/progress";
import { shuffle } from "@/lib/shuffle";
import type { Opening } from "@/lib/types";

interface Question {
  opening: Opening;
  /** Number of plies played from the starting position. */
  ply: number;
  /** Multiple-choice options (opening ids, length = 4, one matches). */
  optionIds: string[];
}

const QUESTION_COUNT = 8;

function buildQuestions(): Question[] {
  const shuffled = shuffle(OPENINGS).slice(0, QUESTION_COUNT);
  return shuffled.map((opening) => {
    // Show the position somewhere from ply 4 → end (clamped to available range)
    const minPly = Math.min(4, opening.moves.length);
    const maxPly = opening.moves.length;
    const ply =
      minPly === maxPly
        ? maxPly
        : minPly + Math.floor(Math.random() * (maxPly - minPly + 1));

    // 3 distractors from the same family if possible, else any others
    const sameFamily = OPENINGS.filter(
      (o) => o.id !== opening.id && o.family === opening.family,
    );
    const others = OPENINGS.filter(
      (o) => o.id !== opening.id && o.family !== opening.family,
    );
    const pool = shuffle([...sameFamily, ...others]);
    const distractors = pool.slice(0, 3).map((o) => o.id);
    const optionIds = shuffle([opening.id, ...distractors]);
    return { opening, ply, optionIds };
  });
}

type Phase = "answering" | "revealing" | "done";

export function IdentifyQuiz() {
  // Built on the client to avoid SSR/CSR hydration mismatch from Math.random
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("answering");
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const { recordPractice } = useUserProgress();
  const recordedRef = useRef(false);

  useEffect(() => {
    if (questions.length === 0) setQuestions(buildQuestions());
  }, [questions.length]);

  const q = questions[index];
  const pieces = useMemo(
    () => (q ? piecesAfter(q.opening.moves, q.ply) : []),
    [q],
  );

  // Reset recording flag when a fresh session starts
  useEffect(() => {
    recordedRef.current = false;
  }, [questions]);

  const handlePick = useCallback(
    (id: string) => {
      if (phase !== "answering" || !q) return;
      const correct = id === q.opening.id;
      setPicked(id);
      setPhase("revealing");
      if (correct) setCorrectCount((c) => c + 1);
    },
    [phase, q],
  );

  const handleNext = useCallback(() => {
    if (index + 1 >= questions.length) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
      setPhase("answering");
    }
  }, [index, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(buildQuestions());
    setIndex(0);
    setPicked(null);
    setPhase("answering");
    setCorrectCount(0);
  }, []);

  useEffect(() => {
    if (phase === "done" && !recordedRef.current) {
      recordedRef.current = true;
      recordPractice(
        "identifica",
        correctCount,
        questions.length,
        questions.length - correctCount,
      );
    }
  }, [phase, correctCount, questions.length, recordPractice]);

  if (!q) {
    return (
      <div style={{ paddingBottom: 110 }}>
        <PracticeHeader backHref="/practica" label="Identifica" />
        <div
          style={{
            padding: "40px 22px",
            textAlign: "center",
            color: "var(--ink-mute)",
            fontSize: 13,
          }}
        >
          Preparando preguntas…
        </div>
      </div>
    );
  }

  // ── Done screen ─────────────────────────────────────────────
  if (phase === "done") {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    return (
      <div style={{ paddingBottom: 110 }}>
        <PracticeHeader backHref="/practica" label="Identifica" />
        <ResultsCard
          title="Quiz terminado"
          italicWord="terminado"
          subtitle="¿Quieres intentarlo de nuevo con posiciones distintas?"
          stats={[
            { value: `${correctCount}`, label: "aciertos" },
            { value: `${questions.length}`, label: "preguntas" },
            { value: `${accuracy}%`, label: "precisión" },
          ]}
          actions={[
            { label: "Jugar otra ronda", primary: true, onClick: handleRestart },
            { label: "Volver a Práctica", href: "/practica" },
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 110 }}>
      <PracticeHeader
        backHref="/practica"
        label="Identifica"
        progress={`PREGUNTA ${(index + 1)
          .toString()
          .padStart(2, "0")} / ${questions.length
          .toString()
          .padStart(2, "0")}`}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <ChessBoard pieces={pieces} size={320} />
      </div>

      <div style={{ padding: "16px 22px 6px" }}>
        <div
          className="tab-label"
          style={{ color: "var(--copper)", marginBottom: 6 }}
        >
          · ¿Qué apertura es?
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 12.5,
            lineHeight: 1.45,
            color: "var(--ink-mute)",
          }}
        >
          Posición después de {q.ply} {q.ply === 1 ? "jugada" : "jugadas"}.
          Elige la apertura que corresponde.
        </p>
      </div>

      <div
        style={{
          padding: "12px 18px 0",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {q.optionIds.map((id) => {
          const option = OPENINGS.find((o) => o.id === id)!;
          const isCorrect = id === q.opening.id;
          const isPicked = picked === id;
          let tone: "default" | "correct" | "wrong" | "miss" = "default";
          if (phase === "revealing") {
            if (isCorrect) tone = "correct";
            else if (isPicked) tone = "wrong";
            else tone = "miss";
          }
          return (
            <OptionButton
              key={id}
              label={option.name}
              eco={option.eco}
              tone={tone}
              disabled={phase !== "answering"}
              onClick={() => handlePick(id)}
            />
          );
        })}
      </div>

      {phase === "revealing" && (
        <>
          <div style={{ padding: "16px 22px 0" }}>
            {picked === q.opening.id ? (
              <Feedback
                tone="success"
                title={`Correcto — es la ${q.opening.name}.`}
                detail={q.opening.tagline}
              />
            ) : (
              <Feedback
                tone="error"
                title={`Era la ${q.opening.name}.`}
                detail={q.opening.tagline}
              />
            )}
          </div>
          <div style={{ padding: "16px 22px 0" }}>
            <button
              type="button"
              onClick={handleNext}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, #d2a26d 0%, #a47a48 100%)",
                border: "1px solid rgba(199,155,101,0.5)",
                color: "#1a1410",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.3,
                cursor: "pointer",
              }}
            >
              {index + 1 >= questions.length ? "Ver resultados" : "Siguiente"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function OptionButton({
  label,
  eco,
  tone,
  disabled,
  onClick,
}: {
  label: string;
  eco: string;
  tone: "default" | "correct" | "wrong" | "miss";
  disabled?: boolean;
  onClick: () => void;
}) {
  const palette = {
    default: {
      bg: "var(--surface)",
      bd: "var(--line)",
      fg: "var(--ink)",
    },
    correct: {
      bg: "rgba(120, 180, 110, 0.14)",
      bd: "rgba(140, 200, 130, 0.55)",
      fg: "var(--ink)",
    },
    wrong: {
      bg: "rgba(180, 70, 60, 0.14)",
      bd: "rgba(220, 100, 90, 0.55)",
      fg: "var(--ink)",
    },
    miss: {
      bg: "var(--surface)",
      bd: "var(--line)",
      fg: "var(--ink-mute)",
    },
  } as const;
  const p = palette[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px 14px",
        background: p.bg,
        border: `1px solid ${p.bd}`,
        borderRadius: 14,
        cursor: disabled ? "default" : "pointer",
        color: p.fg,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 10,
          color: "var(--copper)",
          letterSpacing: 0.4,
          width: 56,
        }}
      >
        {eco}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </button>
  );
}
