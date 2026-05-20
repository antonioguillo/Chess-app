import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "60px 22px", textAlign: "center" }}>
      <div
        className="tab-label"
        style={{ color: "var(--copper)", marginBottom: 8 }}
      >
        · 404
      </div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 500,
          fontSize: 32,
          lineHeight: 1,
          margin: 0,
          color: "var(--ink)",
        }}
      >
        Esta <em style={{ fontWeight: 400 }}>página</em>
        <br /> no existe.
      </h1>
      <p
        style={{
          marginTop: 14,
          fontSize: 13,
          color: "var(--ink-mute)",
        }}
      >
        Quizá quieras volver al estudio.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: 22,
          padding: "10px 18px",
          borderRadius: 999,
          background: "rgba(199,155,101,0.16)",
          border: "1px solid rgba(199,155,101,0.45)",
          color: "var(--gold)",
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
