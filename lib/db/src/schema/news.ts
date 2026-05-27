import { pgTable, serial, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const newsTable = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  author: varchar("author", { length: 50 }).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type NewsItem = typeof newsTable.$inferSelect;
