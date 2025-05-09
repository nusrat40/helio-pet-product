const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const qtyDisplay = document.getElementById('qty');
const addToCartBtn = document.getElementById('addToCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');

let quantity = 1;
const unitPrice = 249.00;

function updateQtyDisplay() {
    qtyDisplay.textContent = quantity;
    document.getElementById('price').textContent = `$${(unitPrice * quantity).toFixed(2)}`;
  }
  

increaseBtn.onclick = () => {
  if (quantity < 10) {
    quantity++;
    updateQtyDisplay();
  }
};

decreaseBtn.onclick = () => {
  if (quantity > 1) {
    quantity--;
    updateQtyDisplay();
  }
};

addToCartBtn.onclick = () => {
  const cart = {
    name: 'Helio Pet Device',
    qty: quantity,
    price: unitPrice,
    total: quantity * unitPrice
  };
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  cartDrawer.classList.add('open');
};

function closeCart() {
  cartDrawer.classList.remove('open');
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) return;

  cartItems.innerHTML = `
    <div>
      <p><strong>${cart.name}</strong></p>
      <p>$${cart.price} × ${cart.qty}</p>
      <div class="qty-box">
        <button onclick="changeQty(-1)">-</button>
        <span>${cart.qty}</span>
        <button onclick="changeQty(1)">+</button>
        <button onclick="removeCart()" style="margin-left:10px;">🗑️</button>
      </div>
    </div>
  `;
  totalPrice.textContent = `$${cart.total.toFixed(2)}`;
}

function changeQty(delta) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) return;
  cart.qty += delta;
  if (cart.qty < 1) cart.qty = 1;
  if (cart.qty > 10) cart.qty = 10;
  cart.total = cart.qty * cart.price;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  quantity = cart.qty;
  updateQtyDisplay();
}

function removeCart() {
  localStorage.removeItem('cart');
  cartItems.innerHTML = '<p>Your cart is empty.</p>';
  totalPrice.textContent = '$0.00';
}

window.onload = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      quantity = cart.qty;
      updateQtyDisplay(); 
      renderCart();      
    }
  };
