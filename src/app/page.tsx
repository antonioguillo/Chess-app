import { HomeScreen } from "@/components/screens/HomeScreen";
import { getDailyOpening } from "@/lib/daily";

export default function HomePage() {
  const daily = getDailyOpening();
  return <HomeScreen dailyOpeningId={daily.id} />;
}
