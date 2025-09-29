import { db } from "@/db";
import { categories } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const result = await db.select().from(categories);
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Nom et slug obligatoires" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(categories)
      .values({ name, slug })
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (err: any) {
    console.error("Erreur POST /api/categories", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

