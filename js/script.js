

function updateShopingBag(){
  var shoppingItems = document.getElementById('#row')[0]
  var shoppingBagItems = shoppingItems.getElementByClassName('total-price')
  var total=0
  for (var i = 0; i < shopingBagItems.lenght; i++){
    var summation = shoppingBagItems[i]
    var priceElement = summation.getElementByClassName('total-price')[0]
    var quantityElement = summation.getElementByClassName('.plus-btn')[0]
    var price = parseInt(quantityElement.innerText.replace('Kshs.', ''))
    var quantity = quantityElement.value
    total = (price*quantity)
  }
  total = Math.round(total*100)
  document.getElementById('#Total')[0],innerTex = "Kshs." + total
}
