import type { PlatformSlug } from "@/data/platforms";
import { PLATFORM_BY_SLUG } from "@/data/platforms";

/**
 * Env-backed affiliate / referral destinations.
 * Set AFFILIATE_<SLUG_UPPER>_URL in .env.local when programs are approved.
 * Example: AFFILIATE_HOMEEXCHANGE_URL=https://...flexoffers...
 *          AFFILIATE_TRUSTEDHOUSESITTERS_URL=https://...impact...
 */
const ENV_KEYS: Record<PlatformSlug, string> = {
  homeexchange: "AFFILIATE_HOMEEXCHANGE_URL",
  kindred: "AFFILIATE_KINDRED_URL",
  thirdhome: "AFFILIATE_THIRDHOME_URL",
  trustedhousesitters: "AFFILIATE_TRUSTEDHOUSESITTERS_URL",
  peoplelikeus: "AFFILIATE_PEOPLELIKEUS_URL",
  homelink: "AFFILIATE_HOMELINK_URL",
  behomm: "AFFILIATE_BEHOMM_URL",
  sabbaticalhomes: "AFFILIATE_SABBATICALHOMES_URL",
};

/** Optional static overrides (e.g. known public referral patterns). Env wins. */
const STATIC_AFFILIATE_URLS: Partial<Record<PlatformSlug, string>> = {
  // Fill when you have stable non-secret partner links.
  // homeexchange: "https://www.homeexchange.com/?ref=swapradar",
};

export function getAffiliateEnvKey(slug: PlatformSlug): string {
  return ENV_KEYS[slug];
}

export function resolveJoinUrl(slug: PlatformSlug): {
  url: string;
  source: "env" | "static" | "default";
} {
  const envKey = ENV_KEYS[slug];
  const fromEnv = process.env[envKey]?.trim();
  if (fromEnv) {
    return { url: fromEnv, source: "env" };
  }
  const fromStatic = STATIC_AFFILIATE_URLS[slug];
  if (fromStatic) {
    return { url: fromStatic, source: "static" };
  }
  return { url: PLATFORM_BY_SLUG[slug].joinUrl, source: "default" };
}

/**
 * Build final outbound URL with our attribution params.
 * Does not overwrite existing network tracking params on affiliate URLs.
 */
export function buildOutboundUrl(
  slug: PlatformSlug,
  src: string,
): { url: string; affiliateSource: "env" | "static" | "default" } {
  const { url: base, source } = resolveJoinUrl(slug);
  const target = new URL(base);

  if (!target.searchParams.has("utm_source")) {
    target.searchParams.set("utm_source", "swapradar");
  }
  if (!target.searchParams.has("utm_medium")) {
    target.searchParams.set("utm_medium", "referral");
  }
  if (!target.searchParams.has("utm_campaign")) {
    target.searchParams.set("utm_campaign", src.slice(0, 80));
  }

  return { url: target.toString(), affiliateSource: source };
}

export function listAffiliateConfig() {
  return (Object.keys(ENV_KEYS) as PlatformSlug[]).map((slug) => {
    const resolved = resolveJoinUrl(slug);
    return {
      slug,
      envKey: ENV_KEYS[slug],
      source: resolved.source,
      // never expose full secret query strings in admin UI if present — mask
      urlPreview: maskUrl(resolved.url),
    };
  });
}

function maskUrl(url: string): string {
  try {
    const u = new URL(url);
    if ([...u.searchParams.keys()].length === 0) return u.origin + u.pathname;
    return `${u.origin}${u.pathname}?…`;
  } catch {
    return "(invalid url)";
  }
}
