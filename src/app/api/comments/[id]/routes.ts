import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { RouteContext } from "@/types/next"; // ✅ typage global

export async function DELETE(
  _req: Request,
  context: RouteContext<{ id: string }>
) {
  const { id } = context.params;

  await db.delete(comments).where(eq(comments.id, Number(id)));
  return NextResponse.json({ success: true });
}
