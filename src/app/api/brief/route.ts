import { NextResponse } from "next/server";

type Brief = {
  name?: string;
  email?: string;
  projectType?: string;
  overview?: string;
};

export async function POST(request: Request) {
  let body: Brief;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Budget is deliberately not collected; it gets scoped after requirements.
  const required: (keyof Brief)[] = [
    "name",
    "email",
    "projectType",
    "overview",
  ];
  const missing = required.filter((k) => !body[k]?.toString().trim());
  if (missing.length) {
    return NextResponse.json(
      { error: "Missing fields", fields: missing },
      { status: 400 },
    );
  }

  // TODO: forward to email provider / CRM (Resend, Postmark, HubSpot…).
  console.log("[project-brief]", body);

  return NextResponse.json({ ok: true });
}
