import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: "advocates",
  },
  verbose: true,
  strict: true,
});

export default config;
