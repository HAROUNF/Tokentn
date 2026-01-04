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

/* =====  INIT  (runs after DOM ready)  ===== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. inject panel
  document.body.insertAdjacentHTML('beforeend', cartPanelHTML);

  // 2. attach listeners
  document.querySelector('.cart-icon').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);

  // 3. first paint
  renderCart();
});

/* =====  OPEN / CLOSE  ===== */
function openCart()  { document.getElementById('cartPanel').classList.add('open'); }
function closeCart() { document.getElementById('cartPanel').classList.remove('open'); }
document.getElementById('cartCount').textContent = cart.length;