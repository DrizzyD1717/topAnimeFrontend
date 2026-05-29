"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  const passcode = formData.get("passcode");
  const correctPasscode = process.env.ADMIN_PASSCODE;

  if (passcode === correctPasscode) {
    // In Next.js 15, cookies() is asynchronous
    const cookieStore = await cookies();

    // Set a secure HTTP-only cookie that lasts for 1 day
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    redirect("/admin/dashboard");
  }

  // If we reach here, the passcode was wrong
  return { error: "Invalid passcode" };
}
