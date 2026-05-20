"use client";

import { useCallback, useEffect, useState } from "react";
import type { OpeningProgress, UserProgress } from "@/lib/types";

const STORAGE_KEY = "gambito.progress.v1";

const EMPTY: UserProgress = {
  openings: {},
  streakDays: 0,
  lastOpenedDate: null,
};

function loadFromStorage(): UserProgress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as UserProgress;
    return { ...EMPTY, ...parsed, openings: { ...parsed.openings } };
  } catch {
    return EMPTY;
  }
}

function saveToStorage(p: UserProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // quota / privacy mode — silent
  }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function diffDays(a: string, b: string): number {
  const ta = Date.parse(a + "T00:00:00Z");
  const tb = Date.parse(b + "T00:00:00Z");
  return Math.round((tb - ta) / 86_400_000);
}

/**
 * React hook exposing user progress + the actions needed across screens.
 * Persists to localStorage. Designed to be swappable with a remote store later.
 */
export function useUserProgress() {
  const [state, setState] = useState<UserProgress>(EMPTY);

  // Hydrate from storage after mount to avoid SSR mismatch
  useEffect(() => {
    setState(loadFromStorage());
  }, []);

  const persist = useCallback((next: UserProgress) => {
    setState(next);
    saveToStorage(next);
  }, []);

  /** Record that the user viewed up to `ply` plies of an opening. */
  const recordView = useCallback(
    (openingId: string, ply: number, totalPlies: number) => {
      setState((prev) => {
        const today = todayISO();
        const existing = prev.openings[openingId];
        const pliesViewed = Math.max(existing?.pliesViewed ?? 0, ply);
        const completed = pliesViewed >= totalPlies;

        // Update streak
        let streakDays = prev.streakDays;
        if (prev.lastOpenedDate !== today) {
          if (prev.lastOpenedDate && diffDays(prev.lastOpenedDate, today) === 1) {
            streakDays = streakDays + 1;
          } else {
            streakDays = 1;
          }
        } else if (streakDays === 0) {
          streakDays = 1;
        }

        const next: UserProgress = {
          ...prev,
          streakDays,
          lastOpenedDate: today,
          openings: {
            ...prev.openings,
            [openingId]: {
              pliesViewed,
              completed,
              lastViewedAt: new Date().toISOString(),
            },
          },
        };
        saveToStorage(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => persist(EMPTY), [persist]);

  return { progress: state, recordView, reset };
}

export function summarize(progress: UserProgress) {
  const entries = Object.values(progress.openings);
  const learned = entries.filter((e) => e.completed).length;
  const inStudy = entries.filter((e) => !e.completed && e.pliesViewed > 0).length;
  return {
    learned,
    inStudy,
    streak: progress.streakDays,
  };
}

/** Most-recently viewed in-progress openings (newest first). */
export function recentInProgress(
  progress: UserProgress,
  limit = 3,
): Array<{ openingId: string; entry: OpeningProgress }> {
  return Object.entries(progress.openings)
    .map(([openingId, entry]) => ({ openingId, entry }))
    .filter(({ entry }) => entry.pliesViewed > 0)
    .sort((a, b) => (a.entry.lastViewedAt < b.entry.lastViewedAt ? 1 : -1))
    .slice(0, limit);
}
