// Arrays to store the game sequence and user's input sequence
let gameSeq = [];
let userSeq = [];

// Array containing the button colors used in the game
let btns = ["red", "yellow", "green", "blue"];

// Flags and counters to track game status
let started = false; // Indicates whether the game has started
let level = 0; // Tracks the current level

// Reference to the level display element
let h2 = document.querySelector("h2");

// Sound effects
let btnsSound = document.querySelector(".btnSound"); // Button press sound
let btnSound = function () {
  btnsSound.play();
};

let startSound = document.querySelector(".startSound"); // start sound
let startSoundPlay = function () {
  startSound.play();
};

let endSound = document.querySelector(".endSound"); // Game over sound
let gameOverSound = function () {
  endSound.play();
};

// Event listener to start the game on any key press
document.addEventListener("keydown", function () {
  if (started === false) {
    console.log("game is started");
    started = true;
    startSoundPlay();
    levelUp(); // Move to the first level
  }
});

// Function to flash the button during the game sequence
function gameFlash(btn) {
  btn.classList.add("flash"); // Add flash effect
  setTimeout(function () {
    btn.classList.remove("flash"); // Remove flash effect after a short delay
  }, 200);
}

// Function to flash the button when the user presses it
function userFlash(btn) {
  btn.classList.add("userFlash"); // Add user flash effect
  setTimeout(function () {
    btn.classList.remove("userFlash"); // Remove effect after a short delay
    btnSound(); // Play button sound on user press
  }, 200);
}

// Function to advance the game to the next level
function levelUp() {
  userSeq = []; // Clear user input for the new level
  level++; // Increment the level
  h2.innerText = `Level ${level}`; // Update level display

  // Generate a random button for the sequence
  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor); // Add the color to the game sequence
  console.log(gameSeq); // Debug: Log the sequence
  gameFlash(randBtn); // Flash the button
}

// Function to check the user's input against the game sequence
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      // If the user has completed the sequence, move to the next level
      setTimeout(levelUp, 1000);
    }
  } else {
    // If the user input is incorrect, end the game
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to Restart`;
    document.querySelector("body").style.background = "red"; // Change background to red
    gameOverSound(); // Play game over sound
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white"; // Reset background color
    }, 800);
    reset(); // Reset the game
  }
}

// Function to handle button press by the user
function btnPress() {
  let btn = this; // Get the button that was pressed
  userFlash(btn); // Flash the button for user feedback

  let userColor = btn.getAttribute("id"); // Get the color of the pressed button
  userSeq.push(userColor); // Add the color to the user's sequence

  checkAns(userSeq.length - 1); // Check the user's input
}

// Add event listeners to all game buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress); // Bind button press function
}

// Function to reset the game variables after a game over
function reset() {
  started = false; // Reset the started flag
  gameSeq = []; // Clear the game sequence
  userSeq = []; // Clear the user sequence
  level = 0; // Reset the level counter to 0
}
