export function getRandomWord(wordList) {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

export class HangmanGame {
  constructor() {
    this.currentWord = "";
    this.guessedLetters = [];
    this.wrongGuesses = 0;
    this.maxGuesses = 10;
  }

  startNewGame(word) {
    this.currentWord = word.toLowerCase().trim();
    this.guessedLetters = [];
    this.wrongGuesses = 0;
  }

  makeGuess(letter) {
    if (this.guessedLetters.includes(letter)) {
      return false; // Already guessed
    }

    this.guessedLetters.push(letter);

    if (!this.currentWord.includes(letter)) {
      this.wrongGuesses++;
    }

    return true; // Guess was processed
  }

  isGameWon() {
    return this.currentWord
      .split("")
      .every((letter) => this.guessedLetters.includes(letter));
  }

  isGameLost() {
    return this.wrongGuesses >= this.maxGuesses;
  }

  getDisplayWord() {
    return this.currentWord
      .split("")
      .map((letter) => (this.guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  }

  getGameState() {
    return {
      currentWord: this.currentWord,
      guessedLetters: [...this.guessedLetters],
      wrongGuesses: this.wrongGuesses,
      maxGuesses: this.maxGuesses,
      wordLength: this.currentWord.length,
      displayWord: this.getDisplayWord(),
      isWon: this.isGameWon(),
      isLost: this.isGameLost(),
    };
  }
}
