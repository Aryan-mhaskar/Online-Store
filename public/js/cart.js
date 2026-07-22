async function loadCart() {
    const response = await fetch("http://localhost:5000/api/cart/1");
    const items = await response.json();
    const cart = document.getElementById("cart");
    const summary = document.getElementById("summary");
    cart.innerHTML = "";
    let grandTotal = 0;
    items.forEach(item => {
        grandTotal += Number(item.total);
        cart.innerHTML += `
        <div class="cart-item">
            <img src="/images/${item.image}" width="120">
            <div>
                <h2>${item.name}</h2>
                <h3>₹${item.price}</h3>
                <p>Quantity : ${item.quantity}</p>
                <h3>Total : ₹${item.total}</h3>
                <button onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        </div>
        `;
    });
    summary.innerHTML = `
        <h2>
            Grand Total : ₹${grandTotal}
        </h2>
    `;
}

loadCart();

async function removeItem(id) {
    const confirmDelete = confirm("Remove this item from cart?");
    if (!confirmDelete) return;
    const response = await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
            method: "DELETE"
        }
    );
    const data = await response.json();
    alert(data.message);
    loadCart();
}