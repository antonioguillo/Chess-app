"use client";

import { useCallback, useEffect, useState } from "react";
import type { FischerProgress } from "@/lib/types";

const STORAGE_KEY = "gambito.fischer.v1";

const EMPTY: FischerProgress = {
  solved: [],
  solvedFirst: [],
  lastSolvedAt: null,
};

function load(): FischerProgress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<FischerProgress>;
    return {
      solved: p.solved ?? [],
      solvedFirst: p.solvedFirst ?? [],
      lastSolvedAt: p.lastSolvedAt ?? null,
    };
  } catch {
    return EMPTY;
  }
}

function save(p: FischerProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // quota / privacy mode
  }
}

export function useFischerProgress() {
  const [state, setState] = useState<FischerProgress>(EMPTY);

  useEffect(() => {
    setState(load());
  }, []);

  const recordSolved = useCallback(
    (puzzleId: string, firstTry: boolean) => {
      setState((prev) => {
        const solved = prev.solved.includes(puzzleId)
          ? prev.solved
          : [...prev.solved, puzzleId];
        const solvedFirst =
          firstTry && !prev.solvedFirst.includes(puzzleId)
            ? [...prev.solvedFirst, puzzleId]
            : prev.solvedFirst;
        const next: FischerProgress = {
          solved,
          solvedFirst,
          lastSolvedAt: new Date().toISOString(),
        };
        save(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    save(EMPTY);
    setState(EMPTY);
  }, []);

  return { progress: state, recordSolved, reset };
}
