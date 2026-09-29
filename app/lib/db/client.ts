import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as domainSchema from "~/lib/db/schema";
import * as authSchema from "~/lib/db/auth-schema";

const schema = { ...domainSchema, ...authSchema };

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set — copy .env.example to .env and fill it in.");
}

// Neon's pooled connection string works fine with postgres-js; one client is
// reused across requests rather than opening a new connection per call.
const client = postgres(process.env.DATABASE_URL, { prepare: false });

export const db = drizzle(client, { schema });
