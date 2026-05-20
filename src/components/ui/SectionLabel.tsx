interface Props {
  roman?: string;
  title: string;
  subtitle?: string;
}

export function SectionLabel({ roman, title, subtitle }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      {roman && (
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 26,
            color: "var(--copper)",
            lineHeight: 1,
            width: 28,
            textAlign: "center",
          }}
        >
          {roman}
        </span>
      )}
      <div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 19,
            fontWeight: 500,
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="mono"
            style={{
              fontSize: 10.5,
              color: "var(--ink-mute)",
              marginTop: 3,
              letterSpacing: 0.3,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
