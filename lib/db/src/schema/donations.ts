import { pgTable, serial, varchar, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const donationStatusEnum = pgEnum("donation_status", ["pending", "approved", "rejected", "cancelled"]);

export const donationsTable = pgTable("donations", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  packageLabel: varchar("package_label", { length: 60 }).notNull(),
  coinsAmount: integer("coins_amount").notNull(),
  priceBrl: integer("price_brl").notNull(),
  status: donationStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  mpPaymentId: varchar("mp_payment_id", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Donation = typeof donationsTable.$inferSelect;
