import type { Opening } from "@/lib/types";

/**
 * Canonical 12-opening dataset for Gambito.
 *
 * Copied verbatim from the design handoff (openings.jsx). Move objects use
 * { from, to, san, note } — `san` is Spanish algebraic notation:
 *   C = Caballo (N), A = Alfil (B), T = Torre (R), D = Dama (Q), R = Rey (K).
 *
 * When extending: add new openings here, optionally with longer move lists or
 * variants. The detail screen and library auto-pick up new entries.
 */
export const OPENINGS: readonly Opening[] = [
  {
    id: "ruy-lopez",
    name: "Ruy López",
    spanish: "Apertura Española",
    eco: "C60–C99",
    family: "open",
    familyLabel: "Juegos abiertos",
    color: "Blancas",
    popularity: 5,
    difficulty: "Intermedio",
    year: 1561,
    tagline:
      "La apertura del sacerdote español que sigue vigente cinco siglos después.",
    description:
      "Nombrada en honor a Ruy López de Segura, sacerdote y maestro español del siglo XVI. Es una de las aperturas más estudiadas en la historia del ajedrez y permanece en el repertorio de los mejores jugadores del mundo.",
    idea: "Las blancas presionan al caballo defensor del peón e5 con el alfil, preparando un juego posicional rico en ideas estratégicas. Ofrece líneas tanto agresivas como tranquilas.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "El rey reclama el centro y libera diagonales para el alfil y la dama." },
      { from: "e7", to: "e5", san: "e5", note: "Las negras responden simétricamente, ocupando su mitad del centro." },
      { from: "g1", to: "f3", san: "Cf3", note: "Desarrollo natural atacando el peón e5." },
      { from: "b8", to: "c6", san: "Cc6", note: "Defendiendo el peón y desarrollando hacia el centro." },
      { from: "f1", to: "b5", san: "Ab5", note: "El movimiento característico: el alfil clava el caballo defensor." },
      { from: "a7", to: "a6", san: "a6", note: "La variante Morphy. Las negras cuestionan al alfil de inmediato." },
      { from: "b5", to: "a4", san: "Aa4", note: "El alfil se retira manteniendo la presión a distancia." },
    ],
  },
  {
    id: "italian",
    name: "Apertura Italiana",
    spanish: "Giuoco Piano",
    eco: "C50–C54",
    family: "open",
    familyLabel: "Juegos abiertos",
    color: "Blancas",
    popularity: 4,
    difficulty: "Principiante",
    year: 1490,
    tagline:
      'El "juego tranquilo" italiano: claridad clásica y desarrollo armónico.',
    description:
      "Una de las aperturas más antiguas, popularizada por los maestros italianos del Renacimiento. Sigue siendo la puerta de entrada favorita para aprender los principios clásicos.",
    idea: "Desarrollo rápido apuntando al punto débil f7. Combina facilidad de aprendizaje con profundidad estratégica notable en sus variantes modernas.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "Control central inmediato." },
      { from: "e7", to: "e5", san: "e5", note: "Respuesta clásica simétrica." },
      { from: "g1", to: "f3", san: "Cf3", note: "Atacando e5 y desarrollando." },
      { from: "b8", to: "c6", san: "Cc6", note: "Defensa natural del peón." },
      { from: "f1", to: "c4", san: "Ac4", note: "El alfil apunta directo a f7, el cuadro más débil de las negras." },
      { from: "g8", to: "f6", san: "Cf6", note: "La defensa Dos Caballos. Las negras desarrollan atacando e4." },
    ],
  },
  {
    id: "sicilian",
    name: "Defensa Siciliana",
    spanish: "Siciliana",
    eco: "B20–B99",
    family: "semi-open",
    familyLabel: "Semi-abiertas",
    color: "Negras",
    popularity: 5,
    difficulty: "Avanzado",
    year: 1594,
    tagline:
      "La respuesta más combativa a 1.e4. Asimetría desde la primera jugada.",
    description:
      "La defensa más popular del ajedrez moderno a alto nivel. Las negras juegan por ganar desde el primer movimiento creando un desequilibrio inmediato.",
    idea: "Las negras renuncian a la simetría para luchar por la columna c y el centro de manera no convencional. Posiciones afiladas y complejas.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "Las blancas abren con su peón rey." },
      { from: "c7", to: "c5", san: "c5", note: "La Siciliana: control diagonal del centro sin simetría." },
      { from: "g1", to: "f3", san: "Cf3", note: "Preparando d4 para abrir el centro." },
      { from: "d7", to: "d6", san: "d6", note: "Soporte sólido preparando ...Cf6." },
      { from: "d2", to: "d4", san: "d4", note: "El golpe central característico." },
      { from: "c5", to: "d4", san: "cxd4", note: "Captura forzada — abriendo la columna c para las negras." },
      { from: "f3", to: "d4", san: "Cxd4", note: "Recapturando con el caballo, posición típica de Siciliana Abierta." },
      { from: "g8", to: "f6", san: "Cf6", note: "Atacando e4 y desarrollando." },
      { from: "b1", to: "c3", san: "Cc3", note: "Defendiendo e4. Llegamos a la posición base de la Siciliana Abierta." },
    ],
  },
  {
    id: "french",
    name: "Defensa Francesa",
    spanish: "Francesa",
    eco: "C00–C19",
    family: "semi-open",
    familyLabel: "Semi-abiertas",
    color: "Negras",
    popularity: 4,
    difficulty: "Intermedio",
    year: 1834,
    tagline:
      "Estructura sólida y un plan claro: romper en el centro con ...d5.",
    description:
      "Llamada así tras un match por correspondencia entre Londres y París en 1834. Es una defensa pétrea que cede espacio inicial a cambio de solidez y contraataque planificado.",
    idea: "Las negras construyen una cadena de peones e6/d5 que cuestiona el centro blanco. Genera estructuras con planes muy bien definidos para ambos bandos.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "Apertura de peón rey." },
      { from: "e7", to: "e6", san: "e6", note: "Preparando ...d5 con apoyo. La marca de la Francesa." },
      { from: "d2", to: "d4", san: "d4", note: "Las blancas ocupan el centro con dos peones." },
      { from: "d7", to: "d5", san: "d5", note: "Las negras cuestionan directamente e4." },
      { from: "b1", to: "c3", san: "Cc3", note: "Variante Clásica. Defendiendo e4 con desarrollo." },
      { from: "g8", to: "f6", san: "Cf6", note: "Presionando el peón e4 una vez más." },
    ],
  },
  {
    id: "caro-kann",
    name: "Defensa Caro-Kann",
    spanish: "Caro-Kann",
    eco: "B10–B19",
    family: "semi-open",
    familyLabel: "Semi-abiertas",
    color: "Negras",
    popularity: 3,
    difficulty: "Intermedio",
    year: 1886,
    tagline:
      "Solidez sin compromiso: el alfil de dama respira antes de moverse.",
    description:
      "Desarrollada por Horatio Caro y Marcus Kann. Es la elección de jugadores que quieren la solidez de la Francesa sin encerrar al alfil de casillas claras.",
    idea: "Las negras preparan ...d5 con ...c6 en lugar de ...e6, manteniendo libre la diagonal del alfil de casillas claras. Es estratégicamente clara pero exige técnica.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "Peón rey." },
      { from: "c7", to: "c6", san: "c6", note: "Preparando ...d5 sin encerrar al alfil de c8." },
      { from: "d2", to: "d4", san: "d4", note: "Centro completo." },
      { from: "d7", to: "d5", san: "d5", note: "El golpe central tipo Caro-Kann." },
      { from: "b1", to: "c3", san: "Cc3", note: "Defendiendo e4." },
      { from: "d5", to: "e4", san: "dxe4", note: "Captura habitual — simplificando el centro." },
      { from: "c3", to: "e4", san: "Cxe4", note: "Recapturando. Posición base de la Caro-Kann Clásica." },
    ],
  },
  {
    id: "queens-gambit",
    name: "Gambito de Dama",
    spanish: "Gambito de Dama",
    eco: "D06–D69",
    family: "closed",
    familyLabel: "Juegos cerrados",
    color: "Blancas",
    popularity: 5,
    difficulty: "Intermedio",
    year: 1490,
    tagline:
      "El gambito más respetado: ofrecer un peón para dominar el centro.",
    description:
      "El gambito más antiguo y respetado del ajedrez. No es un verdadero sacrificio: las blancas siempre pueden recuperar el peón si las negras intentan retenerlo.",
    idea: "Las blancas ofrecen el peón c4 para socavar el centro negro y obtener desarrollo y espacio. Da lugar a estructuras estratégicas profundas.",
    moves: [
      { from: "d2", to: "d4", san: "d4", note: "Las blancas abren con el peón de dama." },
      { from: "d7", to: "d5", san: "d5", note: "Respuesta simétrica clásica." },
      { from: "c2", to: "c4", san: "c4", note: "El Gambito de Dama: ofreciendo el peón c." },
      { from: "e7", to: "e6", san: "e6", note: "Gambito Rehusado: las negras refuerzan d5." },
      { from: "b1", to: "c3", san: "Cc3", note: "Desarrollo presionando d5." },
      { from: "g8", to: "f6", san: "Cf6", note: "Desarrollo natural — Variante Ortodoxa." },
    ],
  },
  {
    id: "kings-indian",
    name: "Defensa India de Rey",
    spanish: "India de Rey",
    eco: "E60–E99",
    family: "indian",
    familyLabel: "Defensas indias",
    color: "Negras",
    popularity: 4,
    difficulty: "Avanzado",
    year: 1920,
    tagline:
      "Hipermodernismo puro: ceder el centro para atacarlo desde lejos.",
    description:
      "Defensa hipermoderna que abandona temporalmente el centro para reconquistarlo con piezas. Predilecta de Fischer y Kasparov.",
    idea: "Las negras desarrollan el alfil en fianchetto y planean rupturas con ...e5 o ...c5. Genera ataques agudos contra el rey blanco enrocado.",
    moves: [
      { from: "d2", to: "d4", san: "d4", note: "Apertura de peón de dama." },
      { from: "g8", to: "f6", san: "Cf6", note: "Las negras controlan e4 con la pieza, no con peón." },
      { from: "c2", to: "c4", san: "c4", note: "Ganando espacio en el flanco de dama." },
      { from: "g7", to: "g6", san: "g6", note: "Preparando el fianchetto, marca de la apertura." },
      { from: "b1", to: "c3", san: "Cc3", note: "Desarrollo central." },
      { from: "f8", to: "g7", san: "Ag7", note: "El alfil fianchetto presiona la gran diagonal." },
      { from: "e2", to: "e4", san: "e4", note: "Las blancas aceptan el reto y ocupan el centro." },
      { from: "d7", to: "d6", san: "d6", note: "Preparando ...e5 o ...c5 para romper el centro." },
    ],
  },
  {
    id: "london",
    name: "Sistema Londres",
    spanish: "Sistema Londres",
    eco: "D02",
    family: "closed",
    familyLabel: "Juegos cerrados",
    color: "Blancas",
    popularity: 4,
    difficulty: "Principiante",
    year: 1922,
    tagline:
      "Un sistema, no una apertura: planes claros con la misma estructura siempre.",
    description:
      "Adoptada por Magnus Carlsen en eventos de élite, ha pasado de ser una opción discreta a una de las armas más populares en todos los niveles.",
    idea: "Las blancas construyen siempre la misma estructura sólida (d4, Cf3, Af4, e3, c3) sin importar mucho la respuesta negra. Excelente para aprender principios.",
    moves: [
      { from: "d2", to: "d4", san: "d4", note: "Peón de dama." },
      { from: "d7", to: "d5", san: "d5", note: "Respuesta clásica." },
      { from: "g1", to: "f3", san: "Cf3", note: "Desarrollo flexible." },
      { from: "g8", to: "f6", san: "Cf6", note: "Desarrollo simétrico." },
      { from: "c1", to: "f4", san: "Af4", note: "La jugada característica: alfil fuera antes de cerrarlo con e3." },
    ],
  },
  {
    id: "english",
    name: "Apertura Inglesa",
    spanish: "Inglesa",
    eco: "A10–A39",
    family: "flank",
    familyLabel: "Aperturas de flanco",
    color: "Blancas",
    popularity: 3,
    difficulty: "Intermedio",
    year: 1843,
    tagline:
      "Control desde el flanco — la Siciliana invertida con un tiempo extra.",
    description:
      "Popularizada por Howard Staunton en el siglo XIX. Es flexible y se adapta a la transposición hacia muchas estructuras distintas.",
    idea: "Las blancas controlan d5 desde la distancia y juegan por el flanco de dama. Posiciones estratégicas, ideal para jugadores posicionales.",
    moves: [
      { from: "c2", to: "c4", san: "c4", note: "El peón inglés: control diagonal de d5." },
      { from: "e7", to: "e5", san: "e5", note: "Una Siciliana invertida — con un tiempo a favor de las blancas." },
      { from: "b1", to: "c3", san: "Cc3", note: "Desarrollo natural." },
      { from: "g8", to: "f6", san: "Cf6", note: "Desarrollo simétrico." },
      { from: "g1", to: "f3", san: "Cf3", note: "Desarrollo armonioso de las dos piezas menores." },
    ],
  },
  {
    id: "scandinavian",
    name: "Defensa Escandinava",
    spanish: "Escandinava",
    eco: "B01",
    family: "semi-open",
    familyLabel: "Semi-abiertas",
    color: "Negras",
    popularity: 2,
    difficulty: "Principiante",
    year: 1475,
    tagline:
      "Una de las aperturas más antiguas registradas. Directa y temática.",
    description:
      "Aparece en el primer libro impreso de ajedrez (1475). Las negras desafían el centro blanco inmediatamente.",
    idea: "Las negras eliminan el peón central blanco de inmediato. La dama negra sale temprano, lo que da posiciones temáticas y fáciles de entender.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "Peón rey." },
      { from: "d7", to: "d5", san: "d5", note: "Desafío inmediato al centro: la Escandinava." },
      { from: "e4", to: "d5", san: "exd5", note: "Captura forzada." },
      { from: "d8", to: "d5", san: "Dxd5", note: "La dama recapura — saliendo temprano pero centralizada." },
      { from: "b1", to: "c3", san: "Cc3", note: "Atacando la dama con tempo." },
      { from: "d5", to: "a5", san: "Da5", note: "La retirada principal — la dama mantiene presión en la diagonal." },
    ],
  },
  {
    id: "nimzo-indian",
    name: "Defensa Nimzo-India",
    spanish: "Nimzo-India",
    eco: "E20–E59",
    family: "indian",
    familyLabel: "Defensas indias",
    color: "Negras",
    popularity: 4,
    difficulty: "Avanzado",
    year: 1925,
    tagline:
      "Aron Nimzowitsch reescribió el ajedrez moderno con esta clavada.",
    description:
      "Una de las defensas más respetadas a 1.d4. La clavada del alfil contra el caballo dicta la estrategia de toda la partida.",
    idea: "Las negras clavan el caballo c3 y amenazan dañar la estructura blanca. Es la defensa hipermoderna por excelencia.",
    moves: [
      { from: "d2", to: "d4", san: "d4", note: "Peón de dama." },
      { from: "g8", to: "f6", san: "Cf6", note: "Defensa india: control con pieza." },
      { from: "c2", to: "c4", san: "c4", note: "Ganando espacio." },
      { from: "e7", to: "e6", san: "e6", note: "Preparando el alfil para la clavada." },
      { from: "b1", to: "c3", san: "Cc3", note: "Desarrollo central." },
      { from: "f8", to: "b4", san: "Ab4", note: "La clavada Nimzo — pieza por estructura." },
    ],
  },
  {
    id: "pirc",
    name: "Defensa Pirc",
    spanish: "Pirc",
    eco: "B07–B09",
    family: "semi-open",
    familyLabel: "Semi-abiertas",
    color: "Negras",
    popularity: 2,
    difficulty: "Intermedio",
    year: 1949,
    tagline:
      "Ceder el centro para minarlo — hipermodernismo aplicado a 1.e4.",
    description:
      "Llamada así por el yugoslavo Vasja Pirc. Una defensa hipermoderna que invita a las blancas a construir un centro grande para luego atacarlo.",
    idea: "Las negras planean fianchetto del alfil de rey y rupturas con ...c5 o ...e5. Da partidas asimétricas y de doble filo.",
    moves: [
      { from: "e2", to: "e4", san: "e4", note: "Peón rey." },
      { from: "d7", to: "d6", san: "d6", note: "Preparación flexible." },
      { from: "d2", to: "d4", san: "d4", note: "Centro completo invitado." },
      { from: "g8", to: "f6", san: "Cf6", note: "Atacando e4 sin disputar el centro con peones." },
      { from: "b1", to: "c3", san: "Cc3", note: "Defendiendo e4." },
      { from: "g7", to: "g6", san: "g6", note: "Preparando el fianchetto — marca de la Pirc." },
    ],
  },
] as const;

export function getOpeningById(id: string): Opening | undefined {
  return OPENINGS.find((o) => o.id === id);
}

export function getOpeningsByFamily(family: Opening["family"]): Opening[] {
  return OPENINGS.filter((o) => o.family === family);
}
