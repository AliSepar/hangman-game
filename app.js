const worddysplay = document.querySelector(".word-dysplayed");
const hintText = document.querySelector(".hint-text b");
const gussesstext = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector("#hangman-img");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector("#playagain");

let myModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop"),
  {}
);

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const getRandomWord = () => {
  //will be called by page start or play again button
  // getting word and hint form the list
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintText.innerText = hint;
  resetGame();
};

const resetGame = () => {
  //  on page start or play agin button will be called and set every thing to default
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = "images/hangman-0.svg";
  gussesstext.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  worddysplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class='letter'></li>`)
    .join("");
  console.log(currentWord);
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
};

//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i); //this will git number value and change it to letters
  keyboardDiv.appendChild(button);
  let btnClasses = [
    "btn",
    "btn-primary",
    "m-1",
    "text-white",
    "text-uppercase",
  ];
  button.classList.add(...btnClasses);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

//
//
const initGame = (button, clickedLetter) => {
  //check if clickedletter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      // look in the currentword
      if (letter === clickedLetter) {
        // check if there is same letter in it
        correctLetters.push(letter);
        worddysplay.querySelectorAll("li")[index].innerText = letter;
        worddysplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // if clicked letter dose not exist then update the wrongGuestcount and hangman image
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  gussesstext.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // calling gameover function if any of these condition meets
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

//
//
//

const gameOver = (isVictory) => {
  // After game complete.. showing modal with relevant details
  const modalText = isVictory ? `You found the word:` : "The correct word was:";
  gameModal.querySelector("img").src = `images/${
    isVictory ? "victory" : "lost"
  }.gif`; // if statement change the image based on the
  gameModal.querySelector("h4").innerText = isVictory
    ? "Congrats!"
    : "Game Over!";
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  const helpMessage = document.createElement("p");
  helpMessage.innerText = "check Inspect if you need help";
  gameModal.classList.add("show");
  myModal.show();
};

getRandomWord();
playAgain.addEventListener("click", getRandomWord);
