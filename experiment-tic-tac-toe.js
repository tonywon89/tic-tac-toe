
$(document).ready(function(){
  var player1Turn = $("#player1-checkbox"), player2Turn = $("#player2-checkbox");
  var player1Text = $("#player1-text"), player2Text = $("#player2-text");

  $("#start-button").click(function(){
    $(this).prop("disabled",true);
    $('.main-grid').fadeIn("slow");
    
    player1Turn.prop("checked", true);
    player1Text.addClass("active-turn");
  });

  $('.square').click(function() {
    if (player1Turn.prop("checked")) {
      changeTurn(player1Turn,player1Text,player2Turn,player2Text);
      placeMark("X", this);

    } else  {
      changeTurn(player2Turn,player2Text,player1Turn,player1Text);
      placeMark("O", this);
    }
    
  });

//This will change the turn from player 1 to player 2, or vice versa
function changeTurn(currentTurn, currentText, nextTurn, nextText) {
  currentTurn.prop("checked", false);
  currentText.removeClass("active-turn");
  nextTurn.prop("checked", true);
  nextText.addClass("active-turn");
}

//This will place either 0 or X for the entry, and place it in the corresponding box
function placeMark(entry,location) {
  $(".entry", location).text(entry);
}
});
