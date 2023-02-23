const board = document.querySelector("#board-container");
const heading = document.querySelector("#heading");
const playBtn = document.querySelector("#play-btn");
const mode = document.querySelector("#modes");
const pvpBtn = document.querySelector("#pvp-btn");
const loadOne = document.querySelector(".dot-pulse");
const loadTwo = document.querySelector(".dot-pulse-two");
const modal = document.querySelector("#modal");
const inputNameOne = document.querySelector("#player-name-one");
const inputNameTwo = document.querySelector("#player-name-two");
const confirmName = document.querySelector("#confirm-name");
const cancel = document.querySelector("#cancel-name");
const displayNameOne = document.querySelector("#player-one-name");
const displayNameTwo = document.querySelector("#player-two-name");
const form = document.querySelector("#player-details-form");
const playerContainer = document.querySelector("#player-container");
const mainContainer = document.querySelector("#main-container");
const winModal = document.querySelector("#winning-modal");
const winHeading = document.querySelector("#win-heading");
const playAgainBtn = document.querySelector("#play-again");

var player1, player2;

const gameBoard = (() => {
  var boardArray = new Array(9);

  const populateArray = (position, token) => {
    boardArray[position] = token;
  };

  const checkForWin = () => {
    for (let i = 0; i < boardArray.length; i++) {
      if (
        (i === 0 || i % 3 === 0) &
        (boardArray[i] === boardArray[i + 1]) &
        (boardArray[i] === boardArray[i + 2]) &
        (boardArray[i] != null)
      ) {
        return boardArray[i];
      } else if (
        (i < 3) &
        (boardArray[i] === boardArray[i + 3]) &
        (boardArray[i] === boardArray[i + 6])
      ) {
        return boardArray[i];
      } else if (i === 0 || i === 6) {
        if ((boardArray[i] === boardArray[4]) & (boardArray[i] != null)) {
          if ((i === 0) & (boardArray[i] === boardArray[8])) {
            return boardArray[i];
          } else if (boardArray[i] === boardArray[2]) {
            return boardArray[i];
          }
        }
      }
    }
  };

  return { boardArray, populateArray, checkForWin };
})();

const displayController = (() => {
  var playerTurn = 0;
  const gameTurn = (box) => {
    switch (playerTurn) {
      case 0:
        playerTurn = 1;
        box.textContent = "X";
        loadOne.setAttribute("style", "visibility: hidden;");
        loadTwo.setAttribute("style", "visibility: unset;");
        return "X";
      case 1:
        playerTurn = 0;
        box.textContent = "O";
        loadTwo.setAttribute("style", "visibility: hidden;");
        loadOne.setAttribute("style", "visibility: unset;");
        return "O";
      default:
        console.log("ERROR");
    }
  };
  return { gameTurn, playerTurn };
})();

const players = (name, token) => {
  return { name, token };
};


playBtn.addEventListener("click", () => {
  playBtn.remove();
  mode.setAttribute("style", "visibility: unset;");
});

pvpBtn.addEventListener("click", () => {
  modal.setAttribute("style", "visibility: unset;");
  mainContainer.setAttribute("style", "filter: blur(5px) brightness(0.9);");
});

confirmName.addEventListener("click", (e) => {
  if (inputNameOne.checkValidity() & inputNameTwo.checkValidity()) {
    e.preventDefault();
    mode.remove();
    board.setAttribute("style", "visibility: unset;");
    player1 = players(inputNameOne.value, "X");
    player2 = players(inputNameTwo.value, "O");
    displayNameOne.textContent = player1.name.toString();
    displayNameTwo.textContent = player2.name.toString();
    playerContainer.setAttribute("style", "visibility: unset;");
    modal.setAttribute("style", "visibility: hidden;");
    mainContainer.setAttribute("style", "filter: none;");
    loadTwo.setAttribute("style", "visibility: hidden;");
    form.reset();
  }
});

cancel.addEventListener("click", () => {
  modal.setAttribute("style", "visibility: hidden;");
  mainContainer.setAttribute("style", "filter: none;");
  form.reset();
});

board.addEventListener("click", (event) => {
  const box = document.querySelector("#" + event.target.id);

  if (box.textContent === "") {
    gameBoard.populateArray(
      parseInt(box.dataset.value) - 1,
      displayController.gameTurn(box)
    );
  }

  var winner = gameBoard.checkForWin();
  if (winner === "X") {
    winHeading.textContent = player1.name.toString() + " Won!";
    winModal.setAttribute("style", "visibility: unset;");
    mainContainer.setAttribute("style", "filter: blur(5px) brightness(0.9);");
  } else if (winner === "O") {
    winHeading.textContent = player2.name.toString() + " Won!";
    winModal.setAttribute("style", "visibility: unset;");
    mainContainer.setAttribute("style", "filter: blur(5px) brightness(0.9);");
  }
});

playAgainBtn.addEventListener("click", () => {
 location.reload();
});
