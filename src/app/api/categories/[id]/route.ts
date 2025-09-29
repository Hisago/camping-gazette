import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { RouteContext } from "@/types/next"; // ✅ import du type global

// PATCH /api/categories/[id]
export async function PATCH(
  req: Request,
  context: RouteContext<{ id: string }>
) {
  try {
    const { id } = context.params; // ✅ plus besoin de await
    const { order } = await req.json();

    await db
      .update(categories)
      .set({ order })
      .where(eq(categories.id, Number(id)));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur PATCH /api/categories/[id]", err);
    return NextResponse.json(
      { error: "Erreur update catégorie" },
      { status: 500 }
    );
  }
}
