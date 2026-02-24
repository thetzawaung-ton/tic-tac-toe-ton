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
    }
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two",
) {
    const players = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        }
    ];
    const board = gameBoard();

    let activePlayer = players[0];
    function switchPlayerTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;
    

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
            return
        }
            switchPlayerTurn();
        }
        console.log(`${activePlayer.name}'s turn`);
    }

    return {
        switchPlayerTurn,
        getActivePlayer,
        playRound,
    }
}