import { describe, expect, it } from "vitest";
import { fadeUp, blurReveal, getMotionVariants, hoverLift, getHoverVariants } from "./motion";

describe("getMotionVariants", () => {
  it("returns the full variant unchanged when reduced motion is off", () => {
    const result = getMotionVariants(false, fadeUp);
    expect(result).toBe(fadeUp);
  });

  it("returns a simple opacity-only variant when reduced motion is on", () => {
    const result = getMotionVariants(true, blurReveal);
    expect(result.hidden).toEqual({ opacity: 0 });
    expect(result.visible).toMatchObject({ opacity: 1 });
    // must not carry over translation or blur from the full variant
    expect(result.visible).not.toHaveProperty("y");
    expect(result.visible).not.toHaveProperty("filter");
  });

  it("reduced variant is identical regardless of which full variant was passed", () => {
    const fromFadeUp = getMotionVariants(true, fadeUp);
    const fromBlurReveal = getMotionVariants(true, blurReveal);
    expect(fromFadeUp).toEqual(fromBlurReveal);
  });
});

describe("getHoverVariants", () => {
  it("returns the full hover variant unchanged when reduced motion is off", () => {
    const result = getHoverVariants(false, hoverLift);
    expect(result).toBe(hoverLift);
  });

  it("returns a translation-free hover variant when reduced motion is on", () => {
    const result = getHoverVariants(true, hoverLift);
    // must not carry over the y translation from the full variant
    expect(result.rest).not.toHaveProperty("y");
    expect(result.hover).not.toHaveProperty("y");
    // still reflects a change on hover via boxShadow
    expect(result.rest.boxShadow).not.toEqual(result.hover.boxShadow);
  });
});
