import { db } from "@/db";
import { sections } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// GET → lister toutes les sections
export async function GET() {
  const all = db.select().from(sections).all();
  return NextResponse.json(all);
}

// POST → ajouter une section
export async function POST(req: Request) {
  const body = await req.json();
  const result = db.insert(sections).values({
    name: body.name,
    slug: body.slug,
    type: body.type,
  }).returning().get();

  return NextResponse.json(result);
}

// DELETE → supprimer une section
export async function DELETE(req: Request) {
  const body = await req.json();
  db.delete(sections).where(eq(sections.id, body.id)).run();
  return NextResponse.json({ success: true });
}
