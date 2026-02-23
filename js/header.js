
// import { updateCartCounter } from "../js/header.js";

export function updateCartCounter() {
  const counter = document.querySelector(".cartCounter");
  if (!counter) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + Number(item.qty), 0);

  counter.textContent = total;
}