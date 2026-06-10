// src/app/loading.tsx
// Route-level Suspense boundary: shown by the App Router while the next page
// segment loads (and, in dev, while it compiles) — so navigation shows the
// brand loader instead of a frozen previous page.
import { PageLoader } from '@/components/ui/Spinner';

export default function Loading() {
  return <PageLoader label="Loading…" />;
}
