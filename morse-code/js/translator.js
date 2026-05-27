const MORSE_CODE_MAP = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
};

const ENGLISH_MAP = Object.fromEntries(Object.entries(MORSE_CODE_MAP).map(([letter, morse]) => [morse, letter]));
const isMixedInput = (text) => /[A-Za-z0-9]/.test(text) && /[.\-\/]/.test(text);

export function englishToMorse(text) {
  if (!text || !text.trim()) return "";
  if (isMixedInput(text)) return "";
  const words = text.trim().toUpperCase().split(/\s+/);
  const morseWords = words
    .map((word) => {
      const morseChars = word
        .split("")
        .map((char) => MORSE_CODE_MAP[char] || "")
        .filter((morse) => morse !== "");
      return morseChars.join(" ");
    })
    .filter((word) => word !== "");

  return morseWords.join(" / ");
}

export function morseToEnglish(morse) {
  if (!morse || !morse.trim()) return "";
  if (isMixedInput(morse)) return "";
  const normalized = morse.trim().replace(/\s*\/\s*/g, "   ");
  const morseWords = normalized.split(/\s{2,}/);
  const englishWords = morseWords
    .map((morseWord) => {
      const morseChars = morseWord.trim().split(/\s+/);
      const englishChars = morseChars.map((morseChar) => ENGLISH_MAP[morseChar] || "").filter((char) => char !== "");
      return englishChars.join("");
    })
    .filter((word) => word !== "");

  return englishWords.join(" ");
}
