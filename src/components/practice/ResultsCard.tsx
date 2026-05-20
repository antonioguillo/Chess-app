"use client";

import Link from "next/link";

interface Stat {
  label: string;
  value: string;
}

interface Action {
  label: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
}

interface Props {
  title: string;
  /** Italicized word inside the title for editorial flair. */
  italicWord?: string;
  subtitle?: string;
  stats: Stat[];
  actions: Action[];
}

export function ResultsCard({
  title,
  italicWord,
  subtitle,
  stats,
  actions,
}: Props) {
  const titleNode = italicWord ? (
    <>
      {title.replace(italicWord, "")}
      <em style={{ fontWeight: 400 }}>{italicWord}</em>
    </>
  ) : (
    title
  );

  return (
    <div style={{ padding: "20px 22px" }}>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 500,
          fontSize: 32,
          lineHeight: 1.05,
          margin: 0,
          color: "var(--ink)",
        }}
      >
        {titleNode}
      </h1>
      {subtitle && (
        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--ink-mute)",
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          margin: "22px 0 0",
          padding: "16px 18px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: "contents" }}>
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
                {s.value}
              </div>
              <div
                className="tab-label"
                style={{
                  fontSize: 9,
                  color: "var(--ink-mute)",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {actions.map((a) => {
          const style: React.CSSProperties = {
            display: "block",
            width: "100%",
            padding: "12px 16px",
            borderRadius: 999,
            textAlign: "center",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.3,
            cursor: "pointer",
            border: a.primary
              ? "1px solid rgba(199,155,101,0.5)"
              : "1px solid rgba(241,234,215,0.14)",
            background: a.primary
              ? "linear-gradient(180deg, #d2a26d 0%, #a47a48 100%)"
              : "transparent",
            color: a.primary ? "#1a1410" : "var(--ink-2)",
            fontFamily: "var(--sans)",
          };
          if (a.href) {
            return (
              <Link key={a.label} href={a.href} style={style}>
                {a.label}
              </Link>
            );
          }
          return (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              style={style}
            >
              {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
