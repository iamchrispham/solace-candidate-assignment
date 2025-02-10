import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  customType,
} from "drizzle-orm/pg-core";

const tsvectorType = customType<{
  data: string;
  driverParam: string;
  notNull: false;
}>({
  dataType: () => "tsvector",
});

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  searchVector: tsvectorType("search_vector"),
});

export { advocates };
