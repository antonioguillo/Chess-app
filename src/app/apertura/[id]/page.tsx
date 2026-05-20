import { notFound } from "next/navigation";
import { DetailScreen } from "@/components/screens/detail/DetailScreen";
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
  if (!opening) return { title: "Apertura no encontrada — Gambito" };
  return {
    title: `${opening.name} — Gambito`,
    description: opening.tagline,
  };
}

export default async function OpeningDetailPage({ params }: PageProps) {
  const { id } = await params;
  const opening = getOpeningById(id);
  if (!opening) notFound();
  return <DetailScreen opening={opening} />;
}
