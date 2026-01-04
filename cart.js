/* =====  CART KEY  ===== */
const cartKey = 'tokenTnCart';
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

/* =====  CORE  ===== */
function saveCart() { localStorage.setItem(cartKey, JSON.stringify(cart)); }

function addToCart(id, name, price, qty = 1) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, name, price, qty });
  saveCart();
  renderCart();
  document.getElementById('cartCount').textContent = cart.length;
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
  document.getElementById('cartCount').textContent = cart.length;
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  document.getElementById('cartCount').textContent = 0;
}

function renderCart() {
  const panel = document.getElementById('cartPanel');
  const list  = document.getElementById('cartList');
  const total = document.getElementById('cartTotal');
  if (!list) return;

  list.innerHTML = '';
  let sum = 0;
  cart.forEach(p => {
    sum += p.price * p.qty;
    list.innerHTML += `
      <div class="cart-item">
        <span>${p.name} ×${p.qty}</span>
        <span>${(p.price * p.qty).toFixed(3)} DT</span>
        <button onclick="removeFromCart(${p.id})">✖</button>
      </div>`;
  });
  total.textContent = sum.toFixed(3);
  panel.classList.toggle('empty', cart.length === 0);
  document.getElementById('cartCount').textContent = cart.length;
}

function checkout() {
  if (!cart.length) return;
  let msg = 'Bonjour, voici mon panier Token_Tn :\n';
  let tot = 0;
  cart.forEach(p => {
    msg += `• ${p.qty} × ${p.name}  =  ${(p.price * p.qty).toFixed(3)} DT\n`;
    tot += p.price * p.qty;
  });
  msg += `\nTotal : ${tot.toFixed(3)} DT\n`;
  msg += `Moyen de paiement : (recharge WhatsApp / D17 / Flouci)`;
  window.open(`https://wa.me/21620128520?text=${encodeURIComponent(msg)}`, '_blank');
}

/* =====  PANEL HTML  ===== */
const cartPanelHTML = `
<div id="cartPanel" class="cart-panel">
  <div class="cart-header">
    <h3>Mon Panier</h3>
    <button id="closeCartBtn">✖</button>
  </div>
  <div id="cartList" class="cart-list"></div>
  <div class="cart-footer">
    <div>Total : <span id="cartTotal">0.000</span> DT</div>
    <button class="btn" onclick="checkout()">Commander</button>
  </div>
</div>`;

/* =====  OPEN / CLOSE  ===== */
function openCart()  { document.getElementById('cartPanel').classList.add('open'); }
function closeCart() { document.getElementById('cartPanel').classList.remove('open'); }

/* =====  INIT  ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', cartPanelHTML);
  document.querySelector('.cart-icon').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);
  renderCart();
});