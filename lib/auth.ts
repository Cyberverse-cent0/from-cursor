import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { db, hasDatabaseUrl } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

const providers: ReturnType<typeof Google>[] = [];

if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_ID.includes("your-google")
) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  providers.push(
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().toLowerCase().trim();
        const password = credentials?.password?.toString() ?? "";
        if (!email || !password) return null;

        const adminEmail = process.env.ADMIN_EMAIL!.toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD!;

        if (email === adminEmail && password === adminPassword) {
          return {
            id: "admin",
            email: adminEmail,
            name: "Administrator",
            role: "ADMIN",
          };
        }

        if (hasDatabaseUrl && db) {
          const user = await db.user.findUnique({ where: { email } });
          if (user?.passwordHash && (await bcrypt.compare(password, user.passwordHash))) {
            return {
              id: user.id,
              email: user.email,
              name: user.name ?? user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }) as never,
  );
}

const authConfig = {
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  providers,
  callbacks: {
    async session({ session, token }: { session: DefaultSession; token: Record<string, unknown> }) {
      if (session.user && token) {
        const user = session.user as DefaultSession["user"] & { id: string; role: string };
        user.id = (token.sub as string) || "";
        user.role = (token.role as string) || "USER";
      }
      return session;
    },
    async jwt({ token, user }: { token: Record<string, unknown>; user?: { role?: string } }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = NextAuth(authConfig as any);
export const auth = handler.auth;
export const signIn = handler.signIn;
export const signOut = handler.signOut;
