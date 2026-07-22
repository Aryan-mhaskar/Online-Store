async function loadOrders(){
const response=await fetch(
"http://localhost:5000/api/orders/1"
);
const orders=await response.json();
const container=document.getElementById("orders");
container.innerHTML="";
orders.forEach(order=>{
container.innerHTML+=`
<div class="card">
<h2>Order #${order.id}</h2>
<p>Date :
${new Date(order.order_date).toLocaleDateString()}
</p>
<h3>Total :
₹${order.total_amount}
</h3>
</div>
`;
});
}

loadOrders();