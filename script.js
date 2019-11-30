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
}