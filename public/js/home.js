async function loadProducts(){

const response=await fetch("http://localhost:5000/api/products");
const products=await response.json();
displayProducts(products);
}

function displayProducts(products){
const container=document.getElementById("products");
container.innerHTML="";
products.forEach(product=>{
container.innerHTML+=`
<div class="card">
<img src="/images/${product.image}">
<h2>${product.name}</h2>
<p>${product.description}</p>
<h3>₹${product.price}</h3>
<button onclick="viewProduct(${product.id})">
View Details
</button>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>
</div>
`;
});
}
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}
async function addToCart(productId){
await fetch("http://localhost:5000/api/cart",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
product_id:productId,
quantity:1
})
});
alert("Added To Cart");
}

loadProducts();

const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", async (e) => {
    const search = e.target.value;
    if (search === "") {
        loadProducts();
        return;
    }
    const response = await fetch(
        `http://localhost:5000/api/products/search?search=${search}`
    );
    const products = await response.json();
    displayProducts(products);
});