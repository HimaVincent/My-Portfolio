import { wordslist } from "./wordslist.js";

let currentWord = "";
let guess = [];
const gameMessage = document.querySelector("#game-message");
const wordDisplay = document.querySelector("#game-word");
const keyboard = document.querySelector(".keyboard__frame");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let wrongGuesses = 0;
const maxGuesses = 10;
let timerInterval = null;
let elapsedSeconds = 0;

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordslist.length);
  return wordslist[randomIndex];
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");
  return `${paddedMins}:${paddedSecs}`;
}

function hideStatsOnGameEnd() {
  const elementsToHide = document.querySelectorAll(
    "#game-word, .game-stats__item"
  );
  elementsToHide.forEach((el) => el.classList.add("is-hidden"));
}

function showStatsOnNewGame() {
  const elementsToShow = document.querySelectorAll(
    "#game-word, .game-stats__item"
  );
  elementsToShow.forEach((el) => el.classList.remove("is-hidden"));
}

function updateGameStats() {
  const lengthOfWord = currentWord.length;
  const triesText = `${wrongGuesses}/${maxGuesses}`; 
  const timeText = formatTime(elapsedSeconds);

  const lengthEl = document.querySelector("#stat-length");
  const triesEl = document.querySelector("#stat-tries");
  const timeEl = document.querySelector("#stat-time");

  if (lengthEl) lengthEl.textContent = lengthOfWord;
  if (triesEl) triesEl.textContent = triesText;
  if (timeEl) timeEl.textContent = timeText;
}


function toDisplayWord() {
  const displayWord = currentWord
    .split("")
    .map((letter) => (guess.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = displayWord;
}

function updateHangmanImage() {
  const hangmanStage = document.querySelector(".hangman-stage");
  hangmanStage.innerHTML = "";

  const gameImage = document.createElement("img");
  const imageNumber = String(wrongGuesses).padStart(3, "0");
  gameImage.src = `./assets/${imageNumber}.jpg`;
  gameImage.alt = `Hangman stage ${wrongGuesses}`;

  hangmanStage.appendChild(gameImage);
}

function handleGuess(letter, button) {
  if (guess.includes(letter)) return;

  guess.push(letter);
  button.disabled = true;

  if (!currentWord.includes(letter)) {
    wrongGuesses++;
  }

  updateGameStats();
  toDisplayWord();
  updateHangmanImage();

  const hasWon = !wordDisplay.textContent.includes("_");
  const hasLost = wrongGuesses >= maxGuesses;

  if (hasWon) {
    gameMessage.textContent = "You won! 🎉";
    hideStatsOnGameEnd();
  } else if (hasLost) {
    gameMessage.textContent = `Game over! The word was "${currentWord}".`;
  hideStatsOnGameEnd();
  }
}

document.addEventListener("keydown", (event) => {
  if (
    gameMessage.textContent.includes("You won") ||
    gameMessage.textContent.includes("Game over")
  ) {
    return;
  }
  const letter = event.key.toLowerCase();
  if (!alphabet.includes(letter)) return;
  const matchingButton = [...keyboard.querySelectorAll("button")].find(
    (btn) => btn.textContent === letter
  );
  if (matchingButton && !matchingButton.disabled) {
    handleGuess(letter, matchingButton);
  }
});


function startGame() {
  currentWord = getRandomWord().toLowerCase().trim();
  guess = [];
  wrongGuesses = 0;
  gameMessage.textContent = "";

  if (timerInterval) {
    clearInterval(timerInterval);
  }
  elapsedSeconds = 0;

   if (gameMessage) {
    gameMessage.textContent = "";
  }
  showStatsOnNewGame();

  timerInterval = setInterval(() => {
    elapsedSeconds++;
    updateGameStats(); 
  }, 1000);

  toDisplayWord();
  setupKeyboard();
  updateGameStats();
  updateHangmanImage();
}

function setupKeyboard() {
  keyboard.innerHTML = "";
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("keyboard__key");
    button.addEventListener("click", () => {
      handleGuess(letter, button);
    });
    keyboard.appendChild(button);
  }
}

startGame();
document.querySelector(".keyboard__reset").addEventListener("click", startGame);
