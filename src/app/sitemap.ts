import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://swapradar.example";

const paths = [
  "/",
  "/quiz",
  "/compare",
  "/tools/savings-calculator",
  "/guides/best-home-exchange-sites",
  "/guides/how-home-exchange-works",
  "/guides/home-exchange-vs-airbnb-vs-house-sitting",
  "/guides/can-renters-home-swap",
  "/guides/long-stay-home-exchange",
  "/guides/is-home-exchange-worth-it",
  "/compare/kindred-vs-homeexchange",
  "/compare/trustedhousesitters-vs-home-exchange",
  "/destinations/lisbon",
  "/destinations/mexico-city",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" || path === "/quiz" ? 1 : 0.7,
  }));
}
