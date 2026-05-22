"use client";

import Link from "next/link";
import { TopBar } from "@/components/chrome/TopBar";
import { Wordmark } from "@/components/chrome/Wordmark";
import { FISCHER_CHAPTERS, getPuzzlesByChapter } from "@/data/fischer";
import { useFischerProgress } from "@/lib/fischerProgress";

const THEME_COLORS: Record<string, string> = {
  "back-rank": "var(--copper)",
  "double-attack": "#7eb8d4",
  pin: "#a88fd4",
  "queen-knight": "#d4b88f",
  clearance: "#8fd4a8",
  interference: "#d48f8f",
};

export function FischerScreen() {
  const { progress } = useFischerProgress();

  const totalPuzzles = FISCHER_CHAPTERS.reduce(
    (sum, c) => sum + getPuzzlesByChapter(c.number).length,
    0,
  );
  const solvedCount = progress.solved.length;
  const solvedFirst = progress.solvedFirst.length;

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar left={<Wordmark />} />

      {/* Hero */}
      <div style={{ padding: "8px 22px 24px" }}>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 26,
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: 1.15,
          }}
        >
          Bobby Fischer
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 16,
            fontStyle: "italic",
            color: "var(--ink-2)",
            marginTop: 2,
          }}
        >
          Enseña Ajedrez
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "var(--serif)",
            fontSize: 13,
            color: "var(--ink-mute)",
            lineHeight: 1.55,
          }}
        >
          El libro de ajedrez más vendido de todos los tiempos, en versión interactiva.
          Aprende los patrones tácticos esenciales resolviendo los problemas del maestro.
        </div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          margin: "0 22px 24px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: "14px 18px",
          display: "flex",
          gap: 24,
        }}
      >
        {[
          { value: `${solvedCount}/${totalPuzzles}`, label: "resueltos" },
          { value: solvedFirst.toString(), label: "al primer intento" },
        ].map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              className="tab-label"
              style={{ fontSize: 9, color: "var(--ink-faint)", marginTop: 4 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chapter list */}
      <div style={{ padding: "0 22px" }}>
        <div
          className="tab-label"
          style={{ fontSize: 9, color: "var(--ink-faint)", marginBottom: 12, letterSpacing: 0.6 }}
        >
          CAPÍTULOS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FISCHER_CHAPTERS.map((chapter) => {
            const puzzles = getPuzzlesByChapter(chapter.number);
            const chapterSolved = puzzles.filter((p) =>
              progress.solved.includes(p.id),
            ).length;
            const pct = puzzles.length > 0 ? chapterSolved / puzzles.length : 0;
            const color = THEME_COLORS[chapter.theme] ?? "var(--copper)";

            return (
              <Link
                key={chapter.number}
                href={`/fischer/${chapter.number}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderLeft: `3px solid ${color}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${color}22`,
                      border: `1px solid ${color}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "var(--serif)",
                      fontSize: 16,
                      fontWeight: 700,
                      color,
                    }}
                  >
                    {chapter.number}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--ink)",
                        lineHeight: 1.2,
                      }}
                    >
                      {chapter.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--ink-mute)",
                        marginTop: 4,
                        lineHeight: 1.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {puzzles.length} problema{puzzles.length !== 1 ? "s" : ""}
                      {chapterSolved > 0 && ` · ${chapterSolved} resuelto${chapterSolved !== 1 ? "s" : ""}`}
                    </div>

                    {/* Progress bar */}
                    <div
                      style={{
                        marginTop: 8,
                        height: 3,
                        borderRadius: 2,
                        background: "rgba(241,234,215,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct * 100}%`,
                          background: color,
                          borderRadius: 2,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ color: "var(--ink-faint)", flexShrink: 0 }}>›</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
