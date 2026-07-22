"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PLATFORM_BY_SLUG } from "@/data/platforms";
import { QUIZ_QUESTIONS, scoreQuiz, type QuizAnswers } from "@/lib/quiz";
import type { PetsKidsFlag } from "@/lib/quiz/types";

type StepId = (typeof QUIZ_QUESTIONS)[number]["id"];

const REQUIRED_STEPS = QUIZ_QUESTIONS.filter(
  (q) => !("optional" in q && q.optional),
);

export function QuizForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    pets_kids: [],
    destinations: [],
  });
  const [done, setDone] = useState(false);

  const question = QUIZ_QUESTIONS[step];
  const isLastRequired = step === REQUIRED_STEPS.length - 1;
  const isDestinations = question.id === "destinations";

  const result = useMemo(() => {
    if (!done) return null;
    if (
      !answers.housing_status ||
      !answers.trip_length ||
      !answers.simultaneous_ok ||
      !answers.budget_membership ||
      !answers.luxury ||
      !answers.travel_style
    ) {
      return null;
    }
    const pets =
      answers.pets_kids && answers.pets_kids.length > 0
        ? answers.pets_kids
        : (["none"] as PetsKidsFlag[]);
    return scoreQuiz({
      housing_status: answers.housing_status,
      trip_length: answers.trip_length,
      simultaneous_ok: answers.simultaneous_ok,
      budget_membership: answers.budget_membership,
      luxury: answers.luxury,
      travel_style: answers.travel_style,
      pets_kids: pets,
      destinations: answers.destinations,
    });
  }, [done, answers]);

  function setSingle<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMulti(key: "pets_kids" | "destinations", value: string) {
    setAnswers((prev) => {
      if (key === "pets_kids") {
        const flag = value as PetsKidsFlag;
        const current = prev.pets_kids ?? [];
        if (flag === "none") return { ...prev, pets_kids: ["none"] };
        const withoutNone = current.filter((v) => v !== "none");
        const next = withoutNone.includes(flag)
          ? withoutNone.filter((v) => v !== flag)
          : [...withoutNone, flag];
        return {
          ...prev,
          pets_kids: next.length ? next : (["none"] as PetsKidsFlag[]),
        };
      }
      const current = prev.destinations ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value].slice(0, 5);
      return { ...prev, destinations: next };
    });
  }

  function canContinue(): boolean {
    if (!question) return false;
    if (question.id === "destinations") return true;
    if (question.id === "pets_kids") {
      return (answers.pets_kids?.length ?? 0) > 0;
    }
    const id = question.id as Exclude<StepId, "destinations" | "pets_kids">;
    return Boolean(answers[id]);
  }

  function next() {
    if (question.id === "pets_kids" && step === REQUIRED_STEPS.length - 1) {
      // move to optional destinations
      setStep(REQUIRED_STEPS.length);
      return;
    }
    if (isDestinations || step >= QUIZ_QUESTIONS.length - 1) {
      setDone(true);
      return;
    }
    if (isLastRequired) {
      setStep(REQUIRED_STEPS.length); // destinations optional
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function skipDestinations() {
    setDone(true);
  }

  if (done && result) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Your match · {result.rulesVersion}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Top platforms for you
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Ranked by how you answered — not by who pays us more.
          </p>
        </div>

        <ol className="space-y-4">
          {result.rankings.map((row) => {
            const p = PLATFORM_BY_SLUG[row.slug];
            return (
              <li
                key={row.slug}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      #{row.rank}
                    </p>
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {p.shortBlurb}
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    score {row.score}
                  </span>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                  {row.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={row.ctaPath}
                    className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    Visit {p.name}
                  </a>
                  <Link
                    href="/compare"
                    className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Full comparison
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>

        {result.notes.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/40">
            <h3 className="font-semibold text-amber-950 dark:text-amber-100">
              Before you join
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-950/90 dark:text-amber-100/90">
              {result.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        )}

        {result.alsoConsider.length > 0 && (
          <div>
            <h3 className="font-semibold">Also consider</h3>
            <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {result.alsoConsider.map((row) => (
                <li key={row.slug}>
                  <a className="underline" href={`/go/${row.slug}?src=quiz`}>
                    {PLATFORM_BY_SLUG[row.slug].name}
                  </a>{" "}
                  (score {row.score})
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setDone(false);
            setStep(0);
            setAnswers({ pets_kids: [], destinations: [] });
          }}
          className="text-sm font-medium text-zinc-600 underline dark:text-zinc-400"
        >
          Retake quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Step {Math.min(step + 1, QUIZ_QUESTIONS.length)} of{" "}
          {QUIZ_QUESTIONS.length}
        </span>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full bg-zinc-900 transition-all dark:bg-zinc-100"
            style={{
              width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {question.prompt}
        </h2>
        {isDestinations && (
          <p className="mt-1 text-sm text-zinc-500">Optional — skip anytime.</p>
        )}
      </div>

      <div className="grid gap-2">
        {question.options.map((opt) => {
          const selected = question.multi
            ? ((answers[question.id] as string[] | undefined) ?? []).includes(
                opt.value,
              )
            : answers[question.id as keyof QuizAnswers] === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                if (question.multi) {
                  toggleMulti(
                    question.id as "pets_kids" | "destinations",
                    opt.value,
                  );
                } else {
                  setSingle(
                    question.id as keyof QuizAnswers,
                    opt.value as never,
                  );
                }
              }}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                selected
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-zinc-700"
        >
          Back
        </button>
        {isDestinations ? (
          <>
            <button
              type="button"
              onClick={skipDestinations}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={() => setDone(true)}
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              See results
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={!canContinue()}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {isLastRequired ? "Continue" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
