import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  out: "./drizzle",
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["lgvp_*"],
} satisfies Config;
/*
export default {
  out: "./drizzle",
  dialect: "postgresql",
  driver: "pg", // or 'node-pg'
} satisfies Config;
  driver: "pg",
  
*/