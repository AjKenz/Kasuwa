import { describe, expect, it } from "vitest";
import { formatMoney } from "./utils";

describe("formatMoney", () => {
  it("formats NGN minor units as whole naira", () => {
    expect(formatMoney(1_850_000, "NGN")).toBe("₦18,500");
  });

  it("formats USD minor units as whole dollars", () => {
    expect(formatMoney(950_000, "USD", "en-US")).toBe("$9,500");
  });

  it("rounds to the nearest whole unit", () => {
    expect(formatMoney(199, "USD", "en-US")).toBe("$2");
  });
});
