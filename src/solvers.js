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
  if(n === 1) {
    return [[1]];
  }; 

    //We'll make a board that is a nxn matrix
  let boardObj = new Board({ 'n' : n });
  //helper function to recurse
  let helper = function(row, board, n) {
    //if row === n then we have finished searching
    if (row === n) {
      return board.rows();
    }
    //i is the column 
    for (var i = 0; i < n; i++) {
      //toggle piece before checking
      board.togglePiece(row, i);
      //if there are no conflicts...
      if (!board.hasAnyRooksConflicts()) {
        let solutionBoard = helper(row+1, board, n);
        if (solutionBoard) {
          return solutionBoard;
        }
      }
      board.togglePiece(row, i)
    }
  }

  let solution = helper(0, boardObj, n)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  //ASK why it needs to be 'n' instead of n:n
  let board = new Board({'n':n});

  var helper = function(row) {
    if (n === row) {
      solutionCount++;
    } else {
      //using col instead of i b/c of sensemaking
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);
        if(!board.hasColConflictAt(col)) {
          helper(row+1)
        }
        board.togglePiece(row, col)
      }
    } 
  }
  //call on row 0 to start
  helper(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let board = new Board({'n':n});

  //if the board is only 2x2 or 3x3 then there are no solutions but if it's 1x1 
  //you can place one queen w/o conflicts, so needs to be n === 2 or 3, NOT n <= 3
  if (n === 2 || n === 3) {
    return board.rows();
  }

  let helper = function(row, board, n) { 
    //base case
    if (row === n) {
      return board.rows();
    }
    //so much easier to understand when you use col instead of i, remember to use sensible vars! 
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        let result = helper(row+1, board, n);
        if (result) {
          return result;
        }
      }
      board.togglePiece(row, col)
    }
  };
  let solution = helper(0, board, n)

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});

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
