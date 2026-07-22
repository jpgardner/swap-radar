import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { PlatformSlug } from "@/data/platforms";

export type ClickoutRecord = {
  id: string;
  platform: PlatformSlug;
  source: string;
  path: string;
  affiliateSource: "env" | "static" | "default";
  userAgent?: string;
  referer?: string;
  ts: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const CLICKOUTS_FILE = path.join(DATA_DIR, "clickouts.jsonl");

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function recordClickout(
  input: Omit<ClickoutRecord, "id" | "ts"> & { ts?: string },
): Promise<ClickoutRecord> {
  const record: ClickoutRecord = {
    id: randomUUID(),
    ts: input.ts ?? new Date().toISOString(),
    platform: input.platform,
    source: input.source,
    path: input.path,
    affiliateSource: input.affiliateSource,
    userAgent: input.userAgent,
    referer: input.referer,
  };

  await ensureDataDir();
  await appendFile(CLICKOUTS_FILE, `${JSON.stringify(record)}\n`, "utf8");

  // Optional PostHog capture if key present (fire-and-forget HTTP)
  void capturePostHog(record);

  return record;
}

export async function listClickouts(limit = 100): Promise<ClickoutRecord[]> {
  try {
    const raw = await readFile(CLICKOUTS_FILE, "utf8");
    const lines = raw.split("\n").filter(Boolean);
    const rows: ClickoutRecord[] = [];
    for (let i = lines.length - 1; i >= 0 && rows.length < limit; i--) {
      try {
        rows.push(JSON.parse(lines[i]) as ClickoutRecord);
      } catch {
        // skip bad line
      }
    }
    return rows;
  } catch {
    return [];
  }
}

export async function clickoutStats(): Promise<{
  total: number;
  byPlatform: Record<string, number>;
  bySource: Record<string, number>;
}> {
  const all = await listClickouts(10_000);
  const byPlatform: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  for (const row of all) {
    byPlatform[row.platform] = (byPlatform[row.platform] ?? 0) + 1;
    bySource[row.source] = (bySource[row.source] ?? 0) + 1;
  }
  return { total: all.length, byPlatform, bySource };
}

/** Dev helper — wipe file */
export async function resetClickouts() {
  await ensureDataDir();
  await writeFile(CLICKOUTS_FILE, "", "utf8");
}

async function capturePostHog(record: ClickoutRecord) {
  const key = process.env.POSTHOG_API_KEY?.trim();
  const host =
    process.env.POSTHOG_HOST?.trim() || "https://us.i.posthog.com";
  if (!key) return;

  try {
    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event: "clickout",
        distinct_id: record.id,
        properties: {
          platform: record.platform,
          source: record.source,
          path: record.path,
          affiliate_source: record.affiliateSource,
        },
        timestamp: record.ts,
      }),
    });
  } catch {
    // non-blocking
  }
}
