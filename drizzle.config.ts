import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",               // ✅ et non "driver"
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
