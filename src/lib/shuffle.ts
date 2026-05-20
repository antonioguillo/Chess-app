/**
 * Fisher–Yates shuffle that returns a new array (does not mutate input).
 *
 * Used to randomize quiz questions and multiple-choice answers in the practice
 * modes. Accepts an optional `random` function so callers can pass a seeded
 * RNG if they need reproducible sequences (currently we always use Math.random).
 */
export function shuffle<T>(input: readonly T[], random = Math.random): T[] {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}
