import { englishToMorse, morseToEnglish } from "./translator.js";

describe("englishToMorse()", () => {
  test("returns empty string for empty/whitespace", () => {
    expect(englishToMorse("")).toBe("");
    expect(englishToMorse("   ")).toBe("");
    expect(englishToMorse(null)).toBe("");
    expect(englishToMorse(undefined)).toBe("");
  });

  test("converts single letters and is case-insensitive", () => {
    expect(englishToMorse("a")).toBe(".-");
    expect(englishToMorse("A")).toBe(".-");
  });

  test("converts numbers to morse code", () => {
    expect(englishToMorse("1")).toBe(".----");
    expect(englishToMorse("0")).toBe("-----");
  });

  test("converts words with 1 space between morse letters", () => {
    expect(englishToMorse("HIMA")).toBe(".... .. -- .-");
    expect(englishToMorse("123")).toBe(".---- ..--- ...--");
  });

  test("converts multiple english words into morse words separated by ' / '", () => {
    expect(englishToMorse("Hima is learning to code")).toBe(".... .. -- .- / .. ... / .-.. . .- .-. -. .. -. --. / - --- / -.-. --- -.. .");
  });

  test("collapses multiple spaces/newlines between english words", () => {
    expect(englishToMorse("HIMA     VINCENT")).toBe(".... .. -- .- / ...- .. -. -.-. . -. -");
    expect(englishToMorse("Hima\nVincent")).toBe(".... .. -- .- / ...- .. -. -.-. . -. -");
  });

  test("ignores unsupported characters (keeps valid letters)", () => {
    expect(englishToMorse("!&^%")).toBe("");
    expect(englishToMorse("A!")).toBe(".-");
    expect(englishToMorse("!A!")).toBe(".-");
  });

  test("returns empty string when input contains mixed english and morse characters", () => {
    expect(englishToMorse("HIMA .-")).toBe("");
    expect(englishToMorse("hima25 ...")).toBe("");
    expect(englishToMorse("H I M A ---")).toBe("");
  });
});

describe("morseToEnglish()", () => {
  test("returns empty string for empty/whitespace", () => {
    expect(morseToEnglish("")).toBe("");
    expect(morseToEnglish("   ")).toBe("");
    expect(morseToEnglish(null)).toBe("");
    expect(morseToEnglish(undefined)).toBe("");
  });

  test("converts simple morse to english", () => {
    expect(morseToEnglish(".... .. -- .-")).toBe("HIMA");
  });

  test("treats slash as word separator (with or without spaces around it)", () => {
    expect(morseToEnglish(".... .. -- .- / ...- .. -. -.-. . -. -")).toBe("HIMA VINCENT");
    expect(morseToEnglish(".... .. -- .-/...- .. -. -.-. . -. -")).toBe("HIMA VINCENT");
    expect(morseToEnglish(".... .. -- .-  /  ...- .. -. -.-. . -. -")).toBe("HIMA VINCENT");
  });

  test("treats 3+ spaces as word separator", () => {
    expect(morseToEnglish(".... .. -- .-   ...- .. -. -.-. . -. -")).toBe("HIMA VINCENT");
    expect(morseToEnglish(".... .. -- .-     ...- .. -. -.-. . -. -")).toBe("HIMA VINCENT");
  });

  test("ignores unknown morse sequences", () => {
    expect(morseToEnglish("...... ...")).toBe("S");
  });

  test("returns empty string when input contains mixed morse and english characters", () => {
    expect(morseToEnglish("...A...")).toBe("");
    expect(morseToEnglish(".- HIMA")).toBe("");
    expect(morseToEnglish("... 123")).toBe("");
  });
});
