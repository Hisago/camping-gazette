import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Table Users (admin uniquement)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password: text("password").notNull(), // ⚠️ à hasher plus tard
});

// Table des sections (catégories dynamiques du site)
export const sections = sqliteTable("sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),       // ex: "Snack", "Gazette"
  slug: text("slug").notNull().unique(), // ex: "snack", "gazette"
  type: text("type").notNull().default("list"), 
  // types possibles: "menu", "list", "cards", "activities"
});


// Table des items (contenus liés à une section)
export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sectionId: integer("section_id").notNull().references(() => sections.id),
  title: text("title").notNull(),
  content: text("content"),
  date: integer("date", { mode: "timestamp" }), // ✅ stocké en timestamp
  extra: text("extra"),
  category: text("category"), // ✅ ajout
});


export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),   // Nom affiché (Entrées, Plats, etc.)
  slug: text("slug").notNull().unique(), // Identifiant
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  author: text("author").notNull(),
  message: text("message").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
});