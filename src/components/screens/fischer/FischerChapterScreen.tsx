"use client";

import { useState } from "react";
import { FischerPuzzle } from "./FischerPuzzle";
import { FISCHER_PUZZLES, getPuzzlesByChapter } from "@/data/fischer";
import { useFischerProgress } from "@/lib/fischerProgress";
import type { FischerChapter } from "@/lib/types";

interface Props {
  chapter: FischerChapter;
}

export function FischerChapterScreen({ chapter }: Props) {
  const puzzles = getPuzzlesByChapter(chapter.number);
  const [index, setIndex] = useState(0);
  const { progress } = useFischerProgress();

  const puzzle = puzzles[index];
  if (!puzzle) return null;

  const allPuzzleCount = FISCHER_PUZZLES.length;
  void allPuzzleCount;

  const handleNext = () => {
    if (index < puzzles.length - 1) {
      setIndex(index + 1);
    } else {
      // Chapter complete — go back to Fischer hub
      window.location.href = "/fischer";
    }
  };

  const solved = progress.solved.includes(puzzle.id);
  void solved;

  return (
    <FischerPuzzle
      puzzle={puzzle}
      totalInChapter={puzzles.length}
      indexInChapter={index}
      onNext={handleNext}
      onBack="/fischer"
    />
  );
}
