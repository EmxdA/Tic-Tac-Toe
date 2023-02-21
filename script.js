const board = document.querySelector("#board-container");

const gameBoard = (() => {
  var boardArray = new Array(9);

  const populateArray = (position, token) => {
    boardArray[position] = token;
  };

  return { boardArray, populateArray };
})();

const displayController = (() => {
  var playerTurn = 0;
  const gameTurn = (box) => {
    switch (playerTurn) {
      case 0:
        playerTurn = 1;
        box.textContent = "X";
        return "X";
      case 1:
        playerTurn = 0;
        box.textContent = "O";
        return "O";
      default:
        console.log("ERROR");
    }
  };
  return { gameTurn, playerTurn };
})();

const players = (token) => {
  return { token };
};


const player1 = players("X");
const player2 = players("O");

board.addEventListener("click", (event) => {
  const box = document.querySelector("#" + event.target.id);

  if (box.textContent == "") {
    gameBoard.populateArray(
      parseInt(box.dataset.value),
      displayController.gameTurn(box)
    );
  }
});
