export function detectLanguage(input) {
  if (!input || !input.trim()) return null;

  const morseOnlyPattern = /^[.\-\s\/]+$/;
  const hasDotOrDash = /[.\-]/.test(input);
  const hasLettersOrNumbers = /[A-Za-z0-9]/.test(input);
  const hasSlash = /\//.test(input);

  if (hasLettersOrNumbers && (hasDotOrDash || hasSlash)) {
    return "mixed";
  }

  if (morseOnlyPattern.test(input) && hasDotOrDash) {
    return "morse";
  }

  return "english";
}

export function shouldTranslate(input) {
  return input && input.trim().length > 0;
}
