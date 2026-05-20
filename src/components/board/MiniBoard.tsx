import { useMemo } from "react";
import type { Move } from "@/lib/types";
import { ChessBoard } from "./ChessBoard";
import { piecesAfter } from "./boardEngine";

interface Props {
  moves: readonly Move[];
  ply?: number;
  size?: number;
}

/** Static thumbnail of an opening position after N plies. */
export function MiniBoard({ moves, ply = 0, size = 64 }: Props) {
  const pieces = useMemo(() => piecesAfter(moves, ply), [moves, ply]);
  return <ChessBoard pieces={pieces} size={size} showCoords={false} frame={false} />;
}
