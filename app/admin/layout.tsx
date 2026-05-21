import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session || (role !== "ADMIN" && role !== "ASSISTANT")) {
    redirect("/signin?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/admin" className="font-semibold">
            Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/">View site</Link>
            <Link href="/api/auth/signout">Sign out</Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl p-6">{children}</div>
    </div>
  );
}
