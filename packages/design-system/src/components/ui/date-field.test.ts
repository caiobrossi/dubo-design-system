import { describe, expect, it } from "vitest";

import { dateFieldHelpers } from "@dubo/design-system-shared/components/ui/date-field";

describe("date field year input", () => {
  it("does not clamp a future year needed by expiry-date fields", () => {
    expect(dateFieldHelpers.formatDateInput("31122027", "dd/MM/yyyy")).toBe("31/12/2027");
  });

  it("does not rewrite birth years before 1940", () => {
    expect(dateFieldHelpers.formatDateInput("14021935", "dd/MM/yyyy")).toBe("14/02/1935");
  });
});
