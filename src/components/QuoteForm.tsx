"use client";

import { useRef, useState } from "react";

import Check from "./Check";

import Select from "./Select";
import { ArrowRight } from "./icons";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

const projectTypes = [
  "Full connected product",
  "Companion app",
  "Device to cloud",
  "Admin panel",
  "Take over an existing app or backend",
  "Web platform or dashboard",
  "Other",
];

/** Mirrors the API limit, so a big file fails here instead of mid upload. */
const MAX_SPEC_BYTES = 4 * 1024 * 1024;

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink/60 focus:border-accent focus:ring-2 focus:ring-accent/15";

const labelClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [typeMissing, setTypeMissing] = useState(false);
  const typeRef = useRef<HTMLButtonElement | null>(null);
  const [specError, setSpecError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);

    // The project type control is a listbox, not a native select, so the
    // browser cannot validate it for us.
    if (!String(data.projectType ?? "").trim()) {
      setTypeMissing(true);
      typeRef.current?.focus();
      return;
    }
    setTypeMissing(false);

    const spec = form.get("spec");
    if (spec instanceof File && spec.size > MAX_SPEC_BYTES) {
      setSpecError(
        "That file is over 4 MB. Please send a smaller one, or email it to us.",
      );
      return;
    }
    // An empty file input still sends an empty part; drop it.
    if (spec instanceof File && spec.size === 0) form.delete("spec");
    setSpecError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        // Multipart, so a spec sheet can travel with the brief. The browser
        // sets the content type and boundary itself.
        body: form,
      });
      if (!res.ok) throw new Error("Request failed");
      // GA4's recommended lead event; mark it as a key event in GA4 admin.
      trackEvent("generate_lead", {
        form: "project_brief",
        project_type: String(data.projectType),
      });
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

      <div>
        <label className={labelClass} htmlFor="device">
          Your device
        </label>
        <textarea
          id="device"
          name="device"
          rows={3}
          placeholder="What does your device do and how does it connect? For example BLE to a phone, or LoRa to a gateway."
          className={fieldClass + " resize-none"}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="spec">
          Spec sheet{" "}
          <span className="normal-case tracking-normal text-ink/65">
            (optional)
          </span>
        </label>
        <input
          id="spec"
          name="spec"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,application/pdf,image/png,image/jpeg"
          onChange={() => setSpecError(null)}
          className="block w-full text-[13px] text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-[13px] file:font-medium file:text-ink hover:file:bg-black/[0.06]"
        />
        <p className="mt-2 text-[12px] leading-relaxed text-ink/60">
          PDF, image or Word file, up to 4 MB. It goes to the engineer who reads
          your brief, under NDA if you need one.
        </p>
        {specError && (
          <p role="alert" className="mt-2 text-[12px] text-coral">
            {specError}
          </p>
        )}
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
        {status === "sending" ? "Sending…" : "Send to an engineer"}
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
