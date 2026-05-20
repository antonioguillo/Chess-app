# Gambito

Aprende las doce aperturas que moldearon el ajedrez. Cinco siglos de teoría
reunidos en una app de móvil web, con explicaciones en español.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **React 18** con hooks
- **CSS variables + CSS Modules** para los design tokens (warm-dark "chess-club")
- Persistencia local con **localStorage** (preparada para migrar a backend)
- Fuentes Google: EB Garamond, Inter, JetBrains Mono (auto-hosteadas vía `next/font`)

## Estructura

```
src/
├── app/                      # App Router — una página por ruta
│   ├── layout.tsx            # Fuentes, AppShell, metadata
│   ├── page.tsx              # /          → Inicio
│   ├── biblioteca/page.tsx   # /biblioteca → Biblioteca
│   ├── practica/page.tsx     # /practica   → Práctica (placeholder)
│   ├── apertura/[id]/page.tsx# /apertura/X → Detalle de apertura
│   ├── not-found.tsx
│   └── globals.css           # Design tokens + reset
├── components/
│   ├── board/                # ChessBoard, MiniBoard, Piece, boardEngine
│   ├── chrome/               # AppShell, TabBar, TopBar, Wordmark, IconBtn
│   ├── ui/                   # Chip, Popularity, ColorDot, SectionLabel, Icon
│   └── screens/              # HomeScreen, LibraryScreen, PracticeScreen, detail/*
├── data/
│   ├── openings.ts           # Las 12 aperturas (dataset canónico)
│   └── families.ts           # Familias y filtros
└── lib/
    ├── types.ts              # Tipos del dominio
    ├── daily.ts              # Rotación de "apertura del día"
    └── progress.ts           # Hook + helpers de progreso del usuario
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run typecheck  # tsc --noEmit
```

## Próximas iteraciones

La arquitectura está pensada para escalar sin rediseñar:

- **Modos de práctica**: añadir páginas bajo `/practica/*` reutilizando
  `ChessBoard` con handlers de input. Para validación de jugadas reales
  (enroque, al paso, promoción) sustituir `boardEngine.applyMove` por `chess.js`.
- **Variantes por apertura**: extender el tipo `Opening` con un campo
  `variants: Variant[]`. El detalle ya está partido en `DetailScreen` +
  `MoveList` para enchufar un selector de líneas.
- **Sync remoto del progreso**: `useUserProgress` encapsula toda la lectura
  y escritura — basta sustituir su almacenamiento por SWR/server actions.
- **Internacionalización**: extraer copy a `messages/<locale>.json` y usar
  `next-intl`. Las aperturas ya tienen campo `spanish` separado del `name`.
- **Piezas SVG**: el componente `Piece` expone `type` y `size`; cambiar el
  glyph por un set SVG (cburnett) sin tocar el resto.
- **Auto-scroll del move list** en aperturas largas: enchufar un `ref` al
  botón activo en `MoveList`.

## Notación

Se usa notación algebraica española:
`C`=Caballo, `A`=Alfil, `T`=Torre, `D`=Dama, `R`=Rey.
