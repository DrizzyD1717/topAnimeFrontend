import AnimeDetailClient from "@/components/AnimeDetailClient";
import { notFound } from "next/navigation";

// Fetch the specific anime from your Express backend
async function getAnimeDetails(id: string) {
  const res = await fetch(`http://localhost:5000/api/anime/${id}`, {
    cache: "no-store", // Keeps data fresh during development
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch anime details");
  }

  return res.json();
}

// Next.js passes the URL parameters to the page component
export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const anime = await getAnimeDetails(resolvedParams.id);

  // If someone types an invalid ID in the URL, show a 404 page
  if (!anime) {
    notFound();
  }

  return <AnimeDetailClient anime={anime} />;
}
