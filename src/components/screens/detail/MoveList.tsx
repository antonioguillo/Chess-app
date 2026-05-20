"use client";

import { useMemo } from "react";
import type { Move } from "@/lib/types";

interface Props {
  moves: readonly Move[];
  ply: number;
  onJump: (ply: number) => void;
}

interface Pair {
  num: number;
  white: Move;
  black: Move | null;
  whiteIdx: number;
  blackIdx: number;
}

export function MoveList({ moves, ply, onJump }: Props) {
  const pairs = useMemo<Pair[]>(() => {
    const out: Pair[] = [];
    for (let i = 0; i < moves.length; i += 2) {
      out.push({
        num: i / 2 + 1,
        white: moves[i]!,
        black: moves[i + 1] ?? null,
        whiteIdx: i,
        blackIdx: i + 1,
      });
    }
    return out;
  }, [moves]);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 10,
        padding: "4px 6px",
        fontFamily: "var(--mono)",
      }}
    >
      {pairs.map((mp, i) => (
        <div
          key={mp.num}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 6px",
            borderTop: i === 0 ? "none" : "1px solid var(--line-soft)",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 22,
              fontSize: 11,
              color: "var(--ink-faint)",
              textAlign: "right",
            }}
          >
            {mp.num}.
          </span>
          <MoveButton
            san={mp.white.san}
            target={mp.whiteIdx + 1}
            ply={ply}
            onJump={onJump}
          />
          {mp.black ? (
            <MoveButton
              san={mp.black.san}
              target={mp.blackIdx + 1}
              ply={ply}
              onJump={onJump}
            />
          ) : (
            <div style={{ flex: 1 }} />
          )}
        </div>
      ))}
    </div>
  );
}

interface MoveButtonProps {
  san: string;
  target: number;
  ply: number;
  onJump: (ply: number) => void;
}

function MoveButton({ san, target, ply, onJump }: MoveButtonProps) {
  const current = ply === target;
  const played = ply >= target;
  return (
    <button
      type="button"
      onClick={() => onJump(target)}
      style={{
        flex: 1,
        padding: "6px 10px",
        borderRadius: 6,
        background: current ? "rgba(199,155,101,0.18)" : "transparent",
        border: `1px solid ${
          current ? "rgba(199,155,101,0.4)" : "transparent"
        }`,
        color: played ? "var(--ink)" : "var(--ink-mute)",
        fontFamily: "var(--mono)",
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {san}
    </button>
  );
}
