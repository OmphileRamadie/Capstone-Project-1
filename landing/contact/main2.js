let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "adidas Yung-96 chasm",
    tag: "adidas96",
    price: 1099,
    incart: 0
  },

  {
    name: "Air Jordan 3 SE Grade",
    tag: "AirJordan3",
    price: 2229,
    incart: 0
  },

  {
    name: "Air Jordan 4 Retro Winter",
    tag: "AirJordan4",
    price: 3299,
    incart: 0
  },

  {
    name: "SUICOKE Sandals",
    tag: "KawSandals",
    price: 2499,
    incart: 0
  },

  {
    name: "New Balance 997 Sport",
    tag: "NewBalance",
    price: 2299,
    incart: 0
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart .quantity").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart .quantity").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart .quantity").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }
    cartItems[product.tag].incart += 1;
  } else {
    product.incart = 1;
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);

    alert(product.price + cartCost + " " + "Rands is your current total:)");
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
    alert(product.price + " " + "Rands is your current total:)");
  }
}

function coupon() {
  location.reload();
  coupon1 = document.getElementById("coupon1");
  let cartCost = localStorage.getItem("totalCost");
  if (coupon1.value == "statiic") {
    cartCost = cartCost - 500;
    localStorage.setItem("totalCost", cartCost);
    alert("coupon applied");
  }
  Vat();
}

function deliveryCost() {
  location.reload();
  delivery = document.getElementById("deliveryOptions");
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost);

  if (delivery.value == "Express") {
    cartCost = cartCost + 250;
    localStorage.setItem("totalCost", cartCost);
    alert(
      "You chose the Express delivery option which takes 1 - 3 business days"
    );
  } else if (delivery.value == "Economy") {
    cartCost = cartCost + 150;
    localStorage.setItem("totalCost", cartCost);
    alert(
      "You chose the Economy delivery option which takes 3 - 5 business days"
    );
  } else {
    alert("Please enter a valid delivery option!");
  }
  Vat();
}

function Vat() {
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost);
  let Vat = cartCost * 0.15;
  let cartVat = cartCost + Vat;
  localStorage.setItem("totalVat", cartVat);
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productsContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  let cartVAT = localStorage.getItem("totalVat");
  if (cartItems && productsContainer) {
    productsContainer.innerHTML = "";
    Object.values(cartItems).map(item => {
      productsContainer.innerHTML += `
      <div class = "product">
      <ion-icon name="close-circle-outline"></ion-icon>
      <img src="images/${item.tag}.jpg" style = "width: 50px; height:50px;" >
      <span class = "itemName"> ${item.name}</span>
      <div class = "itemPrice">R${item.price}.00</div>
      <div class = "quantity2">${item.incart}</div>
      <div class = "total2">R${item.incart * item.price}.00</div>
      </div>
     
      `;
    });
    productsContainer.innerHTML += `
    <div class = "basketTotalContainer">
      <h6 class = "basketTotalTitle">
      Basket Total
      </h6>
      <h6 class = "basketTotal"> R${cartCost}.00</h4> <br/>
    </div>
    <div>
    <h6 class = "vatTitle"> Total (incl 15% VAT) </h6>
    <h6 class = "cartVat"> R${cartVAT}</h6>
    </div>
    `;
  }
}

onLoadCartNumbers();
displayCart();

let q = document.getElementById("input7").value;
console.log(q);

$(document).ready(function() {
  $("#theHeading").dblclick(function() {
    $(this).hide();
  });
});
