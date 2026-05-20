"use client";

import Link from "next/link";
import { MiniBoard } from "@/components/board/MiniBoard";
import { Icon } from "@/components/ui/Icon";
import { OPENINGS } from "@/data/openings";

interface Props {
  /** Used to build the link target — e.g. `/practica/memoria/${id}`. */
  hrefBase: string;
  intro?: string;
}

/**
 * A compact list of the 12 openings, used as the entry point for practice
 * modes that target one opening at a time. Reuses the visual language of the
 * library list at a tighter size.
 */
export function OpeningPicker({ hrefBase, intro }: Props) {
  return (
    <div style={{ padding: "0 18px" }}>
      {intro && (
        <p
          style={{
            marginTop: 0,
            marginBottom: 16,
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--ink-2)",
          }}
        >
          {intro}
        </p>
      )}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {OPENINGS.map((o, i) => (
          <Link
            key={o.id}
            href={`${hrefBase}/${o.id}`}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderTop:
                i === 0 ? "none" : "1px solid var(--line-soft)",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                flexShrink: 0,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <MiniBoard
                moves={o.moves}
                ply={Math.min(o.moves.length, 5)}
                size={48}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
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
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  marginTop: 2,
                }}
              >
                {o.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-mute)",
                  marginTop: 2,
                }}
              >
                {o.moves.length} jugadas
              </div>
            </div>
            <span style={{ color: "var(--ink-faint)" }}>
              <Icon name="chevron-right" size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
