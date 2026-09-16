import { verification } from "@/lib/site";

/**
 * IndexNow verifies domain ownership by fetching the key as plain text from
 * the host. The spec lets the ping declare where that file lives, so this sits
 * at a fixed path and the key stays in the environment rather than being
 * committed as a file in public/.
 */
export async function GET() {
  const key = verification.indexNowKey;
  if (!key) return new Response("Not found", { status: 404 });

  return new Response(key, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
