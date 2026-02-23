function gameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for(let i = 0; i < row; i++) {
        board[i] = [];
        for(let j = 0; j < column; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((column) => column.getValue()));
        console.log(boardWithValues);
    }

    const dropToken = (row, column) => {
        const availableCells = board.filter((row) => row[column].getValue() === null)
                                .map(row => row[column]);

        if(!availableCells) return;
        board[row][column].addToken();
        printBoard();
    }

    function cell() {
        let value = null;

        const getValue = () => value;

        const addToken = () => {
            value = 0;
        } 

        return {
            getValue,
            addToken,
        }
    }

    return {
        getBoard,
        printBoard,
        dropToken,
    }
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two",
) {
    const players = [
        {
            name: playerOneName,
            token: 0,
        },
        {
            name: playerTwoName,
            token: 1,
        }
    ];
    const board = gameBoard();

    let activePlayer = players[0];
    function switchPlayerTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    return {
        switchPlayerTurn,
        getActivePlayer,
    }
}