"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimeCard from "./AnimeCard";

export default function GalleryClient({
  initialAnime,
}: {
  initialAnime: any[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Dynamically extract all unique genres from your data
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    initialAnime.forEach((anime) => {
      anime.genres.forEach((g: string) => genres.add(g));
    });
    return ["All", ...Array.from(genres)].sort();
  }, [initialAnime]);

  // Filter the anime based on search and selected genre
  const filteredAnime = useMemo(() => {
    return initialAnime.filter((anime) => {
      const matchesSearch = anime.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || anime.genres.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [initialAnime, searchQuery, selectedGenre]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-full px-4 py-2.5 focus:outline-none focus:border-gray-400 transition-colors placeholder-neutral-500"
          />
        </div>

        {/* Genre Pills */}
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                selectedGenre === genre
                  ? "bg-gray-200 text-neutral-950 border-gray-200 shadow-lg shadow-gray-200/10"
                  : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* The Animated Grid */}
      {filteredAnime.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {filteredAnime.map((anime) => (
              <motion.div
                key={anime._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <AnimeCard anime={anime} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 text-neutral-500 border border-dashed border-neutral-800 rounded-2xl">
          No anime found matching your criteria.
        </div>
      )}
    </div>
  );
}
