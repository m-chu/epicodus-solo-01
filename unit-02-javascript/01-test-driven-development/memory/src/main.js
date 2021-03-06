import $ from 'jquery';
import { Card, createDeck, cardPositions } from './memory.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function isMatch (cardType1, cardType2) {
  if (cardType1 === cardType2) {
    return true;
  } else {
    return false;
  }
}

$(document).ready(function() {
  var deck = [];
  var cardType1 = null;
  var cardType2 = null;
  var cardPosition1 = null;
  var cardPosition2 = null;

  createDeck(deck);
  cardPositions(deck);

  deck.forEach(function(card) {
    $("td#" + card.position).html("<div data-card-type=\"" + card.type + "\" class=\"display-none\">" + card.type + "</div>");
  });

  $("td").click(function() {
    if (cardType1 === null) {
      cardType1 = $(this).children("div").attr("data-card-type");
      cardPosition1 = $(this).attr("id");
      $(this).children("div").show();
      $(this).addClass("no-click");
    } else {
      cardType2 = $(this).children("div").attr("data-card-type");
      cardPosition2 = $(this).attr("id");
      $(this).children("div").show();
      $(".no-match").addClass("no-click");
      setTimeout(function() {$(".no-match").removeClass("no-click");}, 600);
      if (!isMatch(cardType1, cardType2)) {
        $("#" + cardPosition1).children().delay(500).fadeOut(500);
        $("#" + cardPosition1).removeClass("no-click");
        $("#" + cardPosition2).children().delay(500).fadeOut(500);
        $("#" + cardPosition2).removeClass("no-click");
      } else {
        $("#" + cardPosition1).removeClass("no-match");
        $("#" + cardPosition2).removeClass("no-match");
      }
      cardType1 = null;
      cardType2 = null;
      cardPosition1 = null;
      cardPosition2 = null;
    }
  });
});
