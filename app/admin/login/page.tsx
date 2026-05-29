"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { authenticate } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");

    // Call the server action
    const result = await authenticate(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Restricted Area
          </h1>
          <p className="text-neutral-400 text-sm">
            Enter your passcode to manage the showcase.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              name="passcode"
              required
              placeholder="Enter passcode..."
              className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors placeholder-neutral-600"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-neutral-950 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Unlock Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
