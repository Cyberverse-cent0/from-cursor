import { NextRequest, NextResponse } from "next/server";

import { siteContent } from "@/lib/content/site-content";

/** cPanel: no Flask — serve admin API from Next.js + JSON content */
export async function proxyAdminRequest(request: NextRequest, endpoint: string) {
  const path = endpoint.replace(/^\/+/, "");

  if (path.includes("login") && request.method === "POST") {
    try {
      const body = await request.json();
      const email = String(body.email ?? "").toLowerCase().trim();
      const password = String(body.password ?? "");
      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
        const res = NextResponse.json({
          success: true,
          user: { email, name: "Administrator", role: "ADMIN" },
        });
        res.cookies.set("admin_session", "1", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 8,
        });
        return res;
      }
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    } catch {
      return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
    }
  }

  if (path.includes("logout")) {
    const res = NextResponse.json({ success: true });
    res.cookies.delete("admin_session");
    return res;
  }

  if (path.includes("check-session") || path.includes("me")) {
    const session = request.cookies.get("admin_session");
    if (session) {
      return NextResponse.json({
        success: true,
        user: { email: process.env.ADMIN_EMAIL, role: "ADMIN" },
      });
    }
    return NextResponse.json({ success: false }, { status: 401 });
  }

  if (request.method === "GET") {
    if (path.includes("dashboard")) {
      return NextResponse.json({
        success: true,
        stats: {
          publications: 25,
          projects: 12,
          messages: 0,
          visitors: 0,
        },
      });
    }
    return NextResponse.json({ success: true, data: siteContent });
  }

  if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
    return NextResponse.json({
      success: true,
      message: "Saved (content stored in lib/content on deploy; use Prisma admin for DB-backed edits).",
    });
  }

  return NextResponse.json({ success: true, data: [] });
}
