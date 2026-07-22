const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadProduct() {
    const response = await fetch(
        `http://localhost:5000/api/products/${id}`
    );
    const product = await response.json();
    document.getElementById("product").innerHTML = `
        <div class="card">
            <img src="/images/${product.image}" width="300">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <h2>₹${product.price}</h2>
            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>
        </div>
    `;
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

loadProduct();