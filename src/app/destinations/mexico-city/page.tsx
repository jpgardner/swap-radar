import type { Metadata } from "next";
import { getDestination } from "@/data/destinations";
import { DestinationPage } from "@/components/content/DestinationPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Exchange in Mexico City — Swap, Sit & Mid-Term Options",
  description:
    "Plan a Mexico City home swap or house sit: platform fit, long-stay notes, and cost vs hotels.",
};

export default function Page() {
  const destination = getDestination("mexico-city");
  if (!destination) notFound();
  return <DestinationPage destination={destination} />;
}
