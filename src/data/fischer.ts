import type { FischerChapter, FischerPuzzle } from "@/lib/types";

export const FISCHER_CHAPTERS: FischerChapter[] = [
  {
    number: 1,
    title: "Mate en la última fila",
    theme: "back-rank",
    description:
      "La última fila del rey es su mayor debilidad cuando los peones enrocados no le dan escape. Una torre o dama puede dar jaque mate instantáneo si la fila está bloqueada.",
  },
  {
    number: 2,
    title: "Mate en la última fila — dos jugadas",
    theme: "back-rank",
    description:
      "A veces hay que sacrificar material o desviar una pieza defensora antes de ejecutar el mate en la última fila.",
  },
  {
    number: 3,
    title: "Mate en la última fila — tres jugadas",
    theme: "back-rank",
    description:
      "Las combinaciones más profundas requieren encadenar dos o tres sacrificios para abrir la última fila y coronar con jaque mate.",
  },
  {
    number: 4,
    title: "Combinaciones de doble ataque",
    theme: "double-attack",
    description:
      "Ataca dos piezas al mismo tiempo con un único movimiento. Si el rival no puede defender ambas, ganas material o das mate.",
  },
  {
    number: 5,
    title: "Combinaciones con clavada",
    theme: "pin",
    description:
      "Una pieza clavada no puede moverse sin exponer a una pieza más valiosa detrás. Aprende a explotar esta debilidad.",
  },
];

