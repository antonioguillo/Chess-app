"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChessBoard } from "@/components/board/ChessBoard";
import { piecesAfter } from "@/components/board/boardEngine";
import { IconBtn } from "@/components/chrome/IconBtn";
import { TopBar } from "@/components/chrome/TopBar";
import { ColorDot } from "@/components/ui/ColorDot";
import { Icon } from "@/components/ui/Icon";
import { Popularity } from "@/components/ui/Popularity";
import { useUserProgress } from "@/lib/progress";
import type { Opening } from "@/lib/types";
import { CtrlBtn } from "./CtrlBtn";
import { MoveList } from "./MoveList";

const AUTOPLAY_MS = 1100;

interface Props {
  opening: Opening;
}

export function DetailScreen({ opening }: Props) {
  const [ply, setPly] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { recordView } = useUserProgress();

  const moves = opening.moves;
  const total = moves.length;
  const currentMove = ply > 0 ? moves[ply - 1] : null;

  const pieces = useMemo(() => piecesAfter(moves, ply), [moves, ply]);

  // Reset when opening changes
  useEffect(() => {
    setPly(0);
    setPlaying(false);
  }, [opening.id]);

  // Auto-play loop
  useEffect(() => {
    if (!playing) return;
    if (ply >= total) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(
      () => setPly((p) => Math.min(total, p + 1)),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(t);
  }, [playing, ply, total]);

  // Persist progress as the user advances
  useEffect(() => {
    if (ply === 0) return;
    recordView(opening.id, ply, total);
  }, [ply, opening.id, total, recordView]);

  const jumpTo = useCallback((next: number) => {
    setPly(next);
    setPlaying(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (ply >= total) {
      setPly(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }, [ply, total]);

  // Format the "JUGADA NN" line
  const moveLabel = useMemo(() => {
    if (ply === 0) return "Posición inicial";
    const moveNum = Math.ceil(ply / 2);
    const prefix = ply % 2 === 1 ? "" : "… ";
    return `${moveNum}. ${prefix}${currentMove!.san}`;
  }, [ply, currentMove]);

  return (
    <div style={{ paddingBottom: 40 }}>
      <TopBar
        left={
          <Link
            href="/biblioteca"
            aria-label="Atrás"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-2)",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: 0,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            <Icon name="back" size={18} />
          </Link>
        }
        center={
          <span
            className="tab-label"
            style={{ color: "var(--ink-mute)" }}
          >
            Apertura · {opening.eco}
          </span>
        }
        right={
          <IconBtn ariaLabel="Compartir">
            <Icon name="share" size={14} />
          </IconBtn>
        }
      />

      {/* Editorial header */}
      <div style={{ padding: "0 22px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <ColorDot color={opening.color} />
          <span
            className="tab-label"
            style={{ fontSize: 9, color: "var(--ink-mute)" }}
          >
            {opening.familyLabel}
          </span>
          <span style={{ color: "var(--ink-faint)" }}>·</span>
          <span
            className="mono"
            style={{ fontSize: 10, color: "var(--ink-mute)" }}
          >
            {opening.year}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.0,
            margin: 0,
            color: "var(--ink)",
            letterSpacing: -0.4,
          }}
        >
          {opening.name}
        </h1>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--copper)",
            marginTop: 3,
          }}
        >
          {opening.spanish}
        </div>
      </div>

      {/* Board */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <ChessBoard pieces={pieces} lastMove={currentMove} size={362} />
      </div>

      {/* Move pill row */}
      <div
        style={{
          padding: "14px 22px 0",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--ink-faint)",
              letterSpacing: 0.4,
            }}
          >
            JUGADA {ply.toString().padStart(2, "0")} /{" "}
            {total.toString().padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 17,
              fontWeight: 500,
              color: ply === 0 ? "var(--ink-mute)" : "var(--ink)",
              marginTop: 2,
              fontStyle: ply === 0 ? "italic" : "normal",
            }}
          >
            {moveLabel}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <CtrlBtn
            ariaLabel="Reiniciar"
            onClick={() => {
              setPly(0);
              setPlaying(false);
            }}
            disabled={ply === 0}
          >
            <Icon name="reset" size={11} strokeWidth={2} />
          </CtrlBtn>
          <CtrlBtn
            ariaLabel="Anterior"
            onClick={() => {
              setPly((p) => Math.max(0, p - 1));
              setPlaying(false);
            }}
            disabled={ply === 0}
          >
            <Icon name="prev" size={11} strokeWidth={2} />
          </CtrlBtn>
          <CtrlBtn
            primary
            ariaLabel={playing ? "Pausar" : "Reproducir"}
            onClick={handlePlayPause}
          >
            <Icon name={playing ? "pause" : "play"} size={11} />
          </CtrlBtn>
          <CtrlBtn
            ariaLabel="Siguiente"
            onClick={() => {
              setPly((p) => Math.min(total, p + 1));
              setPlaying(false);
            }}
            disabled={ply === total}
          >
            <Icon name="next" size={11} strokeWidth={2} />
          </CtrlBtn>
        </div>
      </div>

      {/* Comment box */}
      <div style={{ padding: "14px 22px 0" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderLeft: "2px solid var(--copper)",
            borderRadius: 4,
            padding: "12px 14px",
            minHeight: 60,
          }}
        >
          <div
            className="tab-label"
            style={{
              fontSize: 9,
              color: "var(--copper)",
              marginBottom: 4,
            }}
          >
            · Comentario
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 14,
              lineHeight: 1.45,
              color: "var(--ink)",
            }}
          >
            {currentMove
              ? currentMove.note
              : "Posición inicial. Pulsa ▷ para comenzar a reproducir la línea principal de la apertura."}
          </div>
        </div>
      </div>

      {/* Move list */}
      <div style={{ padding: "20px 22px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: 17,
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            Línea principal
          </h3>
          <span
            className="mono"
            style={{ fontSize: 10, color: "var(--ink-faint)" }}
          >
            NOTACIÓN ESPAÑOLA
          </span>
        </div>
        <MoveList moves={moves} ply={ply} onJump={jumpTo} />
      </div>

      {/* History & Idea */}
      <div style={{ padding: "24px 22px 0" }}>
        <div
          className="tab-label"
          style={{ color: "var(--copper)", marginBottom: 6 }}
        >
          · Historia
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontSize: 14.5,
            lineHeight: 1.55,
            color: "var(--ink-2)",
          }}
        >
          {opening.description}
        </p>
      </div>

      <div style={{ padding: "20px 22px 0" }}>
        <div
          className="tab-label"
          style={{ color: "var(--copper)", marginBottom: 6 }}
        >
          · Idea estratégica
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontSize: 14.5,
            lineHeight: 1.55,
            color: "var(--ink-2)",
          }}
        >
          {opening.idea}
        </p>
      </div>

      {/* Meta footer */}
      <div
        style={{
          margin: "22px 22px 0",
          padding: "14px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MetaCell label="Bando" align="left">
          {opening.color}
        </MetaCell>
        <MetaCell label="Dificultad" align="center">
          {opening.difficulty}
        </MetaCell>
        <MetaCell label="Popularidad" align="right">
          <Popularity value={opening.popularity} size={6} />
        </MetaCell>
      </div>

      <div style={{ height: 30 }} />
    </div>
  );
}

function MetaCell({
  label,
  children,
  align,
}: {
  label: string;
  children: React.ReactNode;
  align: "left" | "center" | "right";
}) {
  return (
    <div style={{ textAlign: align, flex: 1 }}>
      <div
        className="tab-label"
        style={{ fontSize: 9, color: "var(--ink-mute)", marginBottom: 5 }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 13,
          fontStyle: "italic",
          color: "var(--ink)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
