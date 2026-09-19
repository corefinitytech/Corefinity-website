"use client";

import { useRef, useState } from "react";

import Check from "./Check";

import Select from "./Select";
import { ArrowRight } from "./icons";
import { site } from "@/lib/site";

const projectTypes = [
  "Custom B2B Dashboard",
  "Direct Booking Engine",
  "Web Application",
  "UI/UX Design System",
  "Other",
];

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink/60 focus:border-accent focus:ring-2 focus:ring-accent/15";

const labelClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [typeMissing, setTypeMissing] = useState(false);
  const typeRef = useRef<HTMLButtonElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // The project type control is a listbox, not a native select, so the
    // browser cannot validate it for us.
    if (!String(data.projectType ?? "").trim()) {
      setTypeMissing(true);
      typeRef.current?.focus();
      return;
    }
    setTypeMissing(false);
    setStatus("sending");
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

  if (status === "sent") {
    return (
      <div className="grid place-items-center rounded-3xl border border-black/[0.08] bg-white p-10 text-center">
        <div>
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-accent text-white">
            <Check className="size-5" />
          </span>
          <p className="mt-5 text-lg font-medium text-ink">Brief received.</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
            We will read your brief and come back with a fixed scope technical
            roadmap within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      /* content-start stops the grid stretching its rows when the column
         beside it runs taller, which is what opened the gaps between fields. */
      noValidate={false}
      className="relative grid content-start gap-4 rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
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

      <Select
        name="projectType"
        label="Project Type"
        placeholder="Select a project type"
        options={projectTypes}
        required
        invalid={typeMissing}
        buttonRef={typeRef}
      />

      {/* Honeypot. Real people never see it, bots fill everything they find. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="overview">
          Project Overview
        </label>
        <textarea
          id="overview"
          name="overview"
          rows={4}
          required
          placeholder="What are you building, who is it for, and when do you need it live?"
          className={fieldClass + " resize-none"}
        />
        <p className="mt-2 text-[12px] leading-relaxed text-ink/60">
          Picked &ldquo;Other&rdquo;? Describe it here. We scope budget together
          once the requirements are clear.
        </p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-coral">
          Something went wrong. Please try again, or email us directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-[13px] font-medium text-white transition hover:bg-ink/85 disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === "sending" ? "Sending…" : "Send Project Brief"}
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
