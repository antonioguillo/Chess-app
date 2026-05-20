interface Props {
  size?: number;
}

export function Wordmark({ size = 18 }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: size + 2,
          fontWeight: 500,
          color: "var(--ink)",
          letterSpacing: 0.2,
        }}
      >
        Gambito
      </span>
    </div>
  );
}
