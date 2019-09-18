$(document).ready(function() {


	$( "a" ).click(function( event ) {
  		event.preventDefault();
	});

	var numOfOrders = 0;
	$(".num").text(numOfOrders);

	// hide dialogs on start
	$("#thanksMessage, #checkOrderLarge, #checkOrderMacaroni, #checkOrderPizza, #checkOrderMedium, #checkOrderSpaghetti, #checkOrderRisotto, #finishOrderDialog").hide();

	// open dialog on click
	$("#addToCartLarge").on("click", function () {
		$("#checkOrderLarge").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
	})

	$("#addToCartMedium").on("click", function () {
		$("#checkOrderMedium").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
	})

	$("#addToCartPizza").on("click", function () {
		$("#checkOrderPizza").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
	})

	$("#addToCartMedium").on("click", function () {
		$("#checkOrderMediu").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
	})

	// increase/decrease the price of order if an item is added/removed
	function checkboxChange(x) {
		var priceDialog = 0;
		$("#recipe"+x).children("li").children("input").each(function () {
			if($(this).is(":checked")){
				priceDialog+=3;
			}
				$("#totalDialog"+x+">span").text(priceDialog);
			$(this).change(function () {
				if ($(this).is(":checked")) {
					priceDialog += 3;
					console.log(priceDialog);
					$("#totalDialog"+x+">span").text(priceDialog);
				}else{
					priceDialog -= 3;
					$("#totalDialog"+x+">span").text(priceDialog);
				}
			})
		});
	}

	$('#recipe1').children('li').click(checkboxChange(1));
	$('#recipe2').children('li').click(checkboxChange(2));
	$('#recipe3').children('li').click(checkboxChange(3));
	$('#recipe3').children('li').click(checkboxChange(4));
	$('#recipe3').children('li').click(checkboxChange(5));
	$('#recipe3').children('li').click(checkboxChange(6));

	$(".addIngrTopping").on("click", function () {
		// Creates input field and two buttons for adding an topping that's not on the list
		var inputIng = '<input type="text" id="newTopping">';
		var confirmInput = '<a class="btnStyle3 btnStyle confirmInput">&#10004;</a>';
		var cancelInput = '<a class="btnStyle3 btnStyle cancelInput">&#10008;</a>';
		var inputWrap = '<div class="addToppingWrap">' + inputIng + confirmInput + cancelInput + '</div>'
		$(this).parent().children("ul").after(inputWrap);
    $("#newTopping").focus();
    $("#newTopping").attr("placeholder", "separate Tooping with a comma");

		// Confirm button adds the new ingrediant to the list of ingrediants
		$(".addToopingWrap > .confirmInput").on("click", function () {
			if ($("#newTopping").val() != "") {
        //split takes the value of the input and splits it into separate array elements after every comma
				var newIngredient = ($(".addToppingWrap input").val()).split(",");
				var newCheckbox = '<input type="checkbox" checked>';

        for (var i = 0; i < newIngredient.length; i++){
         $(this).parent().siblings("ul").append("<li>" + newCheckbox + newIngredient[i] + "  (+3$)</li>");
        }


				$('#recipe1').children('li').click(checkboxChange(1));
				$('#recipe2').children('li').click(checkboxChange(2));
				$('#recipe3').children('li').click(checkboxChange(3));
				$('#recipe3').children('li').click(checkboxChange(4));
				$('#recipe3').children('li').click(checkboxChange(5));
				$('#recipe3').children('li').click(checkboxChange(6));

				$(this).parent().remove();
			}else{
				$("#newIngredient").attr("placeholder", "Please add ingrediant");
			}
		});
		// Remove button hides the input
		$(".addIngredientWrap > .cancelInput").on("click", function () {
			$(this).parent().remove();
		})
	})// add ingredient button

	$(".listOver").on("click", function () {
		var orderName = '<h3 class="orderName"><span>' + $(this).parent().siblings(".ui-dialog-titlebar").children("span").text() + '</span><a class="delBtn">&#10008;</a>' +'</h3>';
		var orderIngredients = '<ul class="orderIngredients"></ul>';
		var orderPrice = '<h3 class="orderPrice"><span>' + $(this).parent().children(".totalDialog").children("span").text() + '</span>$<h3>'
		var horisontalLine = '<hr>';
		$(".cart").children("#listOfOrders").append("<li>" + orderName + orderIngredients + orderPrice + horisontalLine + "</li>");

		$(this).parent().children("ul").children().children("input:checked").each(function () {
			var selectedIngredient = $(this).parent().text();
			$(".orderIngredients").last().append("<li>" + selectedIngredient + "</li>");
		})

		// opens the cart side menu
		if ($('#cartToggle').prop('checked')) {
			$("#cartToggle").prop("checked", true);
		}else{
			$("#cartToggle").prop("checked", true);
		}

		$(this).parent(".ui-dialog-content").dialog("close");

		numOfOrders = $("#listOfOrders").children().length;
		$(".num").text(numOfOrders);

		// display total price in cart orders
		var totalOrderPrice = 0;
		$("#listOfOrders").children("li").children(".orderPrice").children("span").each(function () {
			var price = parseFloat($(this).text());
			totalOrderPrice += price;
			$(".cart > h3 > span").text(totalOrderPrice + "$");
		});

		// remove order from cart
		$(".delBtn").on("click", function () {
			var removePrice = $(this).parent().parent().children(".orderPrice").children("span").text();
			totalOrderPrice -= removePrice;
			$(".cart > h3 > span").text(totalOrderPrice + "$");

			$(this).parents("li").remove();
			numOfOrders = $("#listOfOrders").children().length;
			$(".num").text(numOfOrders);
		})
	}); // List over (done button)

	$(".finishOrder").on("click", function () {
     $("#finalOrderList > ol").children().remove();
		$(".orderName").children("span").each(function(){
			var finalOrder = '<li>' + $(this).text() + '</li>';
			$("#finalOrderList > ol").append(finalOrder);
		})

		$("#finishOrderDialog").dialog({
			hide: "blind",
	    	show : "blind",
	    	width: "500px",
        closeText: "X"
	    });
	})

	$(".order").on("click", function () {
		var name = $("#buyerName").val();
		var number = $("#buyerNumber").val();
		var address = $("#buyerAddress").val();

		if (name != "" && number != "" && address != "") {
			$("#finishOrderDialog").dialog("close");
			$("#buyerInfo").children("p").remove();
			$("#thanksMessage").dialog({
				hide: "blind",
		    	show : "blind",
		    	width: "400px"
		    });
		    setTimeout(function(){
		    	$("#thanksMessage").dialog("close");
		    }, 3000);
		}else{
			$("#buyerInfo").append('<p>Fill up all the inputs</p>');
		}
	})

})



