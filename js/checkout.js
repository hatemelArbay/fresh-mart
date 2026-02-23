import { updateCartCounter } from "../js/header.js";


const APIKEY="sb_publishable_qGhgO-t2H-KT3jl0nS_whA_hJ7ipiPP"
const baseUrl="https://fvaelbyhfeohqtrocnpu.supabase.co/rest/v1"
const headers={
    apikey:APIKEY,
    Authorization:`Bearer ${APIKEY}` ,
    "Content-Type":"application/json"
}


async function postCheckout(user,products) {
  try {

    let existingUser = await fetch(`${baseUrl}/user?email=eq.${user.email}`,{headers})
    let userRes = await existingUser.json();
    let userId=0;
      if (userRes.length !== 0) {
        userId = userRes[0].id;
      }else {
      userId=user.id
      let res = await fetch(`${baseUrl}/user`, {
      method: "POST",
      headers,
      body: JSON.stringify(user)
    });
    let newUser = await fetch(`${baseUrl}/user?email=eq.${user.email}`,{headers})
      let newUserRes = await newUser.json();
      userId = newUserRes[0].id;
      
    }
    for (let prod of products){
      prod.userId=userId
    }
    console.log(products)
        
    let checkoutRes=await fetch(`${baseUrl}/checkout`,{
          method: "POST",
          headers,
          body: JSON.stringify(products)
    })

    let response = checkoutRes
    console.log(response)
if (checkoutRes.status === 201) {
  localStorage.setItem("cart", JSON.stringify([]));
  updateCartCounter();

  const form = document.querySelector(".billingForm");
  form.reset();


  const successModal = document.getElementById("checkoutSuccessModal");
  if (successModal) {
    const modal = new bootstrap.Modal(successModal);
    modal.show();
    getCheckoutData()
  }
}


  } catch (err) {
    console.error("Checkout user error:", err);
  }
}


document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter()
getCheckoutData()
});


let checkoutButton = document.querySelector(".checkoutButton");
checkoutButton.addEventListener("click",()=>{
checkout();
})
async function checkout(){
  const errorBox = document.getElementById("formErrors");

  let firstName = document.getElementById("firstName").value.trim();
  let lastName= document.getElementById("lastName").value.trim();
  let email= document.getElementById("email").value.trim();
  let phone= document.getElementById("phoneNum").value.trim();
  let address=document.getElementById("address").value.trim();
  let city= document.getElementById("city").value;

  const egyptPhoneRegex = /^01\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errors = [];
  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!emailRegex.test(email)) errors.push("Please enter a valid email.");
  if (!egyptPhoneRegex.test(phone))
    errors.push("Phone must be a valid Egyptian number (11 digits).");
  if(!address)
    errors.push("Please enter the address.");

  if (!city)
     errors.push("Please select a city.");

  if (errors.length > 0) {
    errorBox.innerHTML =
      "<ul>" + errors.map(err => `<li>${err}</li>`).join("") + "</ul>";
    errorBox.style.display = "block";
    return;
  }

  let user = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    phone:phone,
    address:address,
    city:city
  }
  let cart=JSON.parse(localStorage.getItem("cart"))

let mappedProducts = cart.map(item => ({
  productId: item.id,
  name: item.name,
  price: item.price ,
  quantity: item.qty
}));


postCheckout(user,mappedProducts);

  

  errorBox.style.display = "none";


}


function getCheckoutData(){
let products=JSON.parse(localStorage.getItem("cart"))
let checkout=document.getElementById("summary")
checkout.innerHTML=''
for (let prod of products){

    checkout.innerHTML+=`
      <div class="productLine">
        <div>
          <div class="productName">${prod.name} x${prod.qty}</div>
      
        </div>
        <div class="productPrice">$ ${prod.price * prod.qty}</div>
      </div>
    `

}
let total=0
if (products.length>0){
   total = products.reduce((sum, prod) => {
  return sum + (prod.qty * prod.price);
}, 0);

}



 document.querySelector(".totalNumber").innerHTML=`$ ${total}`



}