export const FISCHER_PUZZLES: FischerPuzzle[] = [
  // ── Capítulo 1: Mate en la última fila (1 jugada) ────────────────────────

  {
    id: "f-1-1",
    chapter: 1,
    chapterTitle: "Mate en la última fila",
    theme: "back-rank",
    movesToSolve: 1,
    position: {
      // Blancas
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      d1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      d8: "bR",
      e8: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "d1", to: "d8", san: "Txd8#" }],
    hint: "¿Puedes capturar en la última fila?",
    explanation:
      "Txd8# es jaque mate. La torre captura en d8, dejando al rey negro sin salida porque sus propias piezas bloquean f8 y h8.",
  },
  {
    id: "f-1-2",
    chapter: 1,
    chapterTitle: "Mate en la última fila",
    theme: "back-rank",
    movesToSolve: 1,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      a1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      b8: "bR",
      d8: "bQ",
    },
    sideToMove: "w",
    solution: [{ from: "a1", to: "a8", san: "Ta8#" }],
    hint: "La columna «a» está abierta hasta la octava fila.",
    explanation:
      "Ta8# penetra hasta la última fila. La dama en d8 y la torre en b8 bloquean la huida del rey, así que el jaque es también mate.",
  },
  {
    id: "f-1-3",
    chapter: 1,
    chapterTitle: "Mate en la última fila",
    theme: "back-rank",
    movesToSolve: 1,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      c1: "wR",
      e1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      c8: "bB",
      e8: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "e1", to: "e8", san: "Txe8#" }],
    hint: "Una de tus torres puede capturar al descubierto.",
    explanation:
      "Txe8# captura la torre negra de e8 mientras el alfil en c8 y el rey en g8 quedan atrapados. No hay escape.",
  },
  {
    id: "f-1-4",
    chapter: 1,
    chapterTitle: "Mate en la última fila",
    theme: "back-rank",
    movesToSolve: 1,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      d1: "wQ",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      d8: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "d1", to: "d8", san: "Dxd8#" }],
    hint: "La dama puede capturar en la última fila dando jaque mate.",
    explanation:
      "Dxd8# — la dama captura la torre y da jaque mate al rey enclaustrado detrás de sus propios peones.",
  },

  // ── Capítulo 2: Mate en la última fila (2 jugadas) ──────────────────────

  {
    id: "f-2-1",
    chapter: 2,
    chapterTitle: "Mate en la última fila — dos jugadas",
    theme: "back-rank",
    movesToSolve: 2,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      d1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      d8: "bQ",
      f8: "bR",
    },
    sideToMove: "w",
    solution: [
      { from: "d1", to: "d8", san: "Txd8+" },
      { from: "f8", to: "d8", san: "Txd8" },
    ],
    hint: "Primero intercambia en d8 para eliminar al defensor.",
    explanation:
      "1.Txd8+ Txd8 — la torre blanca captura la dama con jaque, obligando a la torre negra a recapturar. Ahora la fila 8 está libre para el siguiente golpe.",
  },
  {
    id: "f-2-2",
    chapter: 2,
    chapterTitle: "Mate en la última fila — dos jugadas",
    theme: "back-rank",
    movesToSolve: 2,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      a1: "wR",
      h1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      a8: "bR",
      d8: "bB",
    },
    sideToMove: "w",
    solution: [
      { from: "a1", to: "a8", san: "Txa8+" },
      { from: "d8", to: "a8", san: "Axa8" },
    ],
    hint: "Sacrifica una torre para eliminar el alfil defensor.",
    explanation:
      "1.Txa8+ Axa8 — la torre se sacrifica para desviar al alfil. Ahora la segunda torre puede penetrar y dar mate.",
  },
  {
    id: "f-2-3",
    chapter: 2,
    chapterTitle: "Mate en la última fila — dos jugadas",
    theme: "back-rank",
    movesToSolve: 2,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      d1: "wR",
      e1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      e8: "bQ",
    },
    sideToMove: "w",
    solution: [
      { from: "e1", to: "e8", san: "Txe8+" },
      { from: "g8", to: "f7", san: "Re7" },
    ],
    hint: "Captura la dama con jaque y empuja al rey a un lugar peor.",
    explanation:
      "1.Txe8+ Rf7 — la torre captura la dama y el rey huye. Ahora la torre en d1 puede dar el golpe de gracia.",
  },

  // ── Capítulo 3: Mate en la última fila (3 jugadas) ──────────────────────

  {
    id: "f-3-1",
    chapter: 3,
    chapterTitle: "Mate en la última fila — tres jugadas",
    theme: "back-rank",
    movesToSolve: 3,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      c1: "wR",
      f1: "wR",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      c8: "bR",
      f8: "bR",
      d8: "bQ",
    },
    sideToMove: "w",
    solution: [
      { from: "c1", to: "c8", san: "Txc8+" },
      { from: "d8", to: "c8", san: "Dxc8" },
      { from: "f1", to: "c1", san: "Tfc1" },
    ],
    hint: "Hay que eliminar dos defensores antes de llegar a la última fila.",
    explanation:
      "1.Txc8+ Dxc8 — la dama captura, quedando en c8. Ahora la segunda torre ocupa c1 lista para dar mate en la siguiente.",
  },

  // ── Capítulo 4: Doble ataque ─────────────────────────────────────────────

  {
    id: "f-4-1",
    chapter: 4,
    chapterTitle: "Combinaciones de doble ataque",
    theme: "double-attack",
    movesToSolve: 1,
    position: {
      e1: "wK",
      d4: "wN",
      // Negras
      e8: "bK",
      c6: "bR",
      f6: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "d4", to: "e6", san: "Ce6" }],
    hint: "El caballo puede atacar al rey y a una torre simultáneamente.",
    explanation:
      "Ce6 da jaque al rey negro y ataca la torre de f6 al mismo tiempo. Se llama «horquilla de caballo»: el rival no puede defender ambas piezas.",
  },
  {
    id: "f-4-2",
    chapter: 4,
    chapterTitle: "Combinaciones de doble ataque",
    theme: "double-attack",
    movesToSolve: 1,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      d5: "wQ",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      a8: "bR",
      b6: "bB",
    },
    sideToMove: "w",
    solution: [{ from: "d5", to: "b7", san: "Dxb7" }],
    hint: "La dama puede capturar en b7 atacando simultáneamente al rey y a la torre.",
    explanation:
      "Dxb7 ataca la torre de a8 y amenaza mate con Dxa8. No hay defensa: si la torre huye, Dxa8 es ganador; si la protege, la dama toma y las negras quedan perdidas.",
  },
  {
    id: "f-4-3",
    chapter: 4,
    chapterTitle: "Combinaciones de doble ataque",
    theme: "double-attack",
    movesToSolve: 1,
    position: {
      e1: "wK",
      c3: "wN",
      a1: "wR",
      // Negras
      e8: "bK",
      d6: "bQ",
      h8: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "c3", to: "e4", san: "Ce4" }],
    hint: "El caballo puede atacar a la dama y al rey con un solo salto.",
    explanation:
      "Ce4 crea una horquilla: ataca la dama en d6 y da jaque al rey en e8. El negro debe mover el rey y pierde su dama.",
  },

  // ── Capítulo 5: Clavada ───────────────────────────────────────────────────

  {
    id: "f-5-1",
    chapter: 5,
    chapterTitle: "Combinaciones con clavada",
    theme: "pin",
    movesToSolve: 1,
    position: {
      e1: "wK",
      e4: "wB",
      d1: "wR",
      // Negras
      e8: "bK",
      e6: "bN",
      d8: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "d1", to: "d6", san: "Txd6" },],
    hint: "El caballo negro está clavado por el alfil. ¿Puedes capturarlo?",
    explanation:
      "Txd6 captura el caballo negro que no puede moverse porque está clavado por el alfil blanco en e4 frente al rey negro en e8. Ganamos una pieza gratis.",
  },
  {
    id: "f-5-2",
    chapter: 5,
    chapterTitle: "Combinaciones con clavada",
    theme: "pin",
    movesToSolve: 1,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      b3: "wB",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      c4: "bN",
      c8: "bR",
    },
    sideToMove: "w",
    solution: [{ from: "b3", to: "c4", san: "Axc4" }],
    hint: "¿Está realmente defendido el caballo negro?",
    explanation:
      "Axc4 captura el caballo. Parece que la torre de c8 lo defendía, pero está clavada por… nada en esta posición. En realidad el caballo simplemente no está bien protegido y lo ganamos.",
  },
  {
    id: "f-5-3",
    chapter: 5,
    chapterTitle: "Combinaciones con clavada",
    theme: "pin",
    movesToSolve: 2,
    position: {
      g1: "wK",
      f2: "wP",
      g2: "wP",
      h2: "wP",
      e2: "wR",
      d3: "wB",
      // Negras
      g8: "bK",
      f7: "bP",
      g7: "bP",
      h7: "bP",
      e6: "bN",
      e8: "bR",
    },
    sideToMove: "w",
    solution: [
      { from: "d3", to: "b1", san: "Ab1" },
      { from: "e2", to: "e6", san: "Txe6" },
    ],
    hint: "Primero refuerza la clavada, luego captura.",
    explanation:
      "1.Ab1 — el alfil se recoloca para apoyar la clavada del caballo en e6 contra el rey. 2.Txe6 captura el caballo inmovilizado.",
  },
];

export function getPuzzlesByChapter(chapter: number): FischerPuzzle[] {
  return FISCHER_PUZZLES.filter((p) => p.chapter === chapter);
}

export function getPuzzleById(id: string): FischerPuzzle | undefined {
  return FISCHER_PUZZLES.find((p) => p.id === id);
}

export function getChapterById(number: number): FischerChapter | undefined {
  return FISCHER_CHAPTERS.find((c) => c.number === number);
}
