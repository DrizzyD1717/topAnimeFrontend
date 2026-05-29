"use client";
import { useState } from "react";

export default function AddAnimeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    title: "",
    rank: "",
    studio: "",
    episodes: "",
    status: "Completed", // Default match to Mongoose enum
    genres: "", // Will type as: "Action, Fantasy, Drama"
    overview: "",
    personalReview: "",
    posterUrl: "",
    backdropUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    // Format the payload to match the Mongoose Schema
    const payload = {
      ...formData,
      rank: Number(formData.rank),
      episodes: Number(formData.episodes),
      // Split comma-separated string into a clean array
      genres: formData.genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add anime.");
      }

      setMessage({ type: "success", text: "Anime added successfully!" });

      // Reset form on success
      setFormData({
        title: "",
        rank: "",
        studio: "",
        episodes: "",
        status: "Completed",
        genres: "",
        overview: "",
        personalReview: "",
        posterUrl: "",
        backdropUrl: "",
      });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6"
    >
      {message.text && (
        <div
          className={`p-4 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-green-900/30 text-green-400 border border-green-800" : "bg-red-900/30 text-red-400 border border-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-2">
          <label className="text-sm text-neutral-400 font-medium">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400 font-medium">
            Rank (1-20)
          </label>
          <input
            type="number"
            name="rank"
            min="1"
            max="20"
            required
            value={formData.rank}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400 font-medium">Studio</label>
          <input
            type="text"
            name="studio"
            required
            value={formData.studio}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400 font-medium">
            Episodes
          </label>
          <input
            type="number"
            name="episodes"
            required
            value={formData.episodes}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400 appearance-none"
          >
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400 font-medium">
            Genres (comma separated)
          </label>
          <input
            type="text"
            name="genres"
            required
            placeholder="Action, Drama, Sci-Fi"
            value={formData.genres}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {/* URLs */}
      <div className="space-y-2">
        <label className="text-sm text-neutral-400 font-medium">
          Poster Image URL
        </label>
        <input
          type="url"
          name="posterUrl"
          required
          value={formData.posterUrl}
          onChange={handleChange}
          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-neutral-400 font-medium">
          Backdrop Image URL
        </label>
        <input
          type="url"
          name="backdropUrl"
          required
          value={formData.backdropUrl}
          onChange={handleChange}
          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400"
        />
      </div>

      {/* Text Areas */}
      <div className="space-y-2">
        <label className="text-sm text-neutral-400 font-medium">Synopsis</label>
        <textarea
          name="overview"
          required
          rows={3}
          value={formData.overview}
          onChange={handleChange}
          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400 resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-neutral-400 font-medium">
          Personal Review
        </label>
        <textarea
          name="personalReview"
          required
          rows={3}
          value={formData.personalReview}
          onChange={handleChange}
          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-neutral-950 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4"
      >
        {isSubmitting ? "Uploading to Database..." : "Add to Showcase"}
      </button>
    </form>
  );
}
