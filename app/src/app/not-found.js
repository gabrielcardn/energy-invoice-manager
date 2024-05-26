"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  // Ensure that this code only runs in the client-side context
  if (typeof window !== "undefined") {
    router.push("/dashboard");
  }

  // Optionally, you can return some JSX here for rendering purposes
  return <div>Redirecting...</div>;
}
