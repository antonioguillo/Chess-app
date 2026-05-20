"use client";

import Link from "next/link";
import { TopBar } from "@/components/chrome/TopBar";
import { Icon } from "@/components/ui/Icon";

interface Props {
  /** Where the back/close link should go. */
  backHref: string;
  /** Small-caps label shown centered (e.g. "Memoria · Ruy López"). */
  label: string;
  /** Optional progress text (e.g. "JUGADA 03 / 07" or "PREGUNTA 04 / 10"). */
  progress?: string;
}

export function PracticeHeader({ backHref, label, progress }: Props) {
  return (
    <>
      <TopBar
        left={
          <Link
            href={backHref}
            aria-label="Salir"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-2)",
              padding: 0,
              textDecoration: "none",
              display: "inline-flex",
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
            {label}
          </span>
        }
        right={<span style={{ width: 28 }} />}
      />
      {progress && (
        <div
          className="mono"
          style={{
            padding: "0 22px 12px",
            fontSize: 10,
            letterSpacing: 0.5,
            color: "var(--ink-faint)",
            textAlign: "center",
          }}
        >
          {progress}
        </div>
      )}
    </>
  );
}
