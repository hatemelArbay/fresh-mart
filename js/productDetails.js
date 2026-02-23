import { updateCartCounter } from "../js/header.js";

const APIKEY="sb_publishable_qGhgO-t2H-KT3jl0nS_whA_hJ7ipiPP"
const baseUrl="https://fvaelbyhfeohqtrocnpu.supabase.co/rest/v1"
const headers={
    apikey:APIKEY,
    Authorization:`Bearer ${APIKEY}` ,
    "Content-Type":"application/json"
}
document.addEventListener("DOMContentLoaded", () => {
  displayProductDetails();
    updateCartCounter();
});


async function fetchProdDetails(id){
    let prod=await fetch(`${baseUrl}/product?id=eq.${id}`,{headers})
    let prodRes=await prod.json()
    console.log(prodRes[0])
    return prodRes[0]
}

async function displayProductDetails(){
    const id = new URLSearchParams(location.search).get("id");
    let product = await fetchProdDetails(id)
    let proDetailsSection=document.querySelector(".productDetailsCard")
      if (!proDetailsSection) {
    console.log("productDetailsCard not found");
    return;
  }
    console.log(proDetailsSection)
    proDetailsSection.innerHTML=`
    
      <div class="detailsImageBox">
        <img id="prodImg" src="${product.img}" alt="${product.name}">
      </div>

      <div class="detailsInfo">

        <h1 class="detailsTitle">Fresh Red Tomatos</h1>

        <p class="detailsDesc">
          Fresh and juicy tomatoes picked daily. Perfect for salads, cooking, and healthy meals.
        </p>

        <div class="detailsMeta">
          <span class="metaPill">${product.category}</span>
          <span class="metaPill">In stock: ${product.quantity}</span>
        </div>

        <div class="detailsPrices">
          ${
            product.discPrice
              ? `
                <span class="oldPrice">$${product.price}</span>
                <span class="newPrice">$${product.discPrice}</span>
              `
              : `
                <span class="newPrice">$${product.price}</span>
              `
          }
        </div>

        <div class="detailsActions">

        <div class="qtyControl">
          <button class="qtyBtn minus" type="button">-</button>
          <input class="qtyInput" type="text" value="1" readonly>
          <button class="qtyBtn plus"  type="button">+</button>
        </div>

          <button class="primaryActionBtn" id="addToCart" type="button">
            Add To Cart
          </button>

        </div>

        <div class="detailsExtra">

          <div class="extraRow">
            <span class="extraLabel">Delivery</span>
            <span class="extraValue">Same-day delivery available</span>
          </div>

          <div class="extraRow">
            <span class="extraLabel">Return Policy</span>
            <span class="extraValue">Free returns within 24 hours</span>
          </div>

        </div>

      </div>
      `
    
const qtyInput = document.querySelector(".qtyInput");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const addToCartBtn=document.getElementById("addToCart")
addToCartBtn.addEventListener("click",()=>{

    addToCart(product,qtyInput.value)
})





plusBtn.addEventListener("click", () => {
  qtyInput.value = Number(qtyInput.value) + 1;
});

minusBtn.addEventListener("click", () => {
  if (qtyInput.value > 1) {
    qtyInput.value = Number(qtyInput.value) - 1;
  }
});
}

function addToCart(product, qty) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => String(item.id) === String(product.id));

  const price = product.discPrice ? Number(product.discPrice) : Number(product.price);

  if (existing) {
    existing.qty += Number(qty);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      img: product.img,
      price,
      qty: Number(qty),
    });
  }
  console.log(JSON.stringify(cart))
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}


// function updateCartCounter() {
//   const counter = document.querySelector(".cartCounter");

//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const total = cart.reduce((sum, item) => sum + Number(item.qty), 0);
//   counter.textContent = total;
// }