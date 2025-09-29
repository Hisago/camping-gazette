import { db } from "@/db";
import { sections } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// ✅ GET → lister toutes les sections
export async function GET() {
  const all = await db.select().from(sections).execute();
  return NextResponse.json(all);
}

// ✅ POST → ajouter une section
export async function POST(req: Request) {
  const body = await req.json();

  const result = await db
    .insert(sections)
    .values({
      name: body.name,
      slug: body.slug,
      type: body.type,
    })
    .returning()
    .execute();

  // returning() renvoie un tableau → on prend le premier
  return NextResponse.json(result[0]);
}

// ✅ DELETE → supprimer une section
export async function DELETE(req: Request) {
  const body = await req.json();

  await db.delete(sections).where(eq(sections.id, body.id)).execute();

  return NextResponse.json({ success: true });
}
