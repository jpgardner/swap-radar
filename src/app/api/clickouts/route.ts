import { NextResponse, type NextRequest } from "next/server";
import { clickoutStats, listClickouts } from "@/lib/clickouts";

export const runtime = "nodejs";

/**
 * Read clickouts. Protect with CLICKOUTS_ADMIN_TOKEN in production.
 * Header: Authorization: Bearer <token>
 * Local dev: open if token unset.
 */
export async function GET(request: NextRequest) {
  const token = process.env.CLICKOUTS_ADMIN_TOKEN?.trim();
  if (token) {
    const auth = request.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${token}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const limit = Math.min(
    500,
    Number(request.nextUrl.searchParams.get("limit") ?? 100) || 100,
  );
  const [items, stats] = await Promise.all([
    listClickouts(limit),
    clickoutStats(),
  ]);

  return NextResponse.json({ stats, items });
}
