import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request, context: any) {
  const { id } = context.params as { id: string };

  await db.delete(comments).where(eq(comments.id, Number(id)));
  return NextResponse.json({ success: true });
}
