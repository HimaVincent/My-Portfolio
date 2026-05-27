import { detectLanguage, shouldTranslate } from "./detector.js";

test("dummy test", () => {
  expect("Hima").toBe("Hima");
});

describe("detectLanguage()", () => {
  test("returns null for empty / whitespace input", () => {
    expect(detectLanguage("")).toBeNull();
    expect(detectLanguage("   ")).toBeNull();
    expect(detectLanguage(null)).toBeNull();
    expect(detectLanguage(undefined)).toBeNull();
  });

  test("detects english for letters/numbers", () => {
    expect(detectLanguage("Hima")).toBe("english");
    expect(detectLanguage("2025")).toBe("english");
    expect(detectLanguage("nology nov 25")).toBe("english");
  });

  test("detects morse for dots/dashes/spaces/slashes only", () => {
    expect(detectLanguage(".... .. -- .-")).toBe("morse");
    expect(detectLanguage("-. --- .-.. --- --. -.--   -. --- ...-   ..--- .....")).toBe("morse");
    expect(detectLanguage("-. --- .-.. --- --. -.-- / -. --- ...- / ..--- .....")).toBe("morse");
  });

  test("detects mixed when letters/numbers appear with dot/dash or slash", () => {
    expect(detectLanguage("HIMA.-")).toBe("mixed");
    expect(detectLanguage("HELLO / ...")).toBe("mixed");
    expect(detectLanguage("123 ...")).toBe("mixed");
    expect(detectLanguage("....ima")).toBe("mixed");
  });

  test("treats random punctuation as english (not morse)", () => {
    expect(detectLanguage("!@#$")).toBe("english");
    expect(detectLanguage("hello!")).toBe("english");
  });
});

describe("shouldTranslate()", () => {
  test("false for empty/whitespace", () => {
    expect(shouldTranslate("")).toBeFalsy();
    expect(shouldTranslate("   ")).toBeFalsy();
    expect(shouldTranslate(null)).toBeFalsy();
    expect(shouldTranslate(undefined)).toBeFalsy();
  });

  test("true for any non-empty trimmed input", () => {
    expect(shouldTranslate("a")).toBeTruthy();
    expect(shouldTranslate("...")).toBeTruthy();
  });
});
