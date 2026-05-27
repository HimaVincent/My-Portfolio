import { englishToMorse, morseToEnglish } from "./translator.js";
import { detectLanguage, shouldTranslate } from "./detector.js";
import * as ui from "./ui.js";

const elements = {
  inputText: null,
  outputText: null,
  detectorBadge: null,
  clearBtn: null,
  infoContent: null,
  inputHint: null,
};

let debounceTimer = null;
const DEBOUNCE_DELAY = 300;

function init() {
  elements.inputText = document.getElementById("input-text");
  elements.outputText = document.getElementById("output-text");
  elements.detectorBadge = document.getElementById("detector-badge");
  elements.clearBtn = document.getElementById("clear-btn");
  elements.infoContent = document.getElementById("info-content");
  elements.inputHint = document.getElementById("input-hint");

  ui.initUI(elements);

  if (elements.inputText) {
    elements.inputText.addEventListener("input", handleInput);
  }

  if (elements.clearBtn) {
    elements.clearBtn.addEventListener("click", handleClearButton);
  }
}

function handleInput(event) {
  const inputValue = event.target.value;

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    processInput(inputValue);
  }, DEBOUNCE_DELAY);
}

function processInput(inputValue) {
  if (!shouldTranslate(inputValue)) {
    ui.updateOutput("");
    ui.updateDetectorBadge(null);
    ui.updateTextareaFontSize(null);
    ui.updateInputHint("", null);
    return;
  }

  const language = detectLanguage(inputValue);
  ui.updateTextareaFontSize(language);
  ui.updateDetectorBadge(language);
  ui.updateInputHint(inputValue, language);

  if (language === "mixed") {
    ui.updateOutput("");
    return;
  }

  let translatedText = "";

  if (language === "english") {
    translatedText = englishToMorse(inputValue);
  } else if (language === "morse") {
    translatedText = morseToEnglish(inputValue);
  }

  ui.updateOutput(translatedText);
}

function handleClearButton() {
  ui.clearInput();

  if (elements.inputText) {
    elements.inputText.focus();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
