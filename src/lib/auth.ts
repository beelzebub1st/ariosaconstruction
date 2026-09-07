import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const adminEmail = process.env.ADMIN_EMAIL || "admin@ariosaconstructions.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "ariosa-admin-change-me";

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) return null;
            return { id: user.id, email: user.email, name: user.name ?? "Admin" };
          }
        } catch {
          // DB unavailable — fall through to env admin
        }

        if (email === adminEmail && password === adminPassword) {
          return { id: "env-admin", email: adminEmail, name: "Admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
});
