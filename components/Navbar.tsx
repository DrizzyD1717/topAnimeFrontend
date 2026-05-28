"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-neutral-950/70 backdrop-blur-md border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-gray-200 to-gray-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-neutral-950 font-extrabold text-lg leading-none">
                A
              </span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide group-hover:text-gray-300 transition-colors">
              Showcase
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-2 md:space-x-4">
            <Link
              href="/"
              className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Gallery
            </Link>
            {/* We will leave this as a placeholder for when we add the Admin feature later */}
            <Link
              href="#"
              className="text-neutral-500 hover:text-neutral-300 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-not-allowed"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
