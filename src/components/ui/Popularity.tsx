interface Props {
  value: 1 | 2 | 3 | 4 | 5;
  size?: number;
}

export function Popularity({ value, size = 5 }: Props) {
  return (
    <div style={{ display: "inline-flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: size,
            background:
              i <= value ? "var(--copper)" : "rgba(241,234,215,0.13)",
          }}
        />
      ))}
    </div>
  );
}
