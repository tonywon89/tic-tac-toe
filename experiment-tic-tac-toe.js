
var player1Turn = $("#player1-checkbox"), player2Turn = $("#player2-checkbox");
var player1Text = $("#player1-text"), player2Text = $("#player2-text");
var startButton = $('#start-button'), resetButton = $('#reset-button');
var entry1 = $('#entry1'), entry2 = $('#entry2'), entry3 = $('#entry3'),
    entry4 = $('#entry4'), entry5 = $('#entry5'), entry6 = $('#entry6'),
    entry7 = $('#entry7'), entry8 = $('#entry8'), entry9 = $('#entry9');
var counter = 0;

$(document).ready(function(){

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
    $('.entry.win').removeClass("win");
    $('.announcement').text("Ready to play another game? Press Start!")
    $('.main-grid').fadeOut("slow");
    counter = 0;
  });


// Adds a turn, and places a mark on the square. Also, if turn is greater than 4, checks win conditions. Changes turn if game continues
function entryPlacement() {
    counter += 1;
    if (player1Turn.prop("checked")) {
      placeMark("X", this);
      if (counter > 4){
        if (checkAll()) {
          $('.square').off("click");
          $('.announcement').text("Player 1 Wins! Press reset to play again.");
        }
      }
      changeTurn(player1Turn,player1Text,player2Turn,player2Text);
      $(this).off("click");
      
    } else {
      placeMark("O", this);
      if (counter > 4){
        if (checkAll()) {
          $('.square').off("click");
          $('.announcement').text("Player 2 Wins! Press reset to play again.");
        }
      }
      changeTurn(player2Turn,player2Text,player1Turn,player1Text);
      $(this).off("click");
    }

    if (counter == 9 && !checkAll()) {
        $('.announcement').text("It's a Tie! Press start to play again.");
    } 
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
//removes the highlight and the checkmark
function removeTurn(playerTurn, playerText) {
  playerTurn.prop("checked",false)
  playerText.removeClass("active-turn")
}
//adds the checkmark and highlight
function addTurn(playerTurn, playerText) {
  playerTurn.prop("checked", true);
  playerText.addClass("active-turn");
}

//This will place either 0 or X for the entry, and place it in the corresponding box
function placeMark(entry,location) {
  $(".entry", location).text(entry);
}


function checkAll() {
  // checks first row
  if (check(entry1, entry2, entry3)) {
    return true;
  }
  // checks second row
  if (check(entry4, entry5, entry6)) {
    return true;
  }
  // checks third row
  if (check(entry7, entry8, entry9)) {
    return true;
  }

  // checks first column
  if (check(entry1, entry4, entry7)) {
    return true;
  }
  // checks second column
  if (check(entry2, entry5, entry8)) {
    return true;

  }
  // checks third column
  if (check(entry3, entry6, entry9)) {
    //console.log("third column win");
    return true;
  }

  // checks right diagonal
  if (check(entry1, entry5, entry9)) {
    return true;
  }
  // checks left diagonal
  if (check(entry3, entry5, entry7)) {
    return true;
  }
  return false;
  
}

function check(first, second, third) {
  if (first.html() && second.html() && third.html()) {
    if(first.html() === second.html() && first.html() === third.html()) {
      first.addClass("win");
      second.addClass("win");
      third.addClass("win");
      return true;
    }
  }
}

function clearGrid() {
  $(".entry").empty();
}
});


