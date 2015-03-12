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
  var board = new Board({n:n});
  var firstRow = 0;
  var firstCol = 0;
  var solution = [];
  var colTracker = Array(n);
  var testSpot = function(row, col){
    // if the input is invalid, something's gone wrong
    if (col < 0 || row < 0){
      return;
    }
    // if the whole first row is empty, game over
    if (col >= n && row === 0){
      return;
    }
    // if the col is off board, ask parentCol for place to recurse
    if (col >= n) {
      var parentCol = colTracker[row - 1];
      // delete the previous row's spot
      board.get(row - 1)[parentCol] = 0;
      testSpot(row - 1, (parentCol + 1));
    }
    // set the next spot to 1 in prep for testing
    board.get(row)[col] = 1;
    // test the spot for conflicts
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()){
      // conflict found
      board.get(row)[col] = 0;
      testSpot(row, col + 1);
    } else {
      // no conflict found
      // leave it there
      // update colTracker
      colTracker[row] = col;
      // check if next is off board
      if (row === (n - 1)){
        for (var i = 0; i < n; i++) {
          solution.push(board.get(i));
        };
        //return solution;
      } else {
        // call test Spot on next row
        testSpot(row + 1, 0);
      }
    }
  }
  testSpot(firstRow, firstCol);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var firstRow = 0;
  var firstCol = 0;
  //var solution = [];
  var colTracker = Array(n);
  var testSpot = function(row, col){
    // if the input is invalid, something's gone wrong
    if (col < 0 || row < 0){
      return;
    }
    // if the whole first row is empty, game over
    if (col >= n && row === 0){
      return;
    }
    // if the col is off board, ask parentCol for place to recurse
    if (col >= n) {
      var parentCol = colTracker[row - 1];
      // delete the previous row's spot
      board.get(row - 1)[parentCol] = 0;
      return testSpot((row - 1), (parentCol + 1));
    }
    // set the next spot to 1 in prep for testing
    board.get(row)[col] = 1;
    // test the spot for conflicts
     if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()){ //has col conflict - row conflict should not happen anyway
      //if(board.hasColConflictAt(col)) {
      // conflict found
      board.get(row)[col] = 0;
      testSpot(row, col + 1);
    } else {
      // no conflict found
      // leave it there
      // update colTracker
      colTracker[row] = col;
      // check if next is off board
      if (row === (n - 1)){
        //if solution, keep going
        solutionCount++;

        board.get(row)[col] = 0;
        testSpot(row, col + 1);

      } else {
        // call test Spot on next row
        testSpot(row + 1, 0);
      }
    }
  }
  testSpot(firstRow, firstCol);




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var firstRow = 0;
  var firstCol = 0;
  var solution = [];
  var colTracker = Array(n);
  var testSpot = function(row, col){
    // if the input is invalid, something's gone wrong
    if (col <=0 || row <=0){
      return;
    }
    // if the whole first row is empty, game over
    if (col >= n && row === 0){
      return;
    }
    // if the col is off board, ask parentCol for place to recurse
    if (col >= n) {
      var parentCol = colTracker[row - 1];
      // delete the previous row's spot
      board.get(row - 1)[parentCol] = 0;
      testSpot(row - 1, (parentCol + 1));
    }
    // set the next spot to 1 in prep for testing
    board.get(row)[col] = 1;
    // test the spot for conflicts
    if (board.hasAnyQueensConflicts()){
      // conflict found
      board.get(row)[col] = 0;
      testSpot(row, col + 1);
    } else {
      // no conflict found
      // leave it there
      // update colTracker
      colTracker[row] = col;
      // check if next is off board
      if (row === (n - 1)){
        for (var i = 0; i < n; i++) {
          solution.push(board.get(i));
        };
        //return solution;
      } else {
        // call test Spot on next row
        testSpot(row + 1, 0);
      }
    }
  }
  testSpot(firstRow, firstCol);
  

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var firstRow = 0;
  var firstCol = 0;
  //var solution = [];
  var colTracker = Array(n);
  var testSpot = function(row, col){
    // if the input is invalid, something's gone wrong
    if (col < 0 || row < 0){
      return;
    }
    // if the whole first row is empty, game over
    if (col >= n && row === 0){
      return;
    }
    // if the col is off board, ask parentCol for place to recurse
    if (col >= n) {
      var parentCol = colTracker[row - 1];
      // delete the previous row's spot
      board.get(row - 1)[parentCol] = 0;
      return testSpot((row - 1), (parentCol + 1));
    }
    // set the next spot to 1 in prep for testing
    board.get(row)[col] = 1;
    // test the spot for conflicts
    if (board.hasAnyQueensConflicts()){
      // conflict found
      board.get(row)[col] = 0;
      testSpot(row, col + 1);
    } else {
      // no conflict found
      // leave it there
      // update colTracker
      colTracker[row] = col;
      // check if next is off board
      if (row === (n - 1)){
        //if solution, keep going
        solutionCount++;

        board.get(row)[col] = 0;
        testSpot(row, col + 1);

      } else {
        // call test Spot on next row
        testSpot(row + 1, 0);
      }
    }
  }
  testSpot(firstRow, firstCol);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
