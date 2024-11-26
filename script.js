"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let mainScores, currentScore, activePlayer, stillPlaying;

const init = function () {
  mainScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillPlaying = true; // State variable

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const swtichPlayer = function () {
  // Reset the current score of last player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Switching player part
  activePlayer = activePlayer === 0 ? 1 : 0;

  // If in player0El class has "player--active" class, then remove it. If not, add.
  // Which in this situation, the "player--active" is exist in player0EL.
  // So then, it will remove the "player--active" class from it.

  player0El.classList.toggle("player--active");
  // Here, it checks if in the player1El has "player--active" class or not. If it exists in the player1El class, then remove the "player--active" class. If not, add.
  // Which in this situatuon, the "player--active" does not exist in the player1El.
  // So then, it will add that the "player--active" class to it.
  player1El.classList.toggle("player--active");
};

init();

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1. Generate random dice roll
  if (stillPlaying) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove("hidden");
    console.log(randomDice);
    diceEl.src = `dice-${randomDice}.png`;
    // 3. Check the rolled 1
    if (randomDice !== 1) {
      // Add dice to current score of active player
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Set the current score for active player
    }
    // Switch player
    else {
      swtichPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function () {
  if (stillPlaying) {
    //1. Add current score to the main score of active player
    mainScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      mainScores[activePlayer];
    //2. Check if active player's score is >= 100. If so, finish the game. If not, switch player
    if (mainScores[activePlayer] >= 100) {
      stillPlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("acitve--player");
    } else {
      //3. Switch player
      swtichPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
