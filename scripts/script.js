'use strict';

// selecting elements
// creating selecting elements
const btnNew = document.getElementById(`btn--new`);
const btnRoll = document.getElementById(`btn--roll`);
const btnHold = document.getElementById(`btn--hold`);

const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);

const currentScore0El = document.getElementById(`current--0`);
const currentScore1El = document.getElementById(`current--1`);
const diceEl = document.getElementById(`dice`);

const player0El = document.getElementById(`player--0`);
const player1El = document.getElementById(`player--1`);

// global variables
let scores, currentScore, activePlayer, dice, totalScore;

// function
scores = [0, 0];
currentScore = 0;
activePlayer = 0;
dice = 0;
totalScore = 0;
score0El.innerText = 0;
score1El.innerText = 0;
currentScore0El.innerText = 0;
currentScore1El.innerText = 0;
diceEl.classList.add(`hidden`);

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  dice = 0;
  totalScore = 0;
  score0El.innerText = 0;
  score1El.innerText = 0;
  currentScore0El.innerText = 0;
  currentScore1El.innerText = 0;
  diceEl.classList.add(`hidden`);
}

// creating random dice

function getRandomNumber() {
  return Math.floor(Math.random() * 6 + 1);
}
// switchPlayer function
function switchPlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  document.getElementById(`score--${activePlayer}`).innerText =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;

  // change the active player number
  activePlayer = activePlayer === 0 ? 1 : 0;

  scores[activePlayer] = scores[activePlayer] + currentScore;
}

// event listners
// btn roll function

btnRoll.addEventListener('click', function () {
  // get random dice

  dice = getRandomNumber();
  // console.log(dice);

  // display the current score

  currentScore = currentScore + dice;
  // console.log(currentScore);

  // display dice
  diceEl.classList.remove(`hidden`);
  diceEl.src = `./images/dice-${dice}.png`;
  // check the dice===1
  if (dice !== 1) {
    document.getElementById(`current--${activePlayer}`).innerText =
      currentScore;
  } else {
    // switch player
    switchPlayer();
  }
});
// btn hold function

btnHold.addEventListener('click', function () {
  // adding current score to total score
  scores[activePlayer] = scores[activePlayer] + currentScore;

  // ḍisplay the current score
  document.getElementById(`score--${activePlayer}`).innerText =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;

  // if player win
  if (scores[activePlayer] >= 20) {
    // player win
    document
      .getElementById(`player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .getElementById(`player--${activePlayer}`)
      .classList.add('player--winner');
    // button hidden

    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
  } else {
    // continue game
    // switch player
    switchPlayer();
  }
});

// btn new game

btnNew.addEventListener('click', function () {
  // making scores 0
  score0El.innerText = 0;
  score1El.innerText = 0;
  currentScore0El.innerText = 0;
  currentScore1El.innerText = 0;

  // displaying button
  diceEl.classList.add(`hidden`);
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  // removing classes
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //   init function
  init();
});
