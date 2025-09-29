import { db } from "../src/db";
import { sections, items, categories } from "../src/db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Vider les tables (dans le bon ordre pour éviter FK)
  db.delete(items).run();
  db.delete(sections).run();
  db.delete(categories).run();

  // Créer catégories avec ordre
 db.insert(categories).values([
  { name: "Entrées", slug: "entrees", order: 1 },
  { name: "Plats", slug: "plats", order: 2 },
  { name: "Desserts", slug: "desserts", order: 3 },
  { name: "Boissons", slug: "boissons", order: 4 },
]).run();


  // Créer les sections
  const [snack] = db
    .insert(sections)
    .values({ name: "Snack", slug: "snack", type: "menu" })
    .returning()
    .all();

  const [activitiesSection] = db
    .insert(sections)
    .values({ name: "Activités", slug: "activities", type: "activities" })
    .returning()
    .all();

  const [gazette] = db
    .insert(sections)
    .values({ name: "Gazette", slug: "gazette", type: "list" })
    .returning()
    .all();

  const [shop] = db
    .insert(sections)
    .values({ name: "Boutique", slug: "shop", type: "cards" })
    .returning()
    .all();

  // ✅ Menu (Snack)
  db.insert(items).values([
    { sectionId: snack.id, title: "Pizza Margherita", content: "Tomates, mozzarella, basilic frais", category: "Plats", extra: "10" },
    { sectionId: snack.id, title: "Burger maison", content: "Steak, cheddar, salade spéciale", category: "Plats", extra: "12" },
    { sectionId: snack.id, title: "Frites", content: "Portion généreuse", category: "Entrées", extra: "4" },
    { sectionId: snack.id, title: "Salade César", content: "Salade, poulet grillé, parmesan", category: "Entrées", extra: "8" },
    { sectionId: snack.id, title: "Coca-Cola 33cl", content: "Servi bien frais", category: "Boissons", extra: "2.5" },
    { sectionId: snack.id, title: "Eau minérale", content: "Bouteille 50cl", category: "Boissons", extra: "1.5" },
    { sectionId: snack.id, title: "Glace vanille", content: "Deux boules artisanales", category: "Desserts", extra: "3.5" },
    { sectionId: snack.id, title: "Crêpe au chocolat", content: "Avec Nutella et chantilly", category: "Desserts", extra: "4.5" },
    { sectionId: snack.id, title: "Tarte aux pommes", content: "Pâtisserie maison croustillante", category: "Desserts", extra: "4" },
    { sectionId: snack.id, title: "Café expresso", content: "Petit café serré italien", category: "Boissons", extra: "2" },
  ]).run();

  // (les autres sections inchangées)
  db.insert(items).values([
    { sectionId: activitiesSection.id, title: "Tournoi de pétanque", content: "Venez nombreux !", date: new Date("2025-07-20T15:00:00"), extra: "Terrain central" },
    // ...
  ]).run();

  console.log("✅ Seed terminé !");
}

main();
