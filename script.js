// ------- Product Data -------
const products = [
  { id: 1, name: "Classic Sleek Ponytail", price: 50, img: "images/ponytail1.jpg" },
  { id: 2, name: "Curly Volume Ponytail", price: 65, img: "images/ponytail2.jpg" },
  { id: 3, name: "Kinky Afro Ponytail", price: 55, img: "images/ponytail3.jpg" },
  { id: 4, name: "Wavy Blend Ponytail", price: 60, img: "images/ponytail4.jpg" }
];

const grid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Load products
function loadProducts() {
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}
loadProducts();

// Add to cart
function addToCart(id) {
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// ------- Sign-Up -------
document.getElementById("signupForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  localStorage.setItem("newsletterEmail", email);
  document.getElementById("signupMsg").textContent = "Thanks for signing up!";
});

// ------- Theme Customization -------
const themeColorInput = document.getElementById("themeColor");
const fontSizeInput = document.getElementById("fontSize");

// Load saved preferences
if(localStorage.getItem("accent")) {
/* script.js: Ponytail Atelier
   Frontend behaviors: product list, modal, cart, hero slides, customization,
   demo checkout (calls backend endpoints), chat demo.
*/

// ----- DATA: replace images with your own in images/ folder -----
const PRODUCTS = [
  { id: 1, title: "Classic Sleek Ponytail", price: 45.00, img: "images/ponytail1.jpg", desc: "Smooth, sleek finish. Light brown tone."},
  { id: 2, title: "Wavy Luxe Ponytail", price: 60.00, img: "images/ponytail2.jpg", desc: "Soft waves for volume."},
  { id: 3, title: "Curly Volume Ponytail", price: 55.00, img: "images/ponytail3.jpg", desc: "Bouncy curls, natural look."},
  { id: 4, title: "Kinky Natural Ponytail", price: 50.00, img: "images/ponytail4.jpg", desc: "Tight texture, matte finish."},
  { id: 5, title: "Silky Blend Ponytail", price: 75.00, img: "images/ponytail5.jpg", desc: "Premium blend for longevity."}
];

// ----- Cached DOM -----
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const checkoutPaystack = document.getElementById('checkoutPaystack');
const checkoutStripe = document.getElementById('checkoutStripe');

const customizeToggle = document.getElementById('customizeToggle');
const customPanel = document.getElementById('customPanel');
const themeColorInput = document.getElementById('themeColor');
const fontSizeInput = document.getElementById('fontSize');
const layoutSelect = document.getElementById('layoutSelect');
const resetTheme = document.getElementById('resetTheme');
const reduceMotion = document.getElementById('reduceMotion');

const signupForm = document.getElementById('signupForm');
const signupMsg = document.getElementById('signupMsg');

const chatForm = document.getElementById('chatForm');
const chatLog = document.getElementById('chatLog');

const productModal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalQty = document.getElementById('modalQty');
const modalAdd = document.getElementById('modalAdd');
const modalClose = document.getElementById('modalClose');

const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

const heroSlides = document.getElementById('heroSlides');

// ----- state -----
let cart = JSON.parse(localStorage.getItem('pa_cart') || '[]');
let prefs = JSON.parse(localStorage.getItem('pa_prefs') || '{}');
let currentModalProduct = null;

// ----- init -----
function init() {
  loadPrefs();
  renderProducts(PRODUCTS);
  updateCartUI();
  initHero();
  populateFloatingPreviews();
  bindEvents();
  document.getElementById('year').textContent = new Date().getFullYear();
}
init();

// ----- render products -----
function renderProducts(list) {
  productGrid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="product-thumb" data-id="${p.id}">
        <img src="${p.img}" alt="${p.title}">
      </div>
      <div class="card-body">
        <div>
          <div class="product-title">${p.title}</div>
          <div class="muted small">${p.desc}</div>
        </div>
        <div style="text-align:right">
          <div class="product-price">$${p.price.toFixed(2)}</div>
          <button class="btn add-btn" data-id="${p.id}" aria-label="Add ${p.title} to cart">Add</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
  document.querySelectorAll('.product-thumb').forEach(el => addTilt(el));
  document.querySelectorAll('.product-thumb').forEach(el => el.addEventListener('click', onThumbClick));
  document.querySelectorAll('.add-btn').forEach(b => b.addEventListener('click', e => {
    const id = Number(e.currentTarget.dataset.id);
    addToCart(id, 1, true);
  }));
}

// ----- product modal -----
function onThumbClick(e){
  const id = Number(e.currentTarget.dataset.id);
  const p = PRODUCTS.find(x => x.id === id);
  openModal(p);
}
function openModal(product){
  currentModalProduct = product;
  modalImage.src = product.img;
  modalTitle.textContent = product.title;
  modalDesc.textContent = product.desc;
  modalPrice.textContent = `$${product.price.toFixed(2)}`;
  modalQty.value = 1;
  productModal.style.display = 'flex';
  productModal.setAttribute('aria-hidden','false');
}
modalClose.addEventListener('click', closeModal);
productModal.addEventListener('click', (e)=> {
  if(e.target === productModal) closeModal();
});
function closeModal(){
  productModal.style.display = 'none';
  productModal.setAttribute('aria-hidden','true');
}
modalAdd.addEventListener('click', ()=>{
  const qty = Number(modalQty.value) || 1;
  if(currentModalProduct) addToCart(currentModalProduct.id, qty, true);
  closeModal();
});

// ----- tilt effect for product thumbs -----
function addTilt(el){
  const img = el.querySelector('img');
  if (!img) return;
  el.addEventListener('pointermove', (ev) => {
    if (reduceMotion.checked || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width;
    const py = (ev.clientY - r.top) / r.height;
    const rx = (py - 0.5) * 8;
    const ry = (px - 0.5) * -8;
    img.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  });
  el.addEventListener('pointerleave', () => {
    img.style.transform = '';
  });
}

// ----- cart functions -----
function addToCart(id, qty = 1, animate = false){
  const product = PRODUCTS.find(p => p.id === id);
  if(!product) return;
  // If same product exists, increase qty (simple)
  const existing = cart.find(c => c.id === id);
  if(existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart();
  updateCartUI();
  if (animate) flyToCart(product);
}
function removeFromCart(index){
  cart.splice(index,1);
  saveCart();
  updateCartUI();
}
function saveCart(){
  localStorage.setItem('pa_cart', JSON.stringify(cart));
}
function updateCartUI(){
  cartCount.textContent = cart.reduce((s,i)=> s + i.qty, 0);
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    total += p.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div style="flex:1">
        <div style="font-weight:700">${p.title}</div>
        <div class="muted small">$${p.price.toFixed(2)} x ${item.qty}</div>
      </div>
      <div style="text-align:right">
        <button class="btn small remove" data-idx="${idx}">Remove</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  cartItemsEl.querySelectorAll('.remove').forEach(b => b.addEventListener('click', e => {
    const idx = Number(e.currentTarget.dataset.idx);
    removeFromCart(idx);
  }));
}

// fly-to-cart animation
function flyToCart(product){
  try {
    const thumb = document.querySelector(`.product-thumb img[src="${product.img}"]`);
    if(!thumb) return;
    const rect = thumb.getBoundingClientRect();
    const clone = thumb.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.transition = 'all .8s cubic-bezier(.2,.9,.3,1)';
    clone.style.zIndex = 120;
    document.body.appendChild(clone);
    const cartRect = cartBtn.getBoundingClientRect();
    requestAnimationFrame(() => {
      clone.style.left = (cartRect.left + 10) + 'px';
      clone.style.top = (cartRect.top + 10) + 'px';
      clone.style.width = '36px';
      clone.style.height = '36px';
      clone.style.opacity = '0.6';
      clone.style.transform = 'rotate(20deg)';
    });
    setTimeout(()=> clone.remove(), 900);
  } catch(e){ /* ignore */ }
}

// ----- hero slides -----
function initHero(){
  const heroImages = [
    { img: 'images/hero-1.jpg' },
    { img: 'images/hero-2.jpg' },
    { img: 'images/hero-3.jpg' }
  ];
  heroImages.forEach(s => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02)), url(${s.img})`;
    heroSlides.appendChild(div);
  });
  let index = 0;
  function show(idx){ heroSlides.style.transform = `translateX(-${idx * 100}%)`; }
  show(0);
  setInterval(()=> { index = (index + 1) % heroImages.length; if (!reduceMotion.checked) show(index); }, 5000);
}

// ----- floating previews error handling -----
function populateFloatingPreviews(){
  document.querySelectorAll('.floating-previews img').forEach(img => {
    img.addEventListener('error', ()=> img.style.display = 'none');
  });
}

// ----- prefs -----
function loadPrefs(){
  if(prefs.accent) document.documentElement.style.setProperty('--accent', prefs.accent);
  if(prefs.fontSize) document.documentElement.style.setProperty('--font-size', prefs.fontSize + 'px');
  if(prefs.layout) document.documentElement.classList.toggle('list', prefs.layout === 'list');
  themeColorInput.value = prefs.accent || '#b98a6b';
  fontSizeInput.value = prefs.fontSize || 16;
  layoutSelect.value = prefs.layout || 'grid';
  reduceMotion.checked = prefs.reduceMotion || false;
}
function savePrefs(){
  prefs.accent = themeColorInput.value;
  prefs.fontSize = Number(fontSizeInput.value);
  prefs.layout = layoutSelect.value;
  prefs.reduceMotion = reduceMotion.checked;
  localStorage.setItem('pa_prefs', JSON.stringify(prefs));
  loadPrefs();
}

// ----- events -----
function bindEvents(){
  customizeToggle.addEventListener('click', ()=> {
    const open = customPanel.getAttribute('aria-hidden') === 'true';
    customPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    customPanel.style.display = open ? 'block' : 'none';
  });
  themeColorInput.addEventListener('input', savePrefs);
  fontSizeInput.addEventListener('input', savePrefs);
  layoutSelect.addEventListener('change', ()=> {
    document.documentElement.classList.toggle('list', layoutSelect.value === 'list');
    savePrefs();
  });
  reduceMotion.addEventListener('change', savePrefs);
  resetTheme.addEventListener('click', ()=> {
    localStorage.removeItem('pa_prefs');
    prefs = {};
    loadPrefs();
  });

  cartBtn.addEventListener('click', ()=> {
    cartDrawer.classList.toggle('open');
    cartDrawer.setAttribute('aria-hidden', cartDrawer.classList.contains('open') ? 'false' : 'true');
  });
  closeCart.addEventListener('click', ()=> cartDrawer.classList.remove('open'));

  // checkout buttons: these call demo backend endpoints
  checkoutPaystack.addEventListener('click', async ()=> {
    if(cart.length === 0) return alert('Your cart is empty');
    // prepare minimal payload
    const items = cart.map(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return { id: p.id, title: p.title, price: p.price, qty: i.qty };
    });
    try {
      // UPDATE this URL to your running server if needed
      const resp = await fetch('/paystack/init', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ items, email: localStorage.getItem('pa_newsletter') || '' })
      });
      const data = await resp.json();
      if(data.authorization_url) {
        // redirect user to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        alert('Paystack init failed. See console for details.');
        console.log('paystack init:', data);
      }
    } catch(err){ console.error(err); alert('Error initiating Paystack checkout'); }
  });

  checkoutStripe.addEventListener('click', async ()=> {
    if(cart.length === 0) return alert('Your cart is empty');
    const items = cart.map(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return { id: p.id, title: p.title, price: p.price, qty: i.qty };
    });
    try {
      // UPDATE this URL to your running server if needed
      const resp = await fetch('/stripe/create-checkout-session', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ items, successUrl: window.location.href, cancelUrl: window.location.href })
      });
      const data = await resp.json();
      if(data.sessionId){
        // redirect to Stripe Checkout
        const stripePublicKey = data.publicKey || null;
        if(!stripePublicKey) {
          // fallback: backend may return a hosted URL (redirectUrl)
          if(data.url) { window.location.href = data.url; return; }
          alert('Missing Stripe public key from server.');
          return;
        }
        // load Stripe JS dynamically and redirect
        const script = document.createElement('script');
        script.src = "https://js.stripe.com/v3/";
        script.onload = async () => {
          const stripe = Stripe(stripePublicKey);
          const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
          if(error) console.error(error);
        };
        document.head.appendChild(script);
      } else {
        alert('Stripe session creation failed; check server logs.');
        console.log('stripe create:', data);
      }
    } catch(err){ console.error(err); alert('Error initiating Stripe checkout'); }
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    localStorage.setItem('pa_newsletter', email);
    signupMsg.textContent = `Thanks — we’ll ping ${email} when new stock drops.`;
    signupForm.reset();
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    if(!input.value.trim()) return;
    postChat('you', input.value.trim());
    input.value = '';
    setTimeout(()=> postChat('staff', 'Thanks! We received your message and will reply shortly.'), 900);
  });

  document.getElementById('customizeToggle').addEventListener('keyup', (e)=> { if(e.key === 'Enter') customizeToggle.click(); });
}

// ----- chat -----
function postChat(who, text){
  const div = document.createElement('div');
  div.className = 'chat-message ' + (who === 'you' ? 'you' : 'staff');
  div.textContent = (who === 'you' ? 'You: ' : 'Staff: ') + text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// ----- search & sort -----
searchInput && searchInput.addEventListener('input', ()=> {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  renderProducts(filtered);
});
sortSelect && sortSelect.addEventListener('change', ()=> {
  let sorted = [...PRODUCTS];
  if(sortSelect.value === 'price-asc') sorted.sort((a,b)=>a.price-b.price);
  if(sortSelect.value === 'price-desc') sorted.sort((a,b)=>b.price-a.price);
  renderProducts(sorted);
});
