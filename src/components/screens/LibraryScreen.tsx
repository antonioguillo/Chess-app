"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { MiniBoard } from "@/components/board/MiniBoard";
import { IconBtn } from "@/components/chrome/IconBtn";
import { TopBar } from "@/components/chrome/TopBar";
import { Chip } from "@/components/ui/Chip";
import { ColorDot } from "@/components/ui/ColorDot";
import { Icon } from "@/components/ui/Icon";
import { Popularity } from "@/components/ui/Popularity";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FAMILIES,
  LIBRARY_FILTERS,
  type LibraryFilter,
} from "@/data/families";
import { OPENINGS } from "@/data/openings";

function parseFilter(value: string | null): LibraryFilter {
  if (!value) return "all";
  const found = LIBRARY_FILTERS.find((f) => f.id === value);
  return found ? found.id : "all";
}

export function LibraryScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const filter = parseFilter(params.get("familia"));

  const setFilter = useCallback(
    (next: LibraryFilter) => {
      const qs = next === "all" ? "" : `?familia=${next}`;
      router.replace(`/biblioteca${qs}`, { scroll: false });
    },
    [router],
  );

  const visibleFamilies = useMemo(
    () =>
      filter === "all" ? FAMILIES : FAMILIES.filter((f) => f.id === filter),
    [filter],
  );

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        left={
          <IconBtn ariaLabel="Menú">
            <Icon name="menu" size={14} strokeWidth={2} />
          </IconBtn>
        }
        center={
          <span
            className="tab-label"
            style={{ color: "var(--ink-mute)" }}
          >
            Biblioteca
          </span>
        }
        right={
          <IconBtn ariaLabel="Buscar">
            <Icon name="search" size={15} />
          </IconBtn>
        }
      />

      <div style={{ padding: "4px 22px 14px" }}>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: 1,
            margin: 0,
            color: "var(--ink)",
            letterSpacing: -0.5,
          }}
        >
          El <em style={{ fontWeight: 400 }}>repertorio</em>
        </h1>
        <p
          style={{
            marginTop: 8,
            marginBottom: 0,
            fontSize: 12.5,
            lineHeight: 1.5,
            color: "var(--ink-mute)",
          }}
        >
          Doce aperturas, ordenadas por familia clásica. Cada una con su
          historia, sus ideas y sus variantes principales.
        </p>
      </div>

      {/* Filter chips */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: 7,
          overflowX: "auto",
          padding: "6px 18px 14px",
          margin: 0,
        }}
      >
        {LIBRARY_FILTERS.map((f) => (
          <Chip
            key={f.id}
            active={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Chip>
        ))}
      </div>

      {/* Family sections */}
      <div style={{ padding: "0 18px" }}>
        {visibleFamilies.map((f, fi) => {
          const items = OPENINGS.filter((o) => o.family === f.id);
          if (items.length === 0) return null;
          return (
            <div key={f.id} style={{ marginBottom: 22 }}>
              <div
                style={{
                  marginBottom: 12,
                  marginTop: fi === 0 ? 4 : 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <SectionLabel
                  roman={f.roman}
                  title={f.label}
                  subtitle={f.subtitle}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: "var(--ink-faint)",
                  }}
                >
                  {items.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                {items.map((o, i) => (
                  <Link
                    key={o.id}
                    href={`/apertura/${o.id}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      background: "transparent",
                      border: "none",
                      borderTop:
                        i === 0 ? "none" : "1px solid var(--line-soft)",
                      color: "var(--ink)",
                      textAlign: "left",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        flexShrink: 0,
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <MiniBoard
                        moves={o.moves}
                        ply={Math.min(o.moves.length, 5)}
                        size={50}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 3,
                        }}
                      >
                        <ColorDot color={o.color} />
                        <span
                          className="mono"
                          style={{
                            fontSize: 9,
                            color: "var(--ink-mute)",
                            letterSpacing: 0.4,
                          }}
                        >
                          {o.eco}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.1,
                          color: "var(--ink)",
                        }}
                      >
                        {o.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--ink-mute)",
                          marginTop: 3,
                          lineHeight: 1.35,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {o.tagline}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 6,
                      }}
                    >
                      <Popularity value={o.popularity} />
                      <span
                        className="mono"
                        style={{
                          fontSize: 9,
                          color: "var(--ink-faint)",
                          letterSpacing: 0.3,
                        }}
                      >
                        {o.difficulty.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
