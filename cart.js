const cartItemsContainer = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const DELIVERY_FEE = 50;

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      subtotal += item.price * item.qty;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>₱${item.price}.00</p>
          <div class="cart-controls">
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">🗑</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  subtotalEl.textContent = subtotal;
  totalEl.textContent = subtotal + DELIVERY_FEE;
}

// Update quantity
function updateQty(id, change) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.qty += change;
    if (product.qty <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initial render
renderCart();
