import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db
    .select()
    .from(comments)
    .orderBy(desc(comments.date));
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.author || !body.message) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const [inserted] = await db
    .insert(comments)
    .values({
      author: body.author,
      message: body.message,
      date: new Date(),
    })
    .returning();

  return NextResponse.json(inserted);
}
