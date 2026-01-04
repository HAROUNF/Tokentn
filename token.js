/* shared category logic */
function renderCategory(list) {
  const box = document.getElementById('product-list');
  box.innerHTML = '';                       // clear old
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'item';
    if(p.stock === 0) card.classList.add('out');
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="prod-img">
      <h4>${p.name}</h4>
      <p class="price">${p.price.toFixed(3)} DT</p>
      ${p.stock === 0
        ? '<span class="badge">Out of stock</span>'
        : `<label>Quantité :
             <input type="number" min="1" max="${p.stock}" value="1" id="q${p.id}">
           </label>
           <button class="btn" onclick="buy(${p.id},'${p.name}',${p.price})">Add</button>`}
    `;
    box.appendChild(card);
  });
  document.getElementById('cartCount').textContent = cart.length;
}

function buy(id,name,unit){
    const qty = parseInt(document.getElementById('q'+id).value)||1;
    const total = (unit*qty).toFixed(3);
    const msg = `Bonjour, je veux commander :
${qty} x ${name}
Prix total : ${total} DT
Méthode : (recharge WhatsApp +21620128520  /  D17 54070220  /  Flouci 54070220 Haroun Farjallah)`;
    window.open(`https://wa.me/21620128520?text=${encodeURIComponent(msg)}`,'_blank');
}
/* after renderCategory() finishes */
document.getElementById('cartCount').textContent = cart.length;

/* change buy() so it adds to cart instead of WhatsApp */
function buy(id,name,unit){
  const qty = parseInt(document.getElementById('q'+id).value)||1;
  addToCart(id,name,unit,qty);   // ← new line
}