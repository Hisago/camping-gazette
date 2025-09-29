import { db } from "@/db";
import { sections, items } from "@/db/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import MenuLayout from "@/components/layouts/MenuLayout";
import ListLayout from "@/components/layouts/ListLayout";
import ActivitiesLayout from "@/components/layouts/ActivitiesLayout";
import CardsLayout from "@/components/layouts/CardsLayout";

import { Item } from "@/types";

export default async function SectionPage({ params }: { params: { slug: string } }) {
  // ✅ Récupérer une seule section
  const section = await db.query.sections.findFirst({
    where: eq(sections.slug, params.slug),
  });

  console.log("👉 params.slug =", params.slug);
  console.log("👉 section trouvé =", section);

  if (!section) return notFound();

  // ✅ Récupérer les items liés
  const rawItems = await db.query.items.findMany({
    where: eq(items.sectionId, section.id),
  });

  console.log("👉 items trouvés =", rawItems);

  // ✅ Transformation propre
  const content: Item[] = rawItems.map((it) => ({
    id: it.id,
    title: it.title,
    content: it.content ?? undefined,
    date: it.date ? new Date(it.date).toISOString() : undefined,
    extra: it.extra ?? undefined,
    category: it.category ?? undefined,
  }));

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">{section.name}</h1>

      {section.type === "menu" && <MenuLayout items={content} />}
      {section.type === "list" && <ListLayout items={content} />}
      {section.type === "activities" && <ActivitiesLayout items={content} />}
      {section.type === "cards" && <CardsLayout items={content} />}
    </main>
  );
}
