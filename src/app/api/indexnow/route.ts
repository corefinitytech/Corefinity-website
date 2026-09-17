import { NextResponse } from "next/server";

import { siteUrl, verification } from "@/lib/site";

/**
 * IndexNow ping.
 *
 * Tells Bing and Yandex that pages changed, instead of waiting for them to
 * crawl on their own schedule. Bing matters here beyond its own search share,
 * because its index is what ChatGPT browsing and Copilot retrieve from.
 *
 * Call it after a deploy:
 *   curl -X POST https://corefinity.tech/api/indexnow \
 *        -H "content-type: application/json" \
 *        -d '{"secret":"...","urls":["/","/contact"]}'
 */
const ENDPOINT = "https://api.indexnow.org/IndexNow";

export async function POST(request: Request) {
  const key = verification.indexNowKey;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY is not set" },
      { status: 503 },
    );
  }

  let body: { secret?: string; urls?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // The key doubles as the shared secret, so a stranger cannot make this
  // endpoint submit arbitrary URLs on our behalf.
  if (body.secret !== key) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const host = new URL(siteUrl).host;
  const urlList = (body.urls?.length ? body.urls : ["/"]).map((u) =>
    u.startsWith("http") ? u : `${siteUrl}${u.startsWith("/") ? u : `/${u}`}`,
  );

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${siteUrl}/indexnow-key.txt`,
      urlList,
    }),
  });

  return NextResponse.json(
    { submitted: urlList.length, status: res.status },
    { status: res.ok ? 200 : 502 },
  );
}
