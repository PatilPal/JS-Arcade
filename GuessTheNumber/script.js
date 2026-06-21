let numberToGuess;
const button = document.getElementById("startGame");
const submitGuess = document.getElementById("submitGuess");
const attemptsDisplay = document.getElementById("attempts");
const messageDisplay = document.getElementById("message");
const restartButton = document.getElementById("restartGame");
let previousGuesses = new Set(); // set
let attempts = 0;
const guessInput = document.getElementById("guessInput");

function generateNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function showStartScreen() {
  button.hidden = false;

  guessInput.hidden = true;
  submitGuess.hidden = true;
  attemptsDisplay.hidden = true;
  restartButton.hidden = true;

  messageDisplay.hidden = false;
  messageDisplay.textContent = "🎮 Let's start the game!";
}

function startGame() {
  numberToGuess = generateNumber();

  attempts = 0;
  previousGuesses.clear();

  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  button.hidden = true;
  guessInput.hidden = false;
  submitGuess.hidden = false;
  attemptsDisplay.hidden = false;

  guessInput.focus();
  messageDisplay.textContent = "Enter a number between 1 and 100";
}

function endGame() {
  guessInput.hidden = true;
  submitGuess.hidden = true;
  attemptsDisplay.hidden = true;

  restartButton.hidden = false;
}

button.addEventListener("click", startGame);

submitGuess.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  if (previousGuesses.has(guess)) {
    messageDisplay.textContent =
      "Try different number, you already guessed this one!";
    guessInput.value = "";
    guessInput.focus();
    return;
  } else if (guess < 1 || guess > 100 || isNaN(guess)) {
    messageDisplay.textContent = "Please enter a number between 1 and 100.";
    guessInput.value = "";
    guessInput.focus();
    return;
  }
  previousGuesses.add(guess);
  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (guess === numberToGuess) {
    messageDisplay.textContent = `🎉Congratulations! You guessed the number ${numberToGuess} in ${attempts} attempts.`;
    endGame();
  } else if (guess < numberToGuess) {
    messageDisplay.textContent = `Number is too Low!.`;
  } else {
    messageDisplay.textContent = `Number is too high!.`;
  }

  guessInput.value = "";
  guessInput.focus();
});

restartButton.addEventListener("click", () => {
  showStartScreen();
  guessInput.value = "";
});

showStartScreen();
