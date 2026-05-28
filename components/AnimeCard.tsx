"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// Animation variants for individual cards
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AnimeCard({ anime }: { anime: any }) {
  return (
    <Link href={`/anime/${anime._id}`}>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex flex-col rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-lg cursor-pointer transition-colors hover:border-neutral-600"
      >
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 z-10 bg-neutral-950/80 backdrop-blur-md text-gray-300 font-bold px-3 py-1 rounded-md border border-neutral-700 shadow-sm">
          #{anime.rank}
        </div>

        {/* Poster Image */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-800">
          <img
            src={anime.posterUrl}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
        </div>

        {/* Card Content */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
            {anime.title}
          </h3>
          <p className="text-sm text-neutral-400 font-medium">
            {anime.studio} • {anime.episodes} eps
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
