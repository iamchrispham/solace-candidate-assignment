import { advocates } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Advocate = Omit<
  InferSelectModel<typeof advocates>,
  "specialties"
> & { specialties: string[] };
