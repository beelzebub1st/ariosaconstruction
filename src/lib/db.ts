import { prisma } from "@/lib/prisma";

/**
 * Public site uses the database whenever DATABASE_URL is set,
 * unless USE_DATABASE is explicitly "false" (force seed content).
 */
export function shouldUseDatabase(): boolean {
  if (process.env.USE_DATABASE === "false") return false;
  return Boolean(process.env.DATABASE_URL);
}

export async function getDbOrNull() {
  if (!shouldUseDatabase()) return null;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return prisma;
  } catch {
    return null;
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL) && process.env.USE_DATABASE !== "false";
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function formatDbError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (
    /P1001|P1017|Can't reach|ECONNREFUSED|ENOTFOUND|DATABASE_URL|timed out/i.test(
      msg
    )
  ) {
    return "Database is not connected. In Vercel → Settings → Environment Variables, set DATABASE_URL (Neon Postgres) and leave USE_DATABASE unset or true. Then run: npm run db:push && npm run db:seed";
  }
  return msg;
}
