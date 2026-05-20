import { OpeningPicker } from "@/components/practice/OpeningPicker";
import { PracticeHeader } from "@/components/practice/PracticeHeader";

export const metadata = {
  title: "Reproducir de memoria — Gambito",
};

export default function MemoryPickerPage() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <PracticeHeader backHref="/practica" label="Memoria" />
      <div style={{ padding: "0 22px 16px" }}>
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
          Reproduce <em style={{ fontWeight: 400 }}>de memoria</em>
        </h1>
      </div>
      <OpeningPicker
        hrefBase="/practica/memoria"
        intro="Elige una apertura para jugar su línea principal sin pistas. Si te bloqueas, puedes pedir una pista en cualquier momento."
      />
    </div>
  );
}
