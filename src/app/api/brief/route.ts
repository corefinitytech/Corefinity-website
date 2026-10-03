import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { site } from "@/lib/site";

type Brief = {
  name?: string;
  email?: string;
  projectType?: string;
  overview?: string;
  /** Honeypot. Anything in here means a bot filled the form. */
  company_website?: string;
};

/** Every brief's subject starts with this, so an inbox rule can file them. */
const BRIEF_SUBJECT_PREFIX = "[Website Brief]";

const LIMITS = { name: 120, email: 200, projectType: 80, overview: 5000 };

/**
 * Rate limit, per IP, in memory.
 *
 * This resets whenever the serverless instance recycles and is not shared
 * between regions, so it is a speed bump rather than a guarantee. It is enough
 * to stop a script hammering the endpoint. Move to Upstash or Vercel KV if the
 * form ever attracts real abuse.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // Crude guard against unbounded growth.
  return recent.length > MAX_PER_WINDOW;
}

// Deliberately permissive. Bouncing a valid address is worse than accepting a
// bad one, which we find out about the moment we try to reply.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: Brief;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill every field they can see, including the one nobody can see.
  // Answer as though it worked so they have nothing to tune against.
  if (body.company_website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  // Budget is deliberately not collected; it gets scoped after requirements.
  const required = ["name", "email", "projectType", "overview"] as const;
  const missing = required.filter((k) => !body[k]?.toString().trim());
  if (missing.length) {
    return NextResponse.json(
      { error: "Missing fields", fields: missing },
      { status: 400 },
    );
  }

  const fields = Object.fromEntries(
    required.map((k) => [k, body[k]!.toString().trim()]),
  ) as Record<(typeof required)[number], string>;

  const oversized = required.find((k) => fields[k].length > LIMITS[k]);
  if (oversized) {
    return NextResponse.json(
      { error: "Field too long", field: oversized },
      { status: 400 },
    );
  }

  if (!EMAIL.test(fields.email)) {
    return NextResponse.json(
      { error: "Invalid email", fields: ["email"] },
      { status: 400 },
    );
  }

  // Sent through the company's own Private Email mailbox: the site signs in
  // as that mailbox and mails the brief to it, so briefs land in the normal
  // inbox, signed with the domain's DKIM key, with no third party involved.
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const to = process.env.BRIEF_TO_EMAIL ?? user ?? site.email;

  // Without a mailbox configured there is nowhere to send this. Say so rather
  // than returning ok and dropping a real lead on the floor.
  if (!host || !user || !pass) {
    console.error(
      "[project-brief] No mailbox configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.",
      { from: fields.email, projectType: fields.projectType },
    );
    return NextResponse.json(
      { error: "Delivery is not configured" },
      { status: 503 },
    );
  }

  const html = `
    <h2>New project brief</h2>
    <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(fields.projectType)}</p>
    <p><strong>Overview:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(fields.overview)}</p>
  `;

  const text = [
    "New project brief",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Project type: ${fields.projectType}`,
    "",
    fields.overview,
  ].join("\n");

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 starts plain and upgrades with STARTTLS.
      secure: port === 465,
      auth: { user, pass },
      // Fail fast rather than holding the serverless function open.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transport.sendMail({
      from: { name: `${site.name} Website`, address: user },
      to,
      replyTo: { name: fields.name, address: fields.email },
      // The fixed prefix is what inbox filter rules match on.
      subject: `${BRIEF_SUBJECT_PREFIX} ${fields.projectType}, ${fields.name}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[project-brief] Send failed", err);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
