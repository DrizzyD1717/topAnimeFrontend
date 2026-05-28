"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimeDetailClient({ anime }: { anime: any }) {
  return (
    <div className="min-h-screen bg-neutral-950 pb-20 -mt-16 pt-8">
      {/* 1. Hero Backdrop Section */}
      <div className="relative h-[40vh] md:h-[55vh] w-full">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          src={anime.backdropUrl}
          alt={`${anime.title} backdrop`}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays to blend into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-4 md:left-12 z-10">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center space-x-2 bg-neutral-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
          >
            <span>←</span> <span>Back to Showcase</span>
          </motion.button>
        </Link>
      </div>

      {/* 2. Main Content (Pulled up over the backdrop) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 md:-mt-48 z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Column: Poster & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-48 md:w-72 flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700 mb-6 bg-neutral-900">
              <img
                src={anime.posterUrl}
                alt={anime.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
              <p className="flex justify-between text-sm">
                <span className="text-neutral-400">Rank</span>{" "}
                <span className="font-bold text-white">#{anime.rank}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="text-neutral-400">Studio</span>{" "}
                <span className="font-medium text-white">{anime.studio}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="text-neutral-400">Episodes</span>{" "}
                <span className="font-medium text-white">{anime.episodes}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="text-neutral-400">Status</span>{" "}
                <span className="font-medium text-white">{anime.status}</span>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Title, Genres, Overview & Review */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-grow pt-4 md:pt-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
              {anime.title}
            </h1>

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {anime.genres.map((genre: string) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs uppercase tracking-wider font-semibold rounded-full border border-neutral-700"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-bold text-neutral-200 mb-3 border-b border-neutral-800 pb-2">
                  Synopsis
                </h3>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  {anime.overview}
                </p>
              </div>

              {/* Personal Review */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-200 to-gray-500" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Why it made the Top 20
                </h3>
                <p className="text-neutral-300 leading-relaxed italic text-lg">
                  "{anime.personalReview}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
