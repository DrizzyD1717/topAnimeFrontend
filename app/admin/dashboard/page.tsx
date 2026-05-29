import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddAnimeForm from "@/components/AddAnimeForm";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_token");

  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          Command Center
        </h1>
        <p className="text-neutral-400">
          Add new entries directly to your live database.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Entry</h2>
        <AddAnimeForm />
      </div>

      {/* Space reserved for the data management table later */}
    </div>
  );
}
