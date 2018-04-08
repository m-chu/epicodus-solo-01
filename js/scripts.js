/// BUSINESS LOGIC ///
function PizzaOrder(size, sauce, cheese, toppings) {
  this.size = size;
  this.sauce = sauce;
  this.cheese = cheese;
  this.toppings = toppings;
  this.price;
}

PizzaOrder.prototype.calcPrice = function() {
  var pizzaCost = 12;
  if (this.size === "Large") {
    pizzaCost += 10;
  } else if (this.size === "Medium") {
    pizzaCost += 6;
  }
  if (this.toppings.length > 2) {
    pizzaCost += 1.5 * (this.toppings.length - 2);
  }
  this.price = pizzaCost;
}

/// USER INTERFACE LOGIC ///
$(document).ready(function() {
  var pizzaQueue = [];
  var orderNumber = 0;
  var orderTotal = 0;
  var cartCount = 0

  function addToCart() {
    $("#order-cart").prepend("<div id=\"order" + orderNumber + "\" class=\"pizza display-none\">" + "<h3 class=\"text-right\">" + pizzaQueue[orderNumber].size + " Pizza</h3>" + "<h4 class=\"text-right\">&dollar;" + pizzaQueue[orderNumber].price.toFixed(2) + "</h4>" + "<ul class=\"clearfix\"></ul>" + "<button class=\"btn btn-danger\" value=\"" + pizzaQueue[orderNumber].price + "\"><strong>X</strong></button>" + "</div>");
    $("#order" + orderNumber + " ul").append("<li>" + pizzaQueue[orderNumber].sauce + "</li>");
    $("#order" + orderNumber + " ul").append("<li>" + pizzaQueue[orderNumber].cheese + "</li>");
    pizzaQueue[orderNumber].toppings.forEach(function(topping) {
      $("#order" + orderNumber + " ul").append("<li>" + topping + "</li>");
    })
    $(".pizza").slideDown();
    $("#order" + orderNumber + " button").click(function() {
      pizzaQueue.splice(orderNumber, 1);
      orderTotal -= parseFloat($(this).val());
      cartCount --;
      $("#order-total span").text(orderTotal.toFixed(2));
      $("#pizza-count").text(cartCount);
      $(this).parent().remove();
    });
    orderTotal += pizzaQueue[orderNumber].price;
    cartCount ++;
    orderNumber ++;
    $("#order-total span").text(orderTotal.toFixed(2));
    $("#pizza-count").text(cartCount);
  }

  $("form#order").submit(function(event) {
    event.preventDefault();
    var pizzaSize = $("input:radio[name=pizza-size]:checked").val();
    var sauce = $("input:radio[name=sauce]:checked").val();
    var cheese = $("input:radio[name=cheese]:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      var selectedTopping = $(this).val();
      toppings.push(selectedTopping);
    });
    var newPizza = new PizzaOrder(pizzaSize, sauce, cheese, toppings);
    newPizza.calcPrice();
    pizzaQueue.push(newPizza);
    addToCart();
    $("form")[0].reset();
  });

  $("#checkout").click(function() {
    if (orderTotal !== 0) {
      var itemCount = 1;
      $("#order-input").fadeOut();
      $("#order-cart").hide();
      pizzaQueue.forEach(function(pizza) {
        $("#confirm-order .bin").append("<div><h4><strong>" + itemCount + ". " + pizza.size + " Pizza</strong></h4><ul></ul></div>")
        $("#confirm-order .bin ul").last().append("<li><strong>Sauce:</strong> " + pizza.sauce + "</li>");
        $("#confirm-order .bin ul").last().append("<li><strong>Cheese:</strong> " + pizza.cheese + "</li>");
        if (pizza.toppings[0] === undefined) {
          pizza.toppings.push("None")
        }
        $("#confirm-order .bin ul").last().append("<li><strong>Toppings:</strong> " + pizza.toppings.join(", ") + "</li>");
        itemCount ++;
      });
      $("#confirm-order").delay(400).fadeIn();

      $("#back").click(function() {
        $("confirm-order .bin").empty();
        $("#confirm-order").fadeOut();
        $("#order-input").fadeIn();
        $("#order-cart").show();
      });
    }
  });
});
