/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  if(n==1) {
    return [[1]];
  } 
  let solution;
  let boardObject = new Board({ n : n });
  //We'll make a board that is a nxn matrix
  let board = boardObject.rows();
  var rooks = 0;
  //var found = false;
  //count = 0
  //Build a recursive function to add additional rook and test for conflicts
  var helper = function(board, startIndex) {
    if(!board.hasAnyRowConflicts(board) && !board.hasAnyColConflicts(board)){
      //solutionsArr.push(board)
      //solution = board;
      //found = true;
      return board;
    }else if (startIndex === (n*n) || rooks > n) {
      return;
    }else{
      //iterate over matrix 
      for (var i = startIndex; i < (n*n); i++) {
        //check if current[i] is 0, if it is, change it to 1
        var numberOfRows = n;
        var numberOfCols = n;
        var rowIndex = Math.floor(i / numberOfRows);
        var colIndex = Math.floor(i % numberOfCols);
        //if (board[rowIndex][colIndex] === 0) {
        board[rowIndex][colIndex].togglePiece()
        if(!board.hasAnyRowConflicts(board) && !board.hasAnyColConflicts(board)) {
          var newIndex = i+1;
          var result = helper(board, newIndex);
          return result;
        }else{
          board[rowIndex][colIndex].togglePiece();
        }
      }
    }
  }

  solution = helper(board, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;


};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var boardObj = new Board({n:n});
  var board = boardObj.rows();

  if (n < 3) {
    solution = 0;
  }

  var helper = function(row) {  
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyQueensConflicts) {
        return solution = board;
      }
      if (!board.hasAnyQueensConflicts) {
        helper(row + 1);
      }   
      board.togglePiece(row, i)
    }
  };
  helper(0)

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  if (n === 2 || n === 3) {
    return solutionCount;
  }
  var helper = function(row) {
    if(row === n) {
      solutionCount++
      return;   
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        helper(row + 1);
      }
      board.togglePiece(row, i)
    }
  };

  helper(0)

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
