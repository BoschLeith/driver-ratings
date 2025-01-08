import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
