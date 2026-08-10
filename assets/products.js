const products = [
  { id: 1, name: 'Bomber Jacket', price: 129, category: 'jackets', image: 'assets/images/Ao khoac bomber.jpg', description: 'A sporty bomber jacket with a sleek silhouette that pairs effortlessly with any outfit.' },
  { id: 2, name: 'Kaki Jacket', price: 99, category: 'jackets', image: 'assets/images/Ao khoac kapo.jpg', description: 'A relaxed-fit kaki jacket in durable fabric for everyday wear and easy layering.' },
  { id: 3, name: 'Quilted Jacket', price: 149, category: 'jackets', image: 'assets/images/Ao khoac.jpg', description: 'Lightweight quilted outerwear designed to keep you warm on cool evenings.' },
  { id: 4, name: 'Soft Knit Sweater', price: 79, category: 'sweaters', image: 'assets/images/Ao len.jpg', description: 'A cozy knit sweater with a soft feel that stays warm while keeping your look polished.' },
  { id: 5, name: 'Oversized Shirt', price: 59, category: 'shirts', image: 'assets/images/Ao oversize.jpg', description: 'A modern oversized shirt with a streetwear-inspired cut for a relaxed, contemporary look.' },
  { id: 6, name: 'Men’s Cotton Tee', price: 39, category: 'shirts', image: 'assets/images/Ao thun nam.jpg', description: 'A comfortable stretch cotton tee designed for everyday ease and versatile styling.' },
  { id: 7, name: 'Men’s Sneaker', price: 89, category: 'shoes', image: 'assets/images/giay nam Sneaker.jpg', description: 'A dynamic sneaker with a cushioned sole, perfect for active days and casual outfits.' },
  { id: 8, name: 'Performance Trainer', price: 79, category: 'shoes', image: 'assets/images/Giay the thao.webp', description: 'A lightweight athletic shoe with breathable support built for movement.' },
  { id: 9, name: 'Wondea Baseball Cap', price: 25, category: 'accessories', image: 'assets/images/Mu luoi tra nam WONDEA.jpg', description: 'A stylish baseball cap with a clean fit and comfortable design for everyday wear.' },
  { id: 10, name: 'Force Baseball Cap', price: 25, category: 'accessories', image: 'assets/images/Mu luoi Trai Force.jpg', description: 'A sporty baseball cap in durable material with a bold, athletic edge.' }
];

const cartKey = 'urbanCart';

function loadCart() {
  return JSON.parse(localStorage.getItem(cartKey) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartBadge() {
  const el = document.getElementById('cartCount');
  if (!el) return;
  const cart = loadCart();
  const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  el.textContent = total;
}

function getProductById(id) {
  return products.find(p => p.id === Number(id));
}

function addToCart(productId, qty = 1) {
  const cart = loadCart();
  const existing = cart.find(item => item.id === Number(productId));
  if (existing) {
    existing.quantity = (existing.quantity || 0) + qty;
  } else {
    cart.push({ id: Number(productId), quantity: qty });
  }
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(productId) {
  const updated = loadCart().filter(item => item.id !== Number(productId));
  saveCart(updated);
  updateCartBadge();
}

function clearCart() {
  saveCart([]);
  updateCartBadge();
}

// initialize badge on load
document.addEventListener('DOMContentLoaded', updateCartBadge);