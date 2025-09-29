import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// Table Users (admin uniquement)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(), // ⚠️ à hasher plus tard
});

// Table des sections (catégories dynamiques du site)
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),       // ex: "Snack", "Gazette"
  slug: text("slug").notNull().unique(), // ex: "snack", "gazette"
  type: text("type").notNull().default("list"), 
  // types possibles: "menu", "list", "cards", "activities"
});

// Table des items (contenus liés à une section)
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id")
    .notNull()
    .references(() => sections.id),
  title: text("title").notNull(),
  content: text("content"),
  date: timestamp("date", { withTimezone: true }), // ✅ Postgres timestamp
  extra: text("extra"),
  category: text("category"), // ✅ ajout
});

// Table des catégories (menu)
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),   // Nom affiché (Entrées, Plats, etc.)
  slug: text("slug").notNull().unique(), // Identifiant
  order: integer("order").notNull().default(0), // ✅ garde le champ "order"
});

// Table des commentaires
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  message: text("message").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
});
