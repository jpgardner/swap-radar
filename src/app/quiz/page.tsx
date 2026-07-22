import type { Metadata } from "next";
import { QuizForm } from "@/components/QuizForm";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Answer a few questions to get ranked home exchange and free-stay platforms.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <p className="text-sm font-medium text-zinc-500">90 seconds · no account</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        Which swap model fits you?
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        We’ll rank platforms using fixed editorial rules (
        <code className="text-sm">quiz_rules_v1</code>), then send you out via
        tracked links.
      </p>
      <div className="mt-10">
        <QuizForm />
      </div>
    </div>
  );
}
