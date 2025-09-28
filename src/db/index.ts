import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// connexion à SQLite
const sqlite = new Database("sqlite.db");

// on exporte drizzle avec le schéma
export const db = drizzle(sqlite, { schema });
