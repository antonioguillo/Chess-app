"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MiniBoard } from "@/components/board/MiniBoard";
import { IconBtn } from "@/components/chrome/IconBtn";
import { TopBar } from "@/components/chrome/TopBar";
import { Wordmark } from "@/components/chrome/Wordmark";
import { Icon } from "@/components/ui/Icon";
import { FAMILIES } from "@/data/families";
import { OPENINGS, getOpeningById } from "@/data/openings";
import {
  recentInProgress,
  summarize,
  useUserProgress,
} from "@/lib/progress";
import type { Opening } from "@/lib/types";

interface Props {
  dailyOpeningId: string;
}

export function HomeScreen({ dailyOpeningId }: Props) {
  const daily = getOpeningById(dailyOpeningId)!;
  const { progress } = useUserProgress();

  const stats = useMemo(() => summarize(progress), [progress]);

  const recent = useMemo<Opening[]>(() => {
    const fromProgress = recentInProgress(progress, 3)
      .map((r) => getOpeningById(r.openingId))
      .filter((o): o is Opening => Boolean(o));
    if (fromProgress.length >= 3) return fromProgress.slice(0, 3);
    // Pad with a stable fallback so the strip never shows empty
    const fallback = ["italian", "sicilian", "queens-gambit"]
      .map(getOpeningById)
      .filter((o): o is Opening => Boolean(o));
    const seen = new Set(fromProgress.map((o) => o.id));
    for (const f of fallback) {
      if (fromProgress.length >= 3) break;
      if (!seen.has(f.id)) fromProgress.push(f);
    }
    return fromProgress.slice(0, 3);
  }, [progress]);

  const progressFor = (id: string): number => {
    const entry = progress.openings[id];
    if (!entry) return 0;
    const o = getOpeningById(id);
    if (!o) return 0;
    return Math.min(1, entry.pliesViewed / o.moves.length);
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        left={<Wordmark />}
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <IconBtn ariaLabel="Buscar">
              <Icon name="search" size={15} />
            </IconBtn>
            <IconBtn ariaLabel="Cuenta">
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 14,
                  fontStyle: "italic",
                }}
              >
                A
              </span>
            </IconBtn>
          </div>
        }
      />

      {/* Editorial hero */}
      <div style={{ padding: "6px 22px 18px" }}>
        <div
          className="tab-label"
          style={{ color: "var(--copper)", marginBottom: 8 }}
        >
          · Tomo I — Apertura del día
        </div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: -0.5,
            color: "var(--ink)",
          }}
        >
          Estudia las<br />
          <em style={{ fontWeight: 400 }}>aperturas</em> que<br />
          moldearon el ajedrez.
        </h1>
        <p
          style={{
            marginTop: 14,
            marginBottom: 0,
            fontSize: 13.5,
            lineHeight: 1.55,
            color: "var(--ink-2)",
            maxWidth: 320,
          }}
        >
          Cinco siglos de teoría reunidos en doce líneas esenciales. Aprende a
          tu ritmo, una apertura cada día.
        </p>
      </div>

      {/* Daily opening card */}
      <div style={{ padding: "0 18px" }}>
        <Link
          href={`/apertura/${daily.id}`}
          style={{
            display: "block",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              position: "relative",
              background:
                "linear-gradient(150deg, #221d18 0%, #15110d 100%)",
              border: "1px solid var(--line)",
              borderRadius: 18,
              overflow: "hidden",
              padding: 18,
              display: "flex",
              gap: 14,
              boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ width: 120, flexShrink: 0 }}>
              <MiniBoard
                moves={daily.moves}
                ply={daily.moves.length}
                size={120}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minWidth: 0,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      color: "var(--copper)",
                      letterSpacing: 0.5,
                    }}
                  >
                    {daily.eco}
                  </span>
                  <span style={{ color: "var(--ink-faint)" }}>·</span>
                  <span
                    className="tab-label"
                    style={{ fontSize: 9, color: "var(--ink-mute)" }}
                  >
                    {daily.familyLabel}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontWeight: 500,
                    fontSize: 22,
                    lineHeight: 1.05,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  {daily.name}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    lineHeight: 1.4,
                    color: "var(--ink-mute)",
                  }}
                >
                  {daily.tagline}
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--gold)",
                  fontSize: 11.5,
                  fontWeight: 600,
                }}
              >
                Comenzar lección
                <Icon name="arrow-right" size={12} strokeWidth={2} />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Progress strip */}
      <div
        style={{
          margin: "20px 18px 4px",
          padding: "14px 16px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {[
          { v: stats.learned.toString(), l: "aprendidas" },
          { v: stats.inStudy.toString(), l: "en estudio" },
          { v: stats.streak.toString(), l: "racha · días" },
        ].map((s, i) => (
          <div key={s.l} style={{ display: "contents" }}>
            {i > 0 && (
              <div style={{ width: 1, background: "var(--line)" }} />
            )}
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 26,
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                className="tab-label"
                style={{
                  fontSize: 9,
                  color: "var(--ink-mute)",
                  marginTop: 4,
                }}
              >
                {s.l}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue learning */}
      <div style={{ padding: "24px 18px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 10,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: 18,
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            Continúa donde lo dejaste
          </h3>
          <Link
            href="/biblioteca"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-mute)",
              fontSize: 11,
              textDecoration: "none",
            }}
          >
            Ver todo
          </Link>
        </div>
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            margin: "0 -18px",
            padding: "0 18px",
          }}
        >
          {recent.map((o) => {
            const pct = progressFor(o.id);
            return (
              <Link
                key={o.id}
                href={`/apertura/${o.id}`}
                style={{
                  flexShrink: 0,
                  width: 152,
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: 12,
                  textAlign: "left",
                  color: "var(--ink)",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <MiniBoard
                    moves={o.moves}
                    ply={Math.min(4, o.moves.length)}
                    size={128}
                  />
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 9,
                    color: "var(--copper)",
                    letterSpacing: 0.4,
                  }}
                >
                  {o.eco}
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--ink)",
                    marginTop: 2,
                    lineHeight: 1.15,
                  }}
                >
                  {o.name}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    height: 3,
                    borderRadius: 3,
                    background: "rgba(241,234,215,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(6, pct * 100)}%`,
                      height: "100%",
                      background: "var(--copper)",
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Families */}
      <div style={{ padding: "28px 18px 0" }}>
        <h3
          style={{
            margin: "0 0 14px",
            fontFamily: "var(--serif)",
            fontSize: 18,
            fontWeight: 500,
            color: "var(--ink)",
          }}
        >
          Explora por familia
        </h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {FAMILIES.map((f, i) => {
            const count = OPENINGS.filter((o) => o.family === f.id).length;
            return (
              <Link
                key={f.id}
                href={`/biblioteca?familia=${f.id}`}
                style={{
                  padding: "14px 0",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textAlign: "left",
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 24,
                    color: "var(--copper)",
                    width: 28,
                    textAlign: "center",
                  }}
                >
                  {f.roman}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 17,
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.1,
                    }}
                  >
                    {f.label}
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
                    {f.subtitle}
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
                  {count}
                </span>
                <span style={{ color: "var(--ink-faint)" }}>
                  <Icon name="chevron-right" size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div style={{ height: 30 }} />
    </div>
  );
}
