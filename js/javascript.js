function gameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    const setInitialBoard = () => {

        for(let i = 0; i < row; i++) {
            board[i] = [];
            for(let j = 0; j < column; j++) {
                board[i].push(cell());
            }
        }
    }
    setInitialBoard();
    const getBoard = () => board;

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((column) => column.getValue()));
        console.log(boardWithValues);
    }

    const dropToken = (row, column, playerToken) => {
        if(board[row][column].getValue() !== 0) {
            console.log('Spot already taken by another user');
            printBoard();
            return false;
        } else {
            board[row][column].addToken(playerToken);
            printBoard();
            return true;
        }
    }

    function cell() {
        let value = 0;

        const getValue = () => value;

        const addToken = (playerToken) => {
            value = playerToken;
        } 

        return {
            getValue,
            addToken,
        }
    }

    const checkCellValue = (row, column) => board[row][column].getValue();

    return {
        getBoard,
        printBoard,
        dropToken,
        checkCellValue,
        setInitialBoard,
    }
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two",
) {
    const players = [
        {
            name: playerOneName,
            token: "O",
        },
        {
            name: playerTwoName,
            token: "X",
        }
    ];

    const changePlayerName = (name1, name2) => {
        if(name1 === name2) {
            return "error";
        }
        players[0].name = name1;
        players[1].name = name2;
    }

    const board = gameBoard();

    let activePlayer = players[0];
    function switchPlayerTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;
    let moveCount = 0;

    const resetGame = () => {
        board.setInitialBoard();
        activePlayer = players[0];
        moveCount = 0;
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} dropping token`);
        const playerToken = getActivePlayer().token;

        if(board.dropToken(row, column, playerToken)) {
            if(board.checkCellValue(0, 0) === playerToken && board.checkCellValue(0, 1) === playerToken && board.checkCellValue(0, 2) === playerToken ||
        board.checkCellValue(1, 0) === playerToken && board.checkCellValue(1, 1) === playerToken && board.checkCellValue(1, 2) === playerToken ||
        board.checkCellValue(2, 0) === playerToken && board.checkCellValue(2, 1) === playerToken && board.checkCellValue(2, 2) === playerToken ||
        board.checkCellValue(0, 0) === playerToken && board.checkCellValue(1, 0) === playerToken && board.checkCellValue(2, 0) === playerToken ||
        board.checkCellValue(0, 1) === playerToken && board.checkCellValue(1, 1) === playerToken && board.checkCellValue(2, 1) === playerToken ||
        board.checkCellValue(0, 2) === playerToken && board.checkCellValue(1, 2) === playerToken && board.checkCellValue(2, 2) === playerToken ||
        board.checkCellValue(0, 0) === playerToken && board.checkCellValue(1, 1) === playerToken && board.checkCellValue(2, 2) === playerToken ||
        board.checkCellValue(0, 2) === playerToken && board.checkCellValue(1, 1) === playerToken && board.checkCellValue(2, 0) === playerToken) {          
            console.log(`${getActivePlayer().name} is the winner`);
            return "win";
        }
        moveCount += 1;
        if(moveCount == 9) {
            console.log("It is a tie");
            return "tie";
        }
            switchPlayerTurn();
        }
        console.log(`${activePlayer.name}'s turn`);
    }

    return {
        switchPlayerTurn,
        getActivePlayer,
        playRound,
        getBoard: board.getBoard,
        resetGame,
        changePlayerName,
    }
}

function displayController() {
    const game = gameController();
    const playerTurn = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const resetGameBtn = document.querySelector('.reset');
    const playerNameChangeBtn = document.querySelector('.change-player-name');
    const errorMessage = document.querySelector('.error-message');

    playerNameChangeBtn.addEventListener('click', function() {
        const playerOneInput = prompt("Enter Player One Name", "Player One");
        const playerTwoInput = prompt("Enter Player Two Name", "Player Two");

        const changeName = game.changePlayerName(playerOneInput, playerTwoInput);
        if(changeName === "error") {
            errorMessage.textContent = "Player names can not be the same";
        }
        updateScreen();
    })

    const updateScreen = () => {
        playerTurn.textContent = `${game.getActivePlayer().name}'s turn`;
        boardDiv.textContent = "";
        const board = game.getBoard();

        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;

                cellButton.textContent = column.getValue() === 0 ? '' : column.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    const gameStatus = document.querySelector('.check-status');

    boardDiv.addEventListener('click', function(event) {
        const selectedRow = event.target.dataset.row;
        const selectedColumn = event.target.dataset.column;
        errorMessage.textContent = "";

        const result = game.playRound(selectedRow, selectedColumn);
        updateScreen();

        if(result === "win") {
            gameStatus.textContent = `${game.getActivePlayer().name} is the winner`;
            boardDiv.classList.add('locked');
        }

        if(result === "tie") {
            gameStatus.textContent = "It is a tie";
            boardDiv.classList.add('locked');
        }
    })

    resetGameBtn.addEventListener('click', function() {
        boardDiv.classList.remove('locked');
        errorMessage.textContent = "";
        gameStatus.textContent = "";
        game.resetGame();
        updateScreen();
    });

    updateScreen();
}
displayController();