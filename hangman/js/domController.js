export class DOMController {
  constructor() {
    this.gameMessage = document.querySelector("#game-message");
    this.wordDisplay = document.querySelector("#game-word");
    this.keyboard = document.querySelector(".keyboard__frame");
    this.hangmanStage = document.querySelector(".hangman-stage");
    this.statLength = document.querySelector("#stat-length");
    this.statTries = document.querySelector("#stat-tries");
    this.statTime = document.querySelector("#stat-time");
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  renderWord(displayWord) {
    this.wordDisplay.textContent = displayWord;
  }

  renderStats(stats) {
    const { wordLength, wrongGuesses, maxGuesses, formattedTime } = stats;

    if (this.statLength) this.statLength.textContent = wordLength;
    if (this.statTries) this.statTries.textContent = `${wrongGuesses}/${maxGuesses}`;
    if (this.statTime) this.statTime.textContent = formattedTime;
  }

  renderHangmanImage(wrongGuesses) {
    this.hangmanStage.innerHTML = "";

    const gameImage = document.createElement("img");
    const imageNumber = String(wrongGuesses).padStart(3, "0");
    gameImage.src = `./assets/${imageNumber}.jpg`;
    gameImage.alt = `Hangman stage ${wrongGuesses}`;

    this.hangmanStage.appendChild(gameImage);
  }

  renderKeyboard(guessedLetters, onGuessCallback) {
    this.keyboard.innerHTML = "";

    for (let letter of this.alphabet) {
      const button = document.createElement("button");
      button.textContent = letter;
      button.classList.add("keyboard__key");

      if (guessedLetters.includes(letter)) {
        button.disabled = true;
      }

      button.addEventListener("click", () => {
        if (onGuessCallback) {
          onGuessCallback(letter, button);
        }
      });

      this.keyboard.appendChild(button);
    }
  }

  showWinMessage(word) {
    this.gameMessage.textContent = `You won! 🎉 The word was: "${word}"`;
    this.gameMessage.classList.remove("is-hidden");
  }

  showLoseMessage(word) {
    this.gameMessage.textContent = `Game over! The word was "${word}".`;
    this.gameMessage.classList.remove("is-hidden");
  }

  hideWord() {
    const wordElement = document.querySelector("#game-word");
    if (wordElement) wordElement.classList.add("is-hidden");
  }

  showStats() {
    const elementsToShow = document.querySelectorAll("#game-word, .game-stats__item");
    elementsToShow.forEach((el) => el.classList.remove("is-hidden"));
  }

  disableAllKeys() {
    const buttons = this.getKeyboardButtons();
    buttons.forEach((btn) => {
      btn.disabled = true;
    });
  }

  clearMessage() {
    this.gameMessage.textContent = "";
    this.gameMessage.classList.add("is-hidden");
  }

  isGameOver() {
    return this.gameMessage.textContent.includes("You won") ||
           this.gameMessage.textContent.includes("Game over");
  }

  getKeyboardButtons() {
    return [...this.keyboard.querySelectorAll("button")];
  }
}
