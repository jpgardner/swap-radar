import { NextResponse, type NextRequest } from "next/server";
import { isPlatformSlug, type PlatformSlug } from "@/data/platforms";
import { buildOutboundUrl } from "@/lib/affiliates";
import { recordClickout } from "@/lib/clickouts";

export const runtime = "nodejs";

/**
 * Tracked outbound redirect with affiliate resolution + persistent clickout log.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const src = request.nextUrl.searchParams.get("src") ?? "unknown";

  if (!isPlatformSlug(slug)) {
    return NextResponse.redirect(new URL("/compare", request.url), 302);
  }

  const platformSlug = slug as PlatformSlug;
  const { url, affiliateSource } = buildOutboundUrl(platformSlug, src);

  try {
    await recordClickout({
      platform: platformSlug,
      source: src.slice(0, 120),
      path: request.nextUrl.pathname,
      affiliateSource,
      userAgent: request.headers.get("user-agent") ?? undefined,
      referer: request.headers.get("referer") ?? undefined,
    });
  } catch (err) {
    console.error("clickout_persist_failed", err);
  }

  return NextResponse.redirect(url, 302);
}
