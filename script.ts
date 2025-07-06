"use strict";

type Player = 0 | 1;
type GameState = {
  mainScores: number[];
  currentScore: number;
  activePlayer: Player;
  stillPlaying: boolean;
};

// Selecting elements with type assertions
const player0El = document.querySelector(".player--0") as HTMLElement;
const player1El = document.querySelector(".player--1") as HTMLElement;
const score0El = document.querySelector("#score--0") as HTMLElement;
const score1El = document.getElementById("score--1") as HTMLElement;
const currentScore0El = document.getElementById("current--0") as HTMLElement;
const currentScore1El = document.getElementById("current--1") as HTMLElement;
const diceEl = document.querySelector(".dice") as HTMLImageElement;
const btnNew = document.querySelector(".btn--new") as HTMLButtonElement;
const btnRoll = document.querySelector(".btn--roll") as HTMLButtonElement;
const btnHold = document.querySelector(".btn--hold") as HTMLButtonElement;

// Game state variables with explicit types
let mainScores: number[];
let currentScore: number;
let activePlayer: Player;
let stillPlaying: boolean;

// Initialize game function with return type annotation
const init = (): void => {
  mainScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillPlaying = true;

  score0El.textContent = "0";
  score1El.textContent = "0";
  currentScore0El.textContent = "0";
  currentScore1El.textContent = "0";

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Switch player function with return type annotation
const switchPlayer = (): void => {
  // Reset the current score of last player
  const currentPlayerEl = document.getElementById(
    `current--${activePlayer}`
  ) as HTMLElement;
  currentPlayerEl.textContent = "0";
  currentScore = 0;

  // Switching player part
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle active player classes
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Generate random dice roll function with return type
const generateDiceRoll = (): number => {
  return Math.trunc(Math.random() * 6) + 1;
};

// Update current score display function
const updateCurrentScore = (playerId: Player, score: number): void => {
  const currentEl = document.getElementById(
    `current--${playerId}`
  ) as HTMLElement;
  currentEl.textContent = score.toString();
};

// Update main score display function
const updateMainScore = (playerId: Player, score: number): void => {
  const scoreEl = document.getElementById(`score--${playerId}`) as HTMLElement;
  scoreEl.textContent = score.toString();
};

// End game function
const endGame = (winnerId: Player): void => {
  stillPlaying = false;
  diceEl.classList.add("hidden");

  const winnerEl = document.querySelector(
    `.player--${winnerId}`
  ) as HTMLElement;
  winnerEl.classList.add("player--winner");
  winnerEl.classList.remove("player--active");
};

// Initialize the game
init();

// Rolling dice functionality
btnRoll.addEventListener("click", (): void => {
  if (!stillPlaying) return;

  // 1. Generate random dice roll
  const randomDice: number = generateDiceRoll();

  // 2. Display the dice
  diceEl.classList.remove("hidden");
  console.log(randomDice);
  diceEl.src = `dice-${randomDice}.png`;

  // 3. Check if rolled 1
  if (randomDice !== 1) {
    // Add dice to current score of active player
    currentScore += randomDice;
    updateCurrentScore(activePlayer, currentScore);
  } else {
    // Switch player if rolled 1
    switchPlayer();
  }
});

// Hold functionality
btnHold.addEventListener("click", (): void => {
  if (!stillPlaying) return;

  // 1. Add current score to the main score of active player
  mainScores[activePlayer] += currentScore;
  updateMainScore(activePlayer, mainScores[activePlayer]);

  // 2. Check if active player's score is >= 100
  if (mainScores[activePlayer] >= 100) {
    endGame(activePlayer);
  } else {
    // 3. Switch player
    switchPlayer();
  }
});

// New game functionality
btnNew.addEventListener("click", init);
