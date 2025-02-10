import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("searchTerm") || "";

    if (!searchTerm) {
      const data = await db.select().from(advocates);
      return NextResponse.json({ status: 200, data });
    }

    const data = await db
      .select()
      .from(advocates)
      .where(
        sql<boolean>`search_vector @@ plainto_tsquery('english', ${searchTerm})`
      )
      .execute();

    return NextResponse.json({ status: 200, data });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
