import { db } from "../src/db";
import { sections, items } from "../src/db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Vider les tables
  db.delete(items).run();
  db.delete(sections).run();

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
    { sectionId: snack.id, title: "Burger maison", content: "Steak, cheddar, salade, sauce spéciale", category: "Plats", extra: "12" },
    { sectionId: snack.id, title: "Frites", content: "Portion généreuse de frites croustillantes", category: "Entrées", extra: "4" },
    { sectionId: snack.id, title: "Salade César", content: "Salade, poulet grillé, parmesan, croûtons", category: "Entrées", extra: "8" },
    { sectionId: snack.id, title: "Coca-Cola 33cl", content: "Servi bien frais", category: "Boissons", extra: "2.5" },
    { sectionId: snack.id, title: "Eau minérale", content: "Bouteille 50cl", category: "Boissons", extra: "1.5" },
    { sectionId: snack.id, title: "Glace vanille", content: "Deux boules de glace artisanale", category: "Desserts", extra: "3.5" },
    { sectionId: snack.id, title: "Crêpe au chocolat", content: "Avec Nutella et chantilly", category: "Desserts", extra: "4.5" },
    { sectionId: snack.id, title: "Tarte aux pommes", content: "Pâtisserie maison croustillante", category: "Desserts", extra: "4" },
    { sectionId: snack.id, title: "Café expresso", content: "Petit café serré italien", category: "Boissons", extra: "2" },
  ]).run();

  // ✅ Activités
  db.insert(items).values([
    { sectionId: activitiesSection.id, title: "Tournoi de pétanque", content: "Venez nombreux !", date: new Date("2025-07-20T15:00:00"), extra: "Terrain central" },
    { sectionId: activitiesSection.id, title: "Atelier peinture enfants", content: "Atelier créatif pour petits campeurs", date: new Date("2025-07-21T10:00:00"), extra: "Salle animation" },
    { sectionId: activitiesSection.id, title: "Randonnée en forêt", content: "Parcours découverte avec guide", date: new Date("2025-07-22T09:00:00"), extra: "Point info" },
    { sectionId: activitiesSection.id, title: "Karaoké au bar", content: "Soirée conviviale pour chanter", date: new Date("2025-07-22T21:00:00"), extra: "Bar du camping" },
    { sectionId: activitiesSection.id, title: "Aquagym", content: "Séance sportive à la piscine", date: new Date("2025-07-23T11:00:00"), extra: "Piscine" },
    { sectionId: activitiesSection.id, title: "Tournoi de volley", content: "Constituez vos équipes", date: new Date("2025-07-23T16:00:00"), extra: "Terrain de sport" },
    { sectionId: activitiesSection.id, title: "Soirée cinéma", content: "Projection en plein air", date: new Date("2025-07-23T22:00:00"), extra: "Place centrale" },
    { sectionId: activitiesSection.id, title: "Cours de yoga", content: "Session détente et relaxation", date: new Date("2025-07-24T08:30:00"), extra: "Salle bien-être" },
    { sectionId: activitiesSection.id, title: "Tournoi de belote", content: "Parties amicales et lots à gagner", date: new Date("2025-07-24T14:00:00"), extra: "Salle commune" },
    { sectionId: activitiesSection.id, title: "Chasse au trésor", content: "Pour les enfants, récompense à la clé", date: new Date("2025-07-25T10:00:00"), extra: "Accueil" },
  ]).run();

  // ✅ Gazette
  db.insert(items).values([
    { sectionId: gazette.id, title: "Soirée Karaoké 🎤", content: "Ce soir, rejoignez-nous au bar du camping pour chanter vos tubes préférés !", date: new Date("2025-07-19T20:00:00") },
    { sectionId: gazette.id, title: "Ouverture de la piscine 🏊", content: "La piscine est ouverte tous les jours de 10h à 20h.", date: new Date("2025-07-20T10:00:00") },
    { sectionId: gazette.id, title: "Marché des producteurs locaux 🧺", content: "Venez découvrir les produits régionaux chaque matin.", date: new Date("2025-07-21T08:00:00") },
    { sectionId: gazette.id, title: "Soirée dansante 💃", content: "Animation DJ sous les étoiles.", date: new Date("2025-07-21T22:00:00") },
    { sectionId: gazette.id, title: "Concours de châteaux de sable 🏖️", content: "Pour petits et grands, lots à gagner.", date: new Date("2025-07-22T15:00:00") },
    { sectionId: gazette.id, title: "Tournoi de ping-pong 🏓", content: "Inscriptions à l'accueil.", date: new Date("2025-07-22T18:00:00") },
    { sectionId: gazette.id, title: "Spectacle de magie ✨", content: "Une soirée féerique pour toute la famille.", date: new Date("2025-07-23T20:00:00") },
    { sectionId: gazette.id, title: "Atelier cuisine 👨‍🍳", content: "Recettes locales à découvrir.", date: new Date("2025-07-23T10:00:00") },
    { sectionId: gazette.id, title: "Concert acoustique 🎶", content: "Ambiance chill et guitares.", date: new Date("2025-07-24T19:00:00") },
    { sectionId: gazette.id, title: "Olympiades du camping 🏆", content: "Épreuves sportives et récompenses.", date: new Date("2025-07-25T14:00:00") },
  ]).run();

  // ✅ Boutique
  db.insert(items).values([
    { sectionId: shop.id, title: "T-shirt du camping", content: "Disponible en toutes tailles - 15€" },
    { sectionId: shop.id, title: "Casquette officielle", content: "Protégez-vous du soleil - 10€" },
    { sectionId: shop.id, title: "Mug souvenir", content: "Idéal pour le café du matin - 6€" },
  ]).run();

  console.log("✅ Seed terminé !");
}

main();
