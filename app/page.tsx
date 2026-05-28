import GalleryClient from "@/components/GalleryClient";

// Fetch data from your Express backend
async function getAnimeList() {
  // Using cache: 'no-store' ensures it fetches fresh data while we develop
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/anime`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch anime data");
  }

  return res.json();
}

export default async function Home() {
  const animeList = await getAnimeList();

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Showcase.
          </span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl">
          A curated collection of my top 20 anime of all time. Explored through
          a minimalist, motion-driven experience.
        </p>
      </div>

      {/* The Animated Grid */}
      {/* <AnimeGrid animeList={animeList} /> */}
      <GalleryClient initialAnime={animeList}></GalleryClient>
    </main>
  );
}
