import { OpeningPicker } from "@/components/practice/OpeningPicker";
import { PracticeHeader } from "@/components/practice/PracticeHeader";

export const metadata = {
  title: "Encuentra la jugada — Gambito",
};

export default function FindMovePickerPage() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <PracticeHeader backHref="/practica" label="Jugada característica" />
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
          Encuentra <em style={{ fontWeight: 400 }}>la jugada</em>
        </h1>
      </div>
      <OpeningPicker
        hrefBase="/practica/jugada"
        intro="Mostraremos la posición justo antes de la jugada que define cada apertura. Tu reto: encontrarla."
      />
    </div>
  );
}
