import { db } from "@/db";
import { items, sections } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

// petit helper robuste
function toDate(val: unknown) {
  if (!val) return null;
  const d = new Date(String(val)); // accepte "2025-07-25T10:00", "2025-07-25T10:00:00", number...
  return isNaN(d.getTime()) ? null : d;
}

// GET → tri par date seulement pour activities & list (gazette)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId");

  if (sectionId) {
    // on regarde le type de la section pour savoir si on trie par date
    const section = db
      .select()
      .from(sections)
      .where(eq(sections.id, Number(sectionId)))
      .get();

    const q = db
      .select()
      .from(items)
      .where(eq(items.sectionId, Number(sectionId)));

    const all =
      section?.type === "activities" || section?.type === "list"
        ? q.orderBy(desc(items.date)).all()
        : q.all();

    return NextResponse.json(all);
  }

  // si pas de sectionId, renvoie tout (pas de tri global par défaut)
  const all = db.select().from(items).all();
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
      date: finalDate, // ✅ toujours une Date
      category: body.category ?? null,
    })
    .returning()
    .get();

  return NextResponse.json(result);
}

// (si tu as un PUT /api/items/[id], fais pareil : toDate(body.date))
// DELETE : inchangé

// DELETE → supprimer un item
export async function DELETE(req: Request) {
  const body = await req.json();
  db.delete(items).where(eq(items.id, body.id)).run();
  return NextResponse.json({ success: true });
}
