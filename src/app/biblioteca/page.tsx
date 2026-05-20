import { Suspense } from "react";
import { LibraryScreen } from "@/components/screens/LibraryScreen";

export default function LibraryPage() {
  // useSearchParams requires a Suspense boundary in the App Router
  return (
    <Suspense fallback={null}>
      <LibraryScreen />
    </Suspense>
  );
}
