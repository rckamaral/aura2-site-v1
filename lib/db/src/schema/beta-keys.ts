import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const betaKeysTable = pgTable("beta_keys", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  usedBy: text("used_by"),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
