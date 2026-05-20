import { OPENINGS } from "@/data/openings";
import type { Opening } from "@/lib/types";

/**
 * Day-of-year, 1..366. Deterministic per UTC date so SSR and client agree.
 * Switching to a per-user seed (e.g. signed-in user id) is a future iteration.
 */
function dayOfYear(d: Date): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const now = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.floor((now - start) / 86_400_000);
}

export function getDailyOpening(date: Date = new Date()): Opening {
  const idx = dayOfYear(date) % OPENINGS.length;
  return OPENINGS[idx]!;
}
