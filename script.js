const SYMBOLS = {
    x: 'X',
    o: 'O'
}
const RESULT = {
    incomplete: 0,
    playerXWon: SYMBOLS.x,
    playerOWon: SYMBOLS.o,
    tie: 3
}
const VIEW = {
    question1: 1,
    question2: 2,
    game: 3,
    result: 4
}

function Board (optons){

    state = {
        view: VIEW.question1,
        players: [
            {
                symbol: null,
                isComputer: false,
                score: 0
            },
            {
                symbol: null,
                isComputer: false,
                score: 0
            }
        ]
    }

    function initGame(){
        state.game = {
            _gameBoard: [
                ["", "", ""]
                ["", "", ""]
                ["", "", ""]
            ],
            turn: Math.round(Math.random()),
        }
    }

    function moveCount(board){
        let moveCount = 0
        for (let i = 0; i<board.length; i++){
            for (let j = 0 ; j<board[i].length ; j++){
                if (board[i][j]!=""){
                    moveCount++
                }
            }
        }
        return moveCount
    }

    function getResult(board,symbol){
        let result = RESULT.incomplete
        if (moveCount(board)<5){
            return {result}
        }

        function succession (line){
            return (line === symbol.repeat(3))
        }

        let line
        let winningLine = []

        for (var i = 0 ; i<3 ; i++){
            line = board[i].join('')
            if(succession(line)){
                result = symbol;
                winningLine = [[i,0], [i,1], [i,2]]
                return {result, winningLine};
            }
        }
    }

    for (var j=0 ; j<3; j++){
        let column = [board[0][j],board[1][j],board[2][j]]
        line = column.join('')
        if(succession(line)){
            result = symbol
            winningLine = [[0,j], [i,j], [2,j]]
            return {result, winningLine};
        }
    }

    let diag1 = [board[0][0],board[1][1],board[2][2]]
    line = diag1.join('')
    if(succession(line)){
        result = symbol
        winningLine = [[0,0], [1,1], [2,2]]
        return {result, winningLine};
    }

    let diag1 = [board[0][2],board[1][1],board[2][0]]
    line = diag2.join('')
    if(succession(line)){
        result = symbol
        winningLine = [[0,2], [1,1], [2,0]]
        return {result, winningLine};
    }
}