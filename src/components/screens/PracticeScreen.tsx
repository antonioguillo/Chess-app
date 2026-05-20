"use client";

import Link from "next/link";
import { useMemo } from "react";
import { TopBar } from "@/components/chrome/TopBar";
import { Icon } from "@/components/ui/Icon";
import { useUserProgress } from "@/lib/progress";
import type { PracticeMode } from "@/lib/types";

interface ModeCard {
  id: PracticeMode;
  title: string;
  subtitle: string;
  href: string;
}

const MODES: ModeCard[] = [
  {
    id: "memoria",
    title: "Reproducir de memoria",
    subtitle: "Juega la línea principal sin pistas.",
    href: "/practica/memoria",
  },
  {
    id: "identifica",
    title: "Adivina la apertura",
    subtitle: "Identifica la apertura por la posición.",
    href: "/practica/identifica",
  },
  {
    id: "jugada",
    title: "Encuentra la jugada",
    subtitle: "Elige el movimiento característico.",
    href: "/practica/jugada",
  },
];

export function PracticeScreen() {
  const { progress } = useUserProgress();

  const summary = useMemo(() => {
    const totals = MODES.reduce(
      (acc, m) => {
        const s = progress.practice[m.id];
        acc.correct += s.correct;
        acc.attempts += s.attempts;
        return acc;
      },
      { correct: 0, attempts: 0 },
    );
    return totals;
  }, [progress]);

  return (
    <div style={{ paddingBottom: 120 }}>
      <TopBar
        left={<span style={{ width: 28 }} />}
        center={
          <span
            className="tab-label"
            style={{ color: "var(--ink-mute)" }}
          >
            Práctica
          </span>
        }
        right={<span style={{ width: 28 }} />}
      />
      <div style={{ padding: "20px 22px" }}>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1,
            margin: 0,
            color: "var(--ink)",
          }}
        >
          Pon a prueba
          <br />
          <em style={{ fontWeight: 400 }}>lo aprendido</em>
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--ink-mute)",
          }}
        >
          Reproduce de memoria las líneas principales o resuelve las variantes
          características de cada apertura.
        </p>

        {summary.attempts > 0 && (
          <div
            style={{
              marginTop: 18,
              padding: "12px 14px",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stat label="aciertos" value={summary.correct.toString()} />
            <div style={{ width: 1, background: "var(--line)" }} />
            <Stat label="intentos" value={summary.attempts.toString()} />
            <div style={{ width: 1, background: "var(--line)" }} />
            <Stat
              label="precisión"
              value={`${Math.round((summary.correct / summary.attempts) * 100)}%`}
            />
          </div>
        )}

        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {MODES.map((c) => {
            const s = progress.practice[c.id];
            const count = s.attempts;
            const countLabel =
              count === 0
                ? "Sin intentos todavía"
                : `${s.correct} / ${s.attempts}`;
            return (
              <Link
                key={c.id}
                href={c.href}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    background: "rgba(199,155,101,0.13)",
                    border: "1px solid rgba(199,155,101,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 18,
                  }}
                >
                  ♞
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--ink-mute)",
                      marginTop: 2,
                    }}
                  >
                    {c.subtitle}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      color: "var(--ink-faint)",
                      marginTop: 4,
                      letterSpacing: 0.3,
                    }}
                  >
                    {countLabel.toUpperCase()}
                  </div>
                </div>
                <span style={{ color: "var(--ink-faint)" }}>
                  <Icon name="chevron-right" size={14} />
                </span>
              </Link>
            );
          })}
        </div>
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
        style={{
          fontSize: 9,
          color: "var(--ink-mute)",
          marginTop: 3,
        }}
      >
        {label}
      </div>
    </div>
  );
}
