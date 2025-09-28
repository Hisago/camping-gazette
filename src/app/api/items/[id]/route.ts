import { db } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  
  const { id } = await context.params;
const raw = await req.text();
console.log("📜 RAW body:", raw);
const body = JSON.parse(raw);
  console.log("➡️ [PUT /api/items/[id]] id:", id);
  console.log("➡️ Body reçu:", JSON.stringify(body));

  try {
    // Lire avant modification
    const before = await db.query.items.findFirst({
      where: eq(items.id, Number(id)),
    });
    console.log("📦 En DB AVANT update:", before);

    const updateData: Record<string, any> = {};

    if (body.title !== undefined) updateData.title = body.title; // accepte emoji
    if (body.content !== undefined) updateData.content = body.content;
    if (body.extra !== undefined) updateData.extra = body.extra;
    if (body.category !== undefined) updateData.category = body.category; // accepte emoji

    if (body.date) {
      if (typeof body.date === "string") {
        const parsed = new Date(body.date);
        if (!isNaN(parsed.getTime())) {
          updateData.date = parsed;
        }
      } else if (body.date instanceof Date) {
        updateData.date = body.date;
      }
    }

    console.log("➡️ updateData construit:", JSON.stringify(updateData));

    // Faire l'update
    const result = await db
      .update(items)
      .set(updateData)
      .where(eq(items.id, Number(id)));

    console.log("✅ Résultat brut UPDATE:", result);

    // Relire après modification
    const after = await db.query.items.findFirst({
      where: eq(items.id, Number(id)),
    });
    console.log("📦 En DB APRÈS update:", after);

    return NextResponse.json(after);
  } catch (error) {
    console.error("❌ Erreur PUT /api/items/[id]:", error, "body:", body);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await db.delete(items).where(eq(items.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Erreur DELETE /api/items/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
