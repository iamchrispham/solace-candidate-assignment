import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// no-op database fallback -- ameliorates conflicting type union
const createFallbackDb = (): PostgresJsDatabase => {
  return new Proxy(
    {},
    {
      get: () => {
        throw new Error("DATABASE_URL is not set");
      },
    }
  ) as PostgresJsDatabase;
};

const setup = (): PostgresJsDatabase => {
  if (!process.env.DATABASE_URL) {
    return createFallbackDb();
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  return drizzle(queryClient);
};

export default setup();
