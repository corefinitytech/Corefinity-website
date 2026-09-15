import { NextResponse } from "next/server";

type Brief = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  overview?: string;
};

export async function POST(request: Request) {
  let body: Brief;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required: (keyof Brief)[] = [
    "name",
    "email",
    "projectType",
    "budget",
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
