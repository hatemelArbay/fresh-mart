import { updateCartCounter } from "../js/header.js";

const APIKEY="sb_publishable_qGhgO-t2H-KT3jl0nS_whA_hJ7ipiPP"
const baseUrl="https://fvaelbyhfeohqtrocnpu.supabase.co/rest/v1"
const headers={
    apikey:APIKEY,
    Authorization:`Bearer ${APIKEY}` ,
    "Content-Type":"application/json"
}

document.addEventListener("DOMContentLoaded", () => {
  displayVegProdcutLim3();
  displayFruitsProductsLim3();
      updateCartCounter()

});


async function fetchProducts(limit){
    try {
    let url = `${baseUrl}/product`;

    if (limit !== undefined) {
      url += `?limit=${limit}&offset=0`;
    }
    let products = await fetch(`${url}`,{
        headers
    })
     let prodRes = await products.json();
     return prodRes;
    
    }catch(err){
        console.log("Error in fetching products" +err)
    }
}


async function displayVegProdcutLim3(){
    let products = await fetchProducts(3)
    console.log(products)
    let vegproducts = products.filter(prod=>prod.category=="vegetables")
    console.log(vegproducts)
    let productSection =document.getElementById("vegProducts")
    
    for (let prod of vegproducts){
        productSection.innerHTML+=`
       <article class="productCard">
       <a href="/pages/productDetails.html?id=${prod.id}">
        <div class="productImageWrap">
        <span id="prodId" style="display:none
        ">${prod.id}</span>
          <img class="productImage" src=${prod.img} alt=${prod.name}>
        </div>

        <div class="productInfo">
          <h4 class="productName">${prod.name}</h4>

          <div class="productPrices">
          ${
            prod.discPrice
              ? `
                <span class="oldPrice">$${prod.price}</span>
                <span class="newPrice">$${prod.discPrice}</span>
              `
              : `
                <span class="newPrice">$${prod.price}</span>
              `
          }
        </div>
          <button class="addToCartBtn" type="button">
            View Product
          </button>
        </div>
        </a>
      </article>       
        `
    }




}

async function displayFruitsProductsLim3(){
    let products = await fetchProducts()
    console.log(products)
let fruitsProducts = products
  .filter(prod => prod.category === "fruits")
  .slice(0, 3);
      console.log("fruits")
    console.log(fruitsProducts)
    let productSection =document.getElementById("fruitsProducts")
    
    for (let prod of fruitsProducts){
        productSection.innerHTML+=`
       <article class="productCard">
       <a href="/pages/productDetails.html?id=${prod.id}">
        <div class="productImageWrap">
        <span id="prodId" style="display:none
        ">${prod.id}</span>
          <img class="productImage" src=${prod.img} alt=${prod.name}>
        </div>

        <div class="productInfo">
          <h4 class="productName">${prod.name}</h4>

          <div class="productPrices">
          ${
            prod.discPrice
              ? `
                <span class="oldPrice">$${prod.price}</span>
                <span class="newPrice">$${prod.discPrice}</span>
              `
              : `
                <span class="newPrice">$${prod.price}</span>
              `
          }
        </div>
          <button class="addToCartBtn" type="button">
            View products
          </button>
        </div>
        </a>
      </article>       
        `
    }




}



