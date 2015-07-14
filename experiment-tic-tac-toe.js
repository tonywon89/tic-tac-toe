
var player1Turn = $("#player1-checkbox"), player2Turn = $("#player2-checkbox");
var player1Text = $("#player1-text"), player2Text = $("#player2-text");
var startButton = $('#start-button'), resetButton = $('#reset-button');
var entry1 = $('#entry1'), entry2 = $('#entry2'), entry3 = $('#entry3'),
    entry4 = $('#entry4'), entry5 = $('#entry5'), entry6 = $('#entry6'),
    entry7 = $('#entry7'), entry8 = $('#entry8'), entry9 = $('#entry9');
var counter = 0;

$(document).ready(function(){



// test code

 

//
  disable(resetButton);
  $(".main-grid").hide();

//when start button is clicked, will make box appear and allow player 1 to go first
  $("#start-button").click(function(){
    disable(startButton);
    enable(resetButton);
    $('.main-grid').fadeIn("slow");
    $('.announcement').text("Go!")
    
    player1Turn.prop("checked", true);
    player1Text.addClass("active-turn");
  });

  // will change turns after an entry is made. Also disables the squares once they're clicked
  $('.square').on("click", entryPlacement);
    
  // Determine the results of the match




  // resets the board to start a new game 
  resetButton.click(function(){
    //re-enable the boxes to be clickable
    $('.square').on("click", entryPlacement);
    clearGrid();
    enable(startButton);
    disable(resetButton);
    //clears the player checkmarks and highlights
    if (player1Turn.prop("checked")) {
      removeTurn(player1Turn, player1Text);
    } else {
      removeTurn(player2Turn, player2Text);
    }
    $('.announcement').text("Ready to play another game? Press Start!")
    $('.main-grid').fadeOut("slow");
    counter = 0;
  });


function entryPlacement() {
  counter += 1;
  console.log(counter);
    if (player1Turn.prop("checked")) {
      placeMark("X", this);
      if (counter > 4){
        checkRows("Player 1");
      }
      changeTurn(player1Turn,player1Text,player2Turn,player2Text);
      $(this).off("click");
      
    } else  {
      placeMark("O", this);
      if (counter > 4){
        checkRows("Player 2");
      }
      changeTurn(player2Turn,player2Text,player1Turn,player1Text);
      $(this).off("click");

    }
 
    // test code
     
    /*
    if (entry4.text() && entry5.text() && entry6.text()) {
        if (entry4.text() == entry5.text() && entry4.text() == entry6.text()){
          console.log("player 2 win");
        }   
    }
    */

    if (counter == 9) {
        $('.announcement').text("The game is over! Press start to play again.");
    } 
    //
}

function disable(button) {
  button.prop("disabled", true)
}

function enable(button) {
  button.prop("disabled", false)
}

//This will change the turn from player 1 to player 2, or vice versa
function changeTurn(currentTurn, currentText, nextTurn, nextText) {
  removeTurn(currentTurn, currentText);
  addTurn(nextTurn,nextText);
}

function removeTurn(playerTurn, playerText) {
  playerTurn.prop("checked",false)
  playerText.removeClass("active-turn")
}

function addTurn(playerTurn, playerText) {
  playerTurn.prop("checked", true);
  playerText.addClass("active-turn");
}

//This will place either 0 or X for the entry, and place it in the corresponding box
function placeMark(entry,location) {
  $(".entry", location).text(entry);
}

function checkWin(mark) {
  if (checkRow(mark)) { return true; }
  else if (checkCol(mark)){ return true; }
  else if (checkDiag(mark)) { return true; }
  else {return false;}
}

function checkRows(player) {
  if (checkFirstRow(entry1, entry2, entry3)) {
    $('.announcement').text(player + " wins!")}
  if (checkSecondRow(entry4. entry5, entry6)) {$('.announcement').text(player + " wins!")}
  if (checkThirdRow(entry7, entry8, entry9)) {$('.announcement').text(player + " wins!")}
  
}

function checkFirstRow(first, second, third) {
   first = $('#entry1');
   second = $('#entry2');
   third = $('#entry3');
   if (first.html() && second.html() && third.html()) {
      return (first.html() === second.html() && first.html() === third.html());
    }
}

function checkSecondRow(first, second, third) {
   first = $('#entry4');
   second = $('#entry5');
   third = $('#entry6');
   if (first.html() && second.html() && third.html()) {
      return (first.html() === second.html() && first.html() === third.html());
    }
}

function checkThirdRow(first, second, third) {
   first = $('#entry7');
   second = $('#entry8');
   third = $('#entry9');
   if (first.html() && second.html() && third.html()) {
      return (first.html() === second.html() && first.html() === third.html());
    }
}

function checkCols(mark) {

}

function checkDiags(mark) {

}

function clearGrid() {
  $(".entry").empty();
}
});


