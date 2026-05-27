import { pgTable, serial, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const ticketStatusEnum = pgEnum("ticket_status", ["open", "answered", "closed"]);

export const ticketsTable = pgTable("tickets", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 120 }).notNull(),
  message: text("message").notNull(),
  status: ticketStatusEnum("status").default("open").notNull(),
  adminReply: text("admin_reply"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Ticket = typeof ticketsTable.$inferSelect;
