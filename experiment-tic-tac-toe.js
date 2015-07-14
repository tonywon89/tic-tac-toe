
$(document).ready(function(){
  var player1Turn = $("#player1-checkbox"), player2Turn = $("#player2-checkbox");
  var player1Text = $("#player1-text"), player2Text = $("#player2-text");
  var startButton = $('#start-button'), resetButton = $('#reset-button');

  disable(resetButton);
  $(".main-grid").hide();

  $("#start-button").click(function(){
    disable(startButton);
    enable(resetButton);
    $('.main-grid').fadeIn("slow");
    $('.announcement').text("Go!")
    
    player1Turn.prop("checked", true);
    player1Text.addClass("active-turn");
  });

  $('.square').click(function() {
    if (player1Turn.prop("checked")) {
      changeTurn(player1Turn,player1Text,player2Turn,player2Text);
      placeMark("X", this);
      $(this).off("click");
    } else  {
      changeTurn(player2Turn,player2Text,player1Turn,player1Text);
      placeMark("O", this);
      $(this).off("click");
    }
    
  });

  resetButton.click(function(){
    clearGrid();
    enable(startButton);
    disable(resetButton);
    if (player1Turn.prop("checked")) {
      removeTurn(player1Turn, player1Text);
    } else {
      removeTurn(player2Turn, player2Text);
    }
    $('.announcement').text("Ready to play another game? Press Start!")
    $('.main-grid').fadeOut("slow");
  });



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

function clearGrid() {
  $(".entry").empty();
}
});


