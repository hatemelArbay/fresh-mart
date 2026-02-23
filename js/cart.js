
import { updateCartCounter } from "../js/header.js";

const APIKEY="sb_publishable_qGhgO-t2H-KT3jl0nS_whA_hJ7ipiPP"
const baseUrl="https://fvaelbyhfeohqtrocnpu.supabase.co/rest/v1"
const headers={
    apikey:APIKEY,
    Authorization:`Bearer ${APIKEY}` ,
    "Content-Type":"application/json"
}

document.addEventListener("DOMContentLoaded", () => {
updateCartCounter();
  displayCart();
});

async function displayCart(){
const cart = JSON.parse(localStorage.getItem("cart"))
    let cartBody=document.querySelector(".cartBody")
    console.log(cart)
    console.log(cart.length)
    cartBody.innerHTML="";
    for (let item of cart){
cartBody.innerHTML += `
  <div class="cartRow">
    <div class="cell product">
      <div class="prodWrap">
        <div class="imgBox">
          <img src="${item.img}" alt="${item.name}" />
        </div>
        <div class="prodName">${item.name}</div>
      </div>
    </div>

    <div class="cell price"><strong>${item.price}</strong></div>

    <div class="cell qty">
      <span class="qtyText">${item.qty}</span>
    </div>

    <div class="cell total">
      <strong>${(item.price * item.qty).toFixed(2)}</strong>
    </div>

    <div class="cell action">
      <button 
        class="removeBtn" 
        type="button"
        data-id="${item.id}"
        onclick="removeFromCart(${item.id})"
      >
        ×
      </button>
    </div>
  </div>
`;
    }
}

document.querySelector(".cartBody").addEventListener("click", (e) => {
  const btn = e.target.closest(".removeBtn");
  removeFromCart(btn.dataset.id);
});

document.querySelector("#clearCart").addEventListener("click",()=>{
localStorage.setItem("cart",JSON.stringify([]))
  displayCart();
  updateCartCounter();
});

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => String(item.id) !== String(id));
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCounter();
}
