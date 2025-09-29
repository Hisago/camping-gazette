import "dotenv/config";

import { db } from "../src/db/index.ts";
import { sections, items, categories } from "../src/db/schema.ts";


async function main() {
  console.log("🌱 Seeding database...");

  // ⚠️ Postgres : pas de .run(), il faut await
  await db.delete(items);
  await db.delete(sections);
  await db.delete(categories);

  // Créer les sections
  const [snack] = await db
    .insert(sections)
    .values({ name: "Snack", slug: "snack", type: "menu" })
    .returning();

  const [activitiesSection] = await db
    .insert(sections)
    .values({ name: "Activités", slug: "activities", type: "activities" })
    .returning();

  const [gazette] = await db
    .insert(sections)
    .values({ name: "Gazette", slug: "gazette", type: "list" })
    .returning();

  const [shop] = await db
    .insert(sections)
    .values({ name: "Boutique", slug: "shop", type: "cards" })
    .returning();

  // ✅ Catégories (avec ordre)
  await db.insert(categories).values([
    { name: "Entrées", slug: "entrees", order: 1 },
    { name: "Plats", slug: "plats", order: 2 },
    { name: "Desserts", slug: "desserts", order: 3 },
    { name: "Boissons", slug: "boissons", order: 4 },
  ]);

  // ✅ Menu (Snack)
  await db.insert(items).values([
    { sectionId: snack.id, title: "Pizza Margherita", content: "Tomates, mozzarella, basilic frais", category: "Plats", extra: "10" },
    { sectionId: snack.id, title: "Burger maison", content: "Steak, cheddar, salade, sauce spéciale", category: "Plats", extra: "12" },
    { sectionId: snack.id, title: "Frites", content: "Portion généreuse de frites croustillantes", category: "Entrées", extra: "4" },
    { sectionId: snack.id, title: "Salade César", content: "Salade, poulet grillé, parmesan, croûtons", category: "Entrées", extra: "8" },
    { sectionId: snack.id, title: "Coca-Cola 33cl", content: "Servi bien frais", category: "Boissons", extra: "2.5" },
    { sectionId: snack.id, title: "Eau minérale", content: "Bouteille 50cl", category: "Boissons", extra: "1.5" },
    { sectionId: snack.id, title: "Glace vanille", content: "Deux boules de glace artisanale", category: "Desserts", extra: "3.5" },
    { sectionId: snack.id, title: "Crêpe au chocolat", content: "Avec Nutella et chantilly", category: "Desserts", extra: "4.5" },
    { sectionId: snack.id, title: "Tarte aux pommes", content: "Pâtisserie maison croustillante", category: "Desserts", extra: "4" },
    { sectionId: snack.id, title: "Café expresso", content: "Petit café serré italien", category: "Boissons", extra: "2" },
  ]);

  console.log("✅ Seed terminé !");
}

main().catch((err) => {
  console.error("❌ Erreur seed:", err);
  process.exit(1);
});
