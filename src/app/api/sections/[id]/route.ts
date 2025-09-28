import { db } from "@/db";
import { sections, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // enlever accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}


export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  console.log("➡️ PUT sections", { id, body });

  try {
    const updateData: any = {};

    if (body.name) {
      updateData.name = body.name;
      updateData.slug = toSlug(body.name);
    }
    if (body.type) {
      updateData.type = body.type;
    }

    const result = await db
      .update(sections)
      .set(updateData)
      .where(eq(sections.id, Number(id)))
      .returning()
      .get();

    console.log("✅ UPDATE result", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Erreur PUT /api/sections/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Supprimer les items liés
    await db.delete(items).where(eq(items.sectionId, Number(id)));

    // Supprimer la section
    await db.delete(sections).where(eq(sections.id, Number(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE section:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}