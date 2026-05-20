"use client";

export type FeedbackTone = "success" | "error" | "neutral";

interface Props {
  tone: FeedbackTone;
  title: string;
  detail?: string;
}

const TONE_PALETTE: Record<FeedbackTone, { border: string; label: string }> = {
  success: {
    border: "rgba(140, 200, 130, 0.55)",
    label: "rgba(180, 220, 160, 0.95)",
  },
  error: {
    border: "rgba(220, 100, 90, 0.55)",
    label: "var(--crimson)",
  },
  neutral: {
    border: "rgba(199, 155, 101, 0.5)",
    label: "var(--copper)",
  },
};

const TONE_PREFIX: Record<FeedbackTone, string> = {
  success: "· Bien jugado",
  error: "· Intenta de nuevo",
  neutral: "· Pista",
};

export function Feedback({ tone, title, detail }: Props) {
  const palette = TONE_PALETTE[tone];
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderLeft: `2px solid ${palette.border}`,
        borderRadius: 4,
        padding: "12px 14px",
      }}
    >
      <div
        className="tab-label"
        style={{ fontSize: 9, color: palette.label, marginBottom: 4 }}
      >
        {TONE_PREFIX[tone]}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 14,
          lineHeight: 1.45,
          color: "var(--ink)",
        }}
      >
        {title}
      </div>
      {detail && (
        <div
          style={{
            marginTop: 6,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--ink-2)",
            lineHeight: 1.45,
          }}
        >
          {detail}
        </div>
      )}
    </div>
  );
}
