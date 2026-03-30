import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// ─── Type augmentation ───────────────────────────────────────────────────────
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      phoneNumber?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    role?: string;
    phoneNumber?: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    phoneNumber?: string | null;
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// ─── NextAuth v4 Config ──────────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // ── Email / Password ──────────────────────────────────────────────────
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) return null;

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar,
          role: user.role,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],

  callbacks: {
    // Attach id, role, phoneNumber to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user.role ?? "BUYER") as string;
        token.phoneNumber = user.phoneNumber ?? null;
      }
      return token;
    },
    // Expose id, role, phoneNumber on the session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phoneNumber = token.phoneNumber;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow redirecting back to our Vite frontend
      if (url.startsWith("http://localhost:5173")) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  pages: {
    signIn: "http://localhost:5173/login",
  },

  debug: false,
};

/**
 * Convenience wrapper — call in route handlers to get typed session.
 */
export function getAuthSession() {
  return getServerSession(authOptions);
}
