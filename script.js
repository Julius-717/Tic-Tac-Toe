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
    }
}