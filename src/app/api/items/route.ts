import { db } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: any) {
  const { id } = context.params as { id: string };
  const body = await req.json();

  console.log("➡️ [PUT /api/items/[id]] id:", id);
  console.log("➡️ Body reçu:", JSON.stringify(body));

  try {
    const before = await db.query.items.findFirst({
      where: eq(items.id, Number(id)),
    });
    console.log("📦 En DB AVANT update:", before);

    const updateData: Record<string, any> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.extra !== undefined) updateData.extra = body.extra;
    if (body.category !== undefined) updateData.category = body.category;

    if (body.date) {
      const parsed = new Date(body.date);
      if (!isNaN(parsed.getTime())) {
        updateData.date = parsed;
      }
    }

    console.log("➡️ updateData construit:", JSON.stringify(updateData));

    const updated = await db
      .update(items)
      .set(updateData)
      .where(eq(items.id, Number(id)))
      .returning();

    console.log("✅ Résultat UPDATE:", updated);

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("❌ Erreur PUT /api/items/[id]:", error, "body:", body);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: any) {
  const { id } = context.params as { id: string };

  try {
    await db.delete(items).where(eq(items.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Erreur DELETE /api/items/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
