import { describe, expect, it } from "vitest";

import { contactMethod } from "./analytics";

describe("contactMethod", () => {
  it("recognises each contact channel", () => {
    expect(contactMethod("mailto:hello@corefinity.tech")).toBe("email");
    expect(contactMethod("tel:+920000000000")).toBe("phone");
    expect(contactMethod("https://wa.me/920000000000")).toBe("whatsapp");
    expect(contactMethod("https://api.whatsapp.com/send?phone=92")).toBe(
      "whatsapp",
    );
  });

  it("ignores ordinary links", () => {
    expect(contactMethod("/contact")).toBeNull();
    expect(contactMethod("https://corefinity.tech/blog")).toBeNull();
    expect(contactMethod("https://notwa.me.example.com")).toBeNull();
  });
});
