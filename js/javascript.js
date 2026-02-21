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

    function cell() {
        let value = 0;

        const getValue = () => value;

        return {
            getValue,
        }
    }

    return {
        getBoard,
    }
}