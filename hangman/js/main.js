import { wordslist } from "./wordslist.js";
import { HangmanGame, getRandomWord } from "./gameLogic.js";
import { GameTimer } from "./timer.js";
import { DOMController } from "./domController.js";

const game = new HangmanGame();
const timer = new GameTimer();
const dom = new DOMController();

function updateDisplay() {
  const state = game.getGameState();

  dom.renderWord(state.displayWord);
  dom.renderStats({
    wordLength: state.wordLength,
    wrongGuesses: state.wrongGuesses,
    maxGuesses: state.maxGuesses,
    formattedTime: timer.getFormattedTime(),
  });
  dom.renderHangmanImage(state.wrongGuesses);
}

function handleGuess(letter, button) {
  const wasProcessed = game.makeGuess(letter);

  if (!wasProcessed) return;

  button.disabled = true;
  updateDisplay();

  const state = game.getGameState();

  if (state.isWon) {
    timer.stop();
    dom.showWinMessage(state.currentWord);
    dom.hideWord();
    dom.disableAllKeys();
  } else if (state.isLost) {
    timer.stop();
    dom.showLoseMessage(state.currentWord);
    dom.hideWord();
    dom.disableAllKeys();
  }
}

function startGame() {
  const randomWord = getRandomWord(wordslist);
  game.startNewGame(randomWord);

  timer.start(() => {
    updateDisplay();
  });

  dom.clearMessage();
  dom.showStats();
  dom.renderKeyboard([], handleGuess);
  updateDisplay();
}

document.addEventListener("keydown", (event) => {
  if (dom.isGameOver()) {
    return;
  }

  const letter = event.key.toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  if (!alphabet.includes(letter)) return;

  const matchingButton = dom.getKeyboardButtons().find((btn) => btn.textContent === letter);

  if (matchingButton && !matchingButton.disabled) {
    handleGuess(letter, matchingButton);
  }
});

startGame();

document.querySelector(".keyboard__reset").addEventListener("click", startGame);
