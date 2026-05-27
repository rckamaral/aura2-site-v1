import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const partnerStatusEnum = pgEnum("partner_status", ["pending", "approved", "rejected"]);
export const partnerPlatformEnum = pgEnum("partner_platform", ["twitch", "youtube", "kick", "other"]);

export const partnerApplications = pgTable("partner_applications", {
  id: serial("id").primaryKey(),
  channelName: text("channel_name").notNull(),
  platform: partnerPlatformEnum("platform").notNull(),
  channelUrl: text("channel_url").notNull(),
  avgViewers: text("avg_viewers").notNull(),
  schedule: text("schedule").notNull(),
  motivation: text("motivation").notNull(),
  discordTag: text("discord_tag").notNull(),
  status: partnerStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
