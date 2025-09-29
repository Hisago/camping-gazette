import { db } from "@/db";
import { items, sections } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

// petit helper robuste
function toDate(val: unknown) {
  if (!val) return null;
  const d = new Date(String(val));
  return isNaN(d.getTime()) ? null : d;
}

// GET → tri par date seulement pour activities & list (gazette)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId");

  if (sectionId) {
    // on regarde le type de la section pour savoir si on trie par date
    const section = await db.query.sections.findFirst({
      where: eq(sections.id, Number(sectionId)),
    });

    const baseQuery = db
      .select()
      .from(items)
      .where(eq(items.sectionId, Number(sectionId)));

    const all =
      section?.type === "activities" || section?.type === "list"
        ? await baseQuery.orderBy(desc(items.date))
        : await baseQuery;

    return NextResponse.json(all);
  }

  // si pas de sectionId, renvoie tout (pas de tri global par défaut)
  const all = await db.select().from(items);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const body = await req.json();

  // Si pas de date → on met la date du jour
  let finalDate = toDate(body.date);
  if (!finalDate) {
    finalDate = new Date();
  }

  const result = await db
    .insert(items)
    .values({
      sectionId: body.sectionId,
      title: body.title,
      content: body.content ?? null,
      extra: body.extra ?? null,
      date: finalDate,
      category: body.category ?? null,
    })
    .returning();

  return NextResponse.json(result[0]); // drizzle renvoie un tableau
}

// DELETE → supprimer un item
export async function DELETE(req: Request) {
  const body = await req.json();
  await db.delete(items).where(eq(items.id, body.id));
  return NextResponse.json({ success: true });
}
