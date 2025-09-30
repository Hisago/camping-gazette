import "dotenv/config";

import { db } from "../src/db/index.ts";
import { sections, items, categories } from "../src/db/schema.ts";

async function main() {
  console.log("🌱 Seeding database...");

  // Nettoyage
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

  // ✅ Catégories (Snack)
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

  // ✅ Activités
  await db.insert(items).values([
    { sectionId: activitiesSection.id, title: "Tournoi de pétanque", content: "Inscription à l’accueil, doublettes à partir de 15h", date: new Date("2025-07-20T15:00:00") },
    { sectionId: activitiesSection.id, title: "Soirée karaoké", content: "Ambiance garantie avec vos chansons préférées", date: new Date("2025-07-22T21:00:00") },
    { sectionId: activitiesSection.id, title: "Atelier enfants : peinture", content: "Pour les 6-12 ans, au club enfants", date: new Date("2025-07-23T10:00:00") },
    { sectionId: activitiesSection.id, title: "Aquagym", content: "Séance sportive et ludique dans la piscine", date: new Date("2025-07-24T11:00:00") },
  ]);

  // ✅ Gazette
  await db.insert(items).values([
    { sectionId: gazette.id, title: "Météo de la semaine", content: "Soleil prévu toute la semaine ☀️", date: new Date("2025-07-19T08:00:00") },
    { sectionId: gazette.id, title: "Nouveauté snack", content: "Découvrez notre nouvelle pizza 4 fromages 🧀", date: new Date("2025-07-18T12:00:00") },
    { sectionId: gazette.id, title: "Résultats tournoi foot", content: "L’équipe des Bungalows a gagné la finale 3-1 ⚽", date: new Date("2025-07-17T19:00:00") },
  ]);

  // ✅ Boutique
  await db.insert(items).values([
    { sectionId: shop.id, title: "T-shirt Camping", content: "Disponible en tailles S à XL", extra: "15 €" },
    { sectionId: shop.id, title: "Casquette", content: "Parfaite pour le soleil de l’été", extra: "8 €" },
    { sectionId: shop.id, title: "Mug souvenir", content: "Avec le logo du camping", extra: "6 €" },
    { sectionId: shop.id, title: "Peluche mascotte", content: "La mascotte officielle du camping 🐻", extra: "12 €" },
  ]);

  console.log("✅ Seed terminé !");
}

main().catch((err) => {
  console.error("❌ Erreur seed:", err);
  process.exit(1);
});
