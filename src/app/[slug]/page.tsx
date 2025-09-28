import { db } from "@/db";
import { sections, items } from "@/db/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import MenuLayout from "@/components/layouts/MenuLayout";
import ListLayout from "@/components/layouts/ListLayout";
import ActivitiesLayout from "@/components/layouts/ActivitiesLayout";
import CardsLayout from "@/components/layouts/CardsLayout";

import { Item } from "@/types"; 

// ✅ déblocage rapide avec `any` pour Render
export default function SectionPage({ params }: any) {
  const section = db
    .select()
    .from(sections)
    .where(eq(sections.slug, params.slug))
    .get();

  if (!section) return notFound();

  const rawItems = db
    .select()
    .from(items)
    .where(eq(items.sectionId, section.id))
    .all();

  const content: Item[] = rawItems.map((it) => ({
    id: it.id,
    title: it.title,
    content: it.content ?? undefined,
    date: it.date ? new Date(it.date).toISOString() : undefined,
    extra: it.extra ?? undefined,
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
