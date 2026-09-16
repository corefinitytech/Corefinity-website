"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import Check from "./Check";

import Select from "./Select";

const projectTypes = [
  "Custom B2B Dashboard",
  "Direct Booking Engine",
  "Web Application",
  "UI/UX Design System",
  "Other",
];

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-accent focus:ring-2 focus:ring-accent/15";

const labelClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
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

  if (status === "sent") {
    return (
      <div className="grid place-items-center rounded-3xl border border-black/[0.08] bg-white p-10 text-center">
        <div>
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-accent text-white">
            <Check className="size-5" />
          </span>
          <p className="mt-5 text-lg font-medium text-ink">Brief received.</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
            We&apos;ll review your requirements and come back with a
            fixed-scope technical roadmap within 48 hours.
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
      className="grid content-start gap-4 rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7"
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
      />

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
        <p className="mt-2 text-[12px] leading-relaxed text-ink/40">
          Picked &ldquo;Other&rdquo;? Describe it here. Budget is something we
          scope together once the requirements are clear.
        </p>
      </div>

      {status === "error" && (
        <p className="text-sm text-coral">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-[13px] font-medium text-white transition hover:bg-ink/85 disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === "sending" ? "Sending…" : "Send Project Brief"}
        <FontAwesomeIcon
          icon={faArrowRightLong}
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
