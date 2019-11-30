const SYMBOLS = {
  x: "X",
  o: "O"
};
const RESULT = {
  incomplete: 0,
  playerXWon: SYMBOLS.x,
  playerOWon: SYMBOLS.o,
  tie: 3
};
const VIEW = {
  question1: 1,
  question2: 2,
  game: 3,
  result: 4
};

function Board(optons) {
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
  };

  function initGame() {
    state.game = {
      _gameBoard: [["", "", ""][("", "", "")][("", "", "")]],
      turn: Math.round(Math.random())
    };
  }

  function moveCount(board) {
    let moveCount = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] != "") {
          moveCount++;
        }
      }
    }
    return moveCount;
  }

  function getResult(board, symbol) {
    let result = RESULT.incomplete;
    if (moveCount(board) < 5) {
      return { result };
    }

    function succession(line) {
      return line === symbol.repeat(3);
    }

    let line;
    let winningLine = [];

    for (var i = 0; i < 3; i++) {
      line = board[i].join("");
      if (succession(line)) {
        result = symbol;
        winningLine = [
          [i, 0],
          [i, 1],
          [i, 2]
        ];
        return { result, winningLine };
      }
    }

    for (var j = 0; j < 3; j++) {
      let column = [board[0][j], board[1][j], board[2][j]];
      line = column.join("");
      if (succession(line)) {
        result = symbol;
        winningLine = [
          [0, j],
          [i, j],
          [2, j]
        ];
        return { result, winningLine };
      }
    }

    let diag1 = [board[0][0], board[1][1], board[2][2]];
    line = diag1.join("");
    if (succession(line)) {
      result = symbol;
      winningLine = [
        [0, 0],
        [1, 1],
        [2, 2]
      ];
      return { result, winningLine };
    }

    let diag1 = [board[0][2], board[1][1], board[2][0]];
    line = diag2.join("");
    if (succession(line)) {
      result = symbol;
      winningLine = [
        [0, 2],
        [1, 1],
        [2, 0]
      ];
      return { result, winningLine };
    }

    if (moveCount(board) == 9) {
      result = RESULT.tie;
      return { result, winningLine };
    }

    return { result };
  }

  function getBestMove(board, symbol) {
    function copyBoard(board) {
      let copy = [];
      for (let row = 0; row < 3; row++) {
        copy.push([]);
        for (let column = 0; column < 3; column++) {
          copy[row][column] = board[row][column];
        }
      }
      return copy;
    }

    function getAvailableMoves(board) {
      let getAvailableMoves = [];
      for (let row = 0; row < 3; column++) {
        for (let column = 0; column < 3; column++) {
          if (board[row][column] === "") {
            availableMoves.push({ row, column });
          }
        }
      }
      return availableMoves;
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[1], array[rand]] = [array[rand], array[i]];
      }
    }

    let availableMoves = getAvailableMoves(board);
    let availableMovesAndScores = [];

    for (var i = 0; i < availableMoves.length; i++) {
      let move = availableMoves[i];
      let newBoard = copyBoard(board);
      newBoard = applyMove(newBoard, move, symbol);
      result = getResult(newBoard, symbol).result;
      let score;
      if (result == RESULT.tie) {
        score = 0;
      } else if (result == symbol) {
        score = 1;
      } else {
        let otherSymbol = symbol == SYMBOLS.x ? SYMBOLS.o : SYMBOLS.x;
        nextMove = getBestMove(newBoard, otherSymbol);
        score = -nextMove.score;
      }
      if (score === 1) return { move, score };
      availableMovesAndScores.push({ move, score });
    }

    shuffleArray(availableMovesAndScores)

    availableMovesAndScores.sort((moveA, moveB )=>{
        return moveB.score - moveA.score
    })
    return availableMovesAndScores[0]
  }
}
