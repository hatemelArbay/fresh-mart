import { updateCartCounter } from "../js/header.js";

const APIKEY = "sb_publishable_qGhgO-t2H-KT3jl0nS_whA_hJ7ipiPP";
const baseUrl = "https://fvaelbyhfeohqtrocnpu.supabase.co/rest/v1";
const headers = {
  apikey: APIKEY,
  Authorization: `Bearer ${APIKEY}`,
  "Content-Type": "application/json",
};

let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  updateCartCounter();

  const cat = new URLSearchParams(location.search).get("category");
  allProducts = await fetchProducts(cat);
  displayProducts(allProducts);
  search();
});

function search() {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();

    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);
  });
}

async function fetchProducts(cat) {
  try {
    let url = `${baseUrl}/product`;
    if (cat) url += `?category=eq.${cat}`;

    const res = await fetch(url, { headers });
    return await res.json();
  } catch (err) {
    console.log("Error in fetching products " + err);
    return [];
  }
}

function displayProducts(products) {
  const prodList = document.getElementById("productList");
  prodList.innerHTML = ""; 

  for (const product of products) {
    prodList.innerHTML += `
      <article class="productItem">
        <img src="${product.img}" alt="${product.name}">
        <h4 class="productName">${product.name}</h4>

        <div class="priceRow">
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

        <a href="/pages/productDetails.html?id=${product.id}" class="addToCartBtn">
          View Product
        </a>
      </article>
    `;
  }
}