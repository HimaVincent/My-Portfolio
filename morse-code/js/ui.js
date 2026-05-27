let elements = {};

export function initUI(domElements) {
  elements = domElements;
}

export function updateOutput(text) {
  if (elements.outputText) {
    elements.outputText.value = text;
  }
}

export function updateDetectorBadge(language) {
  if (!elements.detectorBadge) return;

  elements.detectorBadge.classList.remove("translator__detector-badge--english");
  elements.detectorBadge.classList.remove("translator__detector-badge--morse");
  elements.detectorBadge.classList.remove("translator__detector-badge--mixed");

  if (language === "english") {
    elements.detectorBadge.textContent = "Detected: English";
    elements.detectorBadge.classList.add("translator__detector-badge--english");
  } else if (language === "morse") {
    elements.detectorBadge.textContent = "Detected: Morse Code";
    elements.detectorBadge.classList.add("translator__detector-badge--morse");
  } else if (language === "mixed") {
    elements.detectorBadge.textContent = "Detected: Multiple languages. Please fix to continue";
    elements.detectorBadge.classList.add("translator__detector-badge--mixed");
  } else {
    elements.detectorBadge.textContent = "Ready to translate";
  }
}

export function clearInput() {
  if (elements.inputText) {
    elements.inputText.value = "";
  }
  if (elements.outputText) {
    elements.outputText.value = "";
  }
  updateDetectorBadge(null);
}

export function updateTextareaFontSize(inputLanguage) {
  const input = elements.inputText;
  const output = elements.outputText;

  if (!input || !output) return;

  input.classList.remove("translator__textarea--english", "translator__textarea--morse");
  output.classList.remove("translator__textarea--english", "translator__textarea--morse");

  if (inputLanguage === "morse") {
    input.classList.add("translator__textarea--morse");
  } else {
    input.classList.add("translator__textarea--english");
  }

  if (inputLanguage === "english") {
    output.classList.add("translator__textarea--morse");
  } else if (inputLanguage === "morse") {
    output.classList.add("translator__textarea--english");
  } else {
    output.classList.add("translator__textarea--english");
  }
}

export function updateInputHint(inputValue, language) {
  if (!elements.inputHint) return;

  if (language !== "morse") {
    elements.inputHint.hidden = true;
    return;
  }

  const value = inputValue.trim();

  const symbolCount = value.replace(/[\s\/]/g, "").length;

  const hasLetterSpace = value.includes(" ");
  const hasWordSlash = value.includes("/");
  const hasTripleSpace = value.includes("   ");

  const isLikelyWrong = symbolCount >= 6 && !hasLetterSpace && !hasWordSlash && !hasTripleSpace;

  elements.inputHint.hidden = !isLikelyWrong;
}
