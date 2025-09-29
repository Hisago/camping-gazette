import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL manquant !");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connexion réussie à PostgreSQL !");
    const res = await client.query("SELECT NOW()");
    console.log("Heure serveur :", res.rows[0]);
  } catch (err) {
    console.error("❌ Erreur connexion :", err);
  } finally {
    await client.end();
  }
}

main();
