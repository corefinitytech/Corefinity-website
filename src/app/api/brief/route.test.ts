// @vitest-environment node
// The route runs in Node, and multipart parsing needs Node's own FormData and
// File rather than the jsdom versions.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();
vi.mock("nodemailer", () => ({
  default: { createTransport: vi.fn(() => ({ sendMail })) },
}));

import { POST } from "./route";

/** Each test gets a fresh IP so the rate limiter does not leak between them. */
let counter = 0;
function post(body: unknown, ip?: string) {
  counter += 1;
  return POST(
    new Request("http://localhost/api/brief", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": ip ?? `10.0.0.${counter}`,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

const valid = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  projectType: "Web Application",
  overview: "A booking portal for a chain of clinics.",
};

function configureMailbox() {
  process.env.SMTP_HOST = "mail.privateemail.com";
  process.env.SMTP_USER = "hello@corefinity.tech";
  process.env.SMTP_PASS = "test-password";
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  sendMail.mockReset();
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.BRIEF_TO_EMAIL;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("validation", () => {
  it("rejects malformed JSON", async () => {
    const res = await post("{nope");
    expect(res.status).toBe(400);
  });

  it("names the fields that are missing", async () => {
    const res = await post({ name: "Ayesha" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.fields).toEqual(["email", "projectType", "overview"]);
  });

  it("treats whitespace as missing", async () => {
    const res = await post({ ...valid, name: "   " });
    expect(res.status).toBe(400);
    expect((await res.json()).fields).toEqual(["name"]);
  });

  it("rejects an address that is not an email", async () => {
    const res = await post({ ...valid, email: "ayesha.example.com" });
    expect(res.status).toBe(400);
    expect((await res.json()).fields).toEqual(["email"]);
  });

  it("rejects a field past its length limit", async () => {
    const res = await post({ ...valid, overview: "x".repeat(5001) });
    expect(res.status).toBe(400);
    expect((await res.json()).field).toBe("overview");
  });
});

describe("honeypot", () => {
  it("answers ok without sending when the hidden field is filled", async () => {
    configureMailbox();
    const res = await post({ ...valid, company_website: "spam.example" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    // Nothing must reach the mailbox, and the bot must not learn it failed.
    expect(sendMail).not.toHaveBeenCalled();
  });
});

describe("delivery", () => {
  it("returns 503 rather than pretending, when no mailbox is configured", async () => {
    const res = await post(valid);
    expect(res.status).toBe(503);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("mails the brief from the mailbox to itself, replying to the enquirer", async () => {
    configureMailbox();
    sendMail.mockResolvedValue({});

    const res = await post(valid);
    expect(res.status).toBe(200);

    const sent = sendMail.mock.calls[0][0];
    expect(sent.from.address).toBe("hello@corefinity.tech");
    expect(sent.to).toBe("hello@corefinity.tech");
    expect(sent.replyTo.address).toBe(valid.email);
    expect(sent.subject).toContain(valid.projectType);
  });

  it("starts every subject with the prefix inbox rules filter on", async () => {
    configureMailbox();
    sendMail.mockResolvedValue({});
    await post(valid);
    expect(sendMail.mock.calls[0][0].subject).toMatch(/^\[Website Brief\] /);
  });

  it("escapes HTML so a brief cannot inject markup into the email", async () => {
    configureMailbox();
    sendMail.mockResolvedValue({});

    await post({ ...valid, name: '<img src=x onerror="alert(1)">' });
    const sent = sendMail.mock.calls[0][0];
    expect(sent.html).not.toContain("<img");
    expect(sent.html).toContain("&lt;img");
  });

  it("reports a mail server failure instead of claiming success", async () => {
    configureMailbox();
    sendMail.mockRejectedValue(new Error("535 Authentication failed"));
    const res = await post(valid);
    expect(res.status).toBe(502);
  });
});

describe("spec sheet upload", () => {
  let n = 0;
  function postForm(fields: Record<string, string>, file?: File) {
    n += 1;
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.set(k, v);
    if (file) form.set("spec", file);
    return POST(
      new Request("http://localhost/api/brief", {
        method: "POST",
        headers: { "x-forwarded-for": `10.9.0.${n}` },
        body: form,
      }),
    );
  }

  it("attaches a spec sheet and includes the device answer", async () => {
    configureMailbox();
    sendMail.mockResolvedValue({});
    const pdf = new File(["%PDF-1.4 test"], "wristband spec.pdf", {
      type: "application/pdf",
    });
    const res = await postForm({ ...valid, device: "BLE wristband" }, pdf);
    expect(res.status).toBe(200);
    const sent = sendMail.mock.calls[0][0];
    expect(sent.attachments).toHaveLength(1);
    expect(sent.attachments[0].filename).toBe("wristband spec.pdf");
    expect(sent.text).toContain("BLE wristband");
  });

  it("rejects a file over 4 MB", async () => {
    configureMailbox();
    const big = new File([new Uint8Array(4 * 1024 * 1024 + 1)], "big.pdf", {
      type: "application/pdf",
    });
    const res = await postForm(valid, big);
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects a file type that is not a document or image", async () => {
    configureMailbox();
    const exe = new File(["MZ"], "setup.exe", {
      type: "application/x-msdownload",
    });
    const res = await postForm(valid, exe);
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});

describe("rate limiting", () => {
  it("blocks a burst from one address", async () => {
    const ip = "203.0.113.77";
    const codes: number[] = [];
    for (let i = 0; i < 7; i += 1) {
      codes.push((await post(valid, ip)).status);
    }
    expect(codes.filter((c) => c === 429).length).toBeGreaterThan(0);
  });

  it("does not punish a different address", async () => {
    const res = await post(valid, "203.0.113.99");
    expect(res.status).not.toBe(429);
  });
});
