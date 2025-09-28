import { db } from "@/db";
import { sections, items } from "@/db/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

// Import layouts
import MenuLayout from "@/components/layouts/MenuLayout";
import ListLayout from "@/components/layouts/ListLayout";
import ActivitiesLayout from "@/components/layouts/ActivitiesLayout";
import CardsLayout from "@/components/layouts/CardsLayout";

// Ton type Item attendu par les layouts
type Item = {
  id: number;
  title: string;
  content?: string;
  date?: string;   // ✅ string (ISO)
  extra?: string;
};

export default function SectionPage({ params }: { params: { slug: string } }) {
  const section = db
    .select()
    .from(sections)
    .where(eq(sections.slug, params.slug))
    .get();

  if (!section) return notFound();

  // Récupération brute des items
  const rawItems = db
    .select()
    .from(items)
    .where(eq(items.sectionId, section.id))
    .all();

  // Mapping vers ton type Item (conversion Date → string ISO)
  const content: Item[] = rawItems.map((it) => ({
    id: it.id,
    title: it.title,
    content: it.content ?? undefined,
    date: it.date ? new Date(it.date).toISOString() : undefined,  // ✅ conversion ici
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
