"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import Select from "./Select";

const projectTypes = [
  "Custom B2B Dashboard",
  "Direct Booking Engine",
  "Web Application",
  "UI/UX Design System",
];

const budgetTiers = ["$3k – $5k", "$5k – $10k", "$10k+"];

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-accent focus:ring-2 focus:ring-accent/15";

const labelClass =
  "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45";

type Status = "idle" | "sending" | "sent" | "error";

export default function ProjectBrief() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Ready to build software that{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                scales your business?
              </span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60">
              Tell us about your project, your timeline, and your goals.
              We&apos;ll map out a clear technical blueprint and timeline.
            </p>
          </div>

          {status === "sent" ? (
            <div className="grid place-items-center rounded-3xl border border-black/[0.08] bg-white p-10 text-center">
              <div>
                <p className="text-lg font-medium text-ink">Brief received.</p>
                <p className="mt-2 max-w-sm text-sm text-ink/60">
                  We&apos;ll review your requirements and come back with a
                  fixed-scope technical roadmap within 48 hours.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid gap-5 rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="What is your name?"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  name="projectType"
                  label="Project Type"
                  placeholder="Select a project type"
                  options={projectTypes}
                  required
                />
                <Select
                  name="budget"
                  label="Budget Tier"
                  placeholder="Select a budget tier"
                  options={budgetTiers}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="overview">
                  Project Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  rows={5}
                  required
                  placeholder="Tell us briefly about what you are building..."
                  className={fieldClass + " resize-none"}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-coral">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[13px] font-medium text-white transition hover:bg-ink/85 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Project Brief"}
                <FontAwesomeIcon icon={faArrowRightLong} className="size-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