// // gallery javascript
// function myFunction(imgs) {
//     var expandImg = document.getElementById("expandedImg");
//     var imgText = document.getElementById("imgtext");
//     expandImg.src = imgs.src;
//     imgText.innerHTML = imgs.alt;
//     expandImg.parentElement.style.display = "block";
// }
//
//
// // end of gallery javascript
//
// // topping and crust Select Initialization
// // Material Select Initialization
//
// // Shoppingcart remove button logic
//
// if (document.readyState == 'loading') {
//     document.addEventListener('DOMComponentLoaded', ready)
// } else {
//     ready()
// }
//
// function ready() {
//
//     var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//     console.log(removeCartItemButtons);
//     for (var i = 0; i < removeCartItemButtons.length; i++) {
//         var button = removeCartItemButtons[i]
//         button.addEventListener('click', removeCartItem)
//     }
//     var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i]
//         input.addEventListener('change', quantityChanged)
//     }
//     var addToCartButtons = document.getElementsByClassName('shop-item-button')
//     for (var i = 0; i < addToCartButtons.length; i++) {
//         var button = addToCartButtons[i]
//         button.addEventListener('click', addToCartClicked)
//     }
// }
//
// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
//
// }
//
//
// function addToCartClicked(event) {
//     var button = event.target
//     var shopItem = button.parentElement.parentElement
//     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//     var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//     var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//     console.log(title, price, imageSrc)
//
//     addItemToCart(title, price, imageSrc)
// }
//
// function addItemToCart(title, price, imageSrc) {
//     var carRow = document.createElement('div')
//     cartRow.innerText = title
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartRowContents = ''
//     cartItems.append(cartRow)
// }
//
// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement('div')
//     carRow.classList.add('cart-row')
//     var cartItems = getElementsByClassName('car-item')[0]
//    var cartRowContents = `  <div class="row cart-row cart-item cart-column">
//        <div class="col-4 ">
//           <img src="$(imageSrc)" alt="Large-sized-pizza" class="img-fluid img-thumbnail shop-item-image">
//          <br>
//        <ol>
//          <li>Large pizza</li>
//        </ol>
//        </div>
//        <div class="col-4">
//          <br><br>
//
//          <span class="cart-price cart-column">$('price')</span><br><br>
//          <button type="button" name="button" class="btn btn-primary shop-item-button">ADD TO CART</button>
//        </div>
//        <div class="col-4">
//          <br><br><br><br>
//          <input type="number" size="4"class="cart-quantity-input" name="cart-quantity-input" value="">
//        <!-- <button class="btn btn-outline-danger my-2 my-sm-0 btn-danger" type="submit">REMOVE</button> -->
//        </div>
//      </div>`
//     cartItems.append(cartRow)
//     cartRow.innerHTML = cartRowContents
// }
//
// function quantityChanged(event) {
//     var input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//
//     updateCartTotal()
// }
//
//
// function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName('cart-item')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//         // cartItemContainer.getElementsByClassName('cart-row')
//     var total = 0
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace('Kshs', ''))
//         console.log(price)
//         var quantity = quantityElement.value
//         console.log(price * quantity)
//         total = total + (price * quantity)
//     }
//     total = Math.round(100+ total * 100)
//     document.getElementsByClassName('cart-total-price')[0].innerText = 'Kshs' + total
// }
//
// function showList(){
//   // document.getElement
// }
