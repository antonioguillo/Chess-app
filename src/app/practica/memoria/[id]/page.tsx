import { notFound } from "next/navigation";
import { MemoryExercise } from "@/components/screens/practice/MemoryExercise";
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
      ? `Memoria · ${opening.name} — Gambito`
      : "Memoria — Gambito",
  };
}

export default async function MemoryExercisePage({ params }: PageProps) {
  const { id } = await params;
  const opening = getOpeningById(id);
  if (!opening) notFound();
  return <MemoryExercise opening={opening} />;
}
