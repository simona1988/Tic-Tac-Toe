const boardContainer = document.getElementById("game-board");
const statusMessage = document.getElementById("game-message");
const restartButton = document.getElementById("reset-button");

let gameBoard = Array(9).fill(null); 
let currentPlayerSymbol = "X"; 
let isGameActive = true; 

function renderGameBoard() {
    boardContainer.innerHTML = ""; 
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.addEventListener("click", () => handleCellClick(index, cellElement));
        boardContainer.appendChild(cellElement);
    });
}

function handleCellClick(cellIndex, cellElement) {
    const isCellEmpty = gameBoard[cellIndex] === null;
    const isAllowedToPlay = isGameActive && isCellEmpty;
    if (!isAllowedToPlay) {
        return;
    }
    colorTheCell(cellIndex, cellElement);
    checkGameStatus();
}

function colorTheCell(cellIndex, cellElement) {
    gameBoard[cellIndex] = currentPlayerSymbol;
    cellElement.textContent = currentPlayerSymbol;
    cellElement.classList.add("disabled");
    if (currentPlayerSymbol === "X") {
        cellElement.style.color = "green";
    } else {
        cellElement.style.color = "red";
    }
}

function checkGameStatus() {
    if (checkForWinner()) {
        statusMessage.textContent = `Player ${currentPlayerSymbol} wins!`;
        statusMessage.classList.replace("alert-info", "alert-success");
        isGameActive = false; 
    } else if (gameBoard.every(cell => cell !== null)) {
        statusMessage.textContent = "Game over: It's a draw!";
        statusMessage.classList.replace("alert-info", "alert-warning");
        isGameActive = false; 
    } else {
        if (currentPlayerSymbol === "X")  {
            currentPlayerSymbol = '0';
        } else {
            currentPlayerSymbol = 'X';
        }
        statusMessage.textContent = `It's Player ${currentPlayerSymbol}'s turn`;
    }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    return winningCombinations.some(combination =>
        combination.every(index => gameBoard[index] === currentPlayerSymbol)
    );
}

restartButton.addEventListener("click", () => {
    gameBoard = Array(9).fill(null); 
    currentPlayerSymbol = "X"; 
    isGameActive = true;
    statusMessage.textContent = "It's Player X's turn";
    statusMessage.classList.replace("alert-success", "alert-info");
    statusMessage.classList.replace("alert-warning", "alert-info");
    renderGameBoard(); 
});

renderGameBoard();