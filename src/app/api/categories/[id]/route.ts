import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { order } = await req.json();

    await db
      .update(categories)
      .set({ order })
      .where(eq(categories.id, Number(params.id)));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur PATCH /api/categories/[id]", err);
    return NextResponse.json(
      { error: "Erreur update catégorie" },
      { status: 500 }
    );
  }
}
