import { notFound } from "next/navigation";
import { FindMoveExercise } from "@/components/screens/practice/FindMoveExercise";
import { OPENINGS, getOpeningById } from "@/data/openings";

interface RouteParams {
  id: string;
}

interface PageProps {
  params: Promise<RouteParams>;
}

export function generateStaticParams(): RouteParams[] {
  return OPENINGS.map((o) => ({ id: o.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const opening = getOpeningById(id);
  return {
    title: opening
      ? `Jugada · ${opening.name} — Gambito`
      : "Jugada — Gambito",
  };
}

export default async function FindMoveExercisePage({ params }: PageProps) {
  const { id } = await params;
  const opening = getOpeningById(id);
  if (!opening) notFound();
  return <FindMoveExercise opening={opening} />;
}
