import type { Metadata } from "next";
import { getDestination } from "@/data/destinations";
import { DestinationPage } from "@/components/content/DestinationPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Exchange in Lisbon — Platforms, Timing & Cost Offset",
  description:
    "How to home swap or house-sit in Lisbon: which platforms to try, seasonality, and savings vs hotels.",
};

export default function Page() {
  const destination = getDestination("lisbon");
  if (!destination) notFound();
  return <DestinationPage destination={destination} />;
}
