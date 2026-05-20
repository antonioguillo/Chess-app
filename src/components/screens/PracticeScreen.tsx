"use client";

import { TopBar } from "@/components/chrome/TopBar";

interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  count: string;
}

const EXERCISES: Exercise[] = [
  {
    id: "memory",
    title: "Reproducir de memoria",
    subtitle: "Juega la línea principal sin pistas.",
    count: "12 ejercicios",
  },
  {
    id: "identify",
    title: "Adivina la apertura",
    subtitle: "Identifica la apertura por la posición.",
    count: "24 ejercicios",
  },
  {
    id: "find-move",
    title: "Encuentra la jugada",
    subtitle: "Elige el movimiento característico.",
    count: "36 ejercicios",
  },
];

export function PracticeScreen() {
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

        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {EXERCISES.map((c) => (
            <div
              key={c.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
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
                  {c.count.toUpperCase()}
                </div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                style={{ color: "var(--ink-faint)" }}
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
