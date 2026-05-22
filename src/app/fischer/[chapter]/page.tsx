import { notFound } from "next/navigation";
import { FischerChapterScreen } from "@/components/screens/fischer/FischerChapterScreen";
import { FISCHER_CHAPTERS, getPuzzlesByChapter } from "@/data/fischer";

interface Props {
  params: Promise<{ chapter: string }>;
}

export default async function FischerChapterPage({ params }: Props) {
  const { chapter: chapterParam } = await params;
  const num = parseInt(chapterParam, 10);
  const chapter = FISCHER_CHAPTERS.find((c) => c.number === num);
  if (!chapter) notFound();

  const puzzles = getPuzzlesByChapter(num);
  if (puzzles.length === 0) notFound();

  return <FischerChapterScreen chapter={chapter!} />;
}
