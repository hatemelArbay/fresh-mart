import { updateCartCounter } from "../js/header.js";

const APIKEY="sb_publishable_qGhgO-t2H-KT3jl0nS_whA_hJ7ipiPP"
const baseUrl="https://fvaelbyhfeohqtrocnpu.supabase.co/rest/v1"
const headers={
    apikey:APIKEY,
    Authorization:`Bearer ${APIKEY}` ,
    "Content-Type":"application/json"
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts()
    updateCartCounter()

});

async function fetchProducts(cat){
    try {
    let url = `${baseUrl}/product`;
    let products = await fetch(`${url}`,{
        headers
    })
     let prodRes = await products.json();
     return prodRes;
    
    }catch(err){
        console.log("Error in fetching products" +err)
    }
}

async function displayProducts() {
    const cat = new URLSearchParams(location.search).get("category");

    let prodList = document.getElementById("productList")
    let products=await fetchProducts(cat);
    let discProducts=products.filter((prod)=>prod.discPrice!=null)


    for (let product of discProducts){
        prodList.innerHTML+=`
              <article class="productItem">
        <img src=${product.img} alt=${product.name}>
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
        `

    }

    


    
}

