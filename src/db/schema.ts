import { pgTable, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const registrationsTable = pgTable("registration_table", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Basic user info
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  regNo: varchar("reg_no", { length: 50 }),
  course: varchar("course", { length: 100 }).notNull(),

  // Store all selected events and participants
  events: jsonb("events")
    .$type<
      {
        event: {
          name: string;
          type: string;
          description: string;
        };
        participants: string[];
      }[]
    >()
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
