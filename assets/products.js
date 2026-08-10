const products = [
  { id: 1, name: 'Signature Blazer', price: 129, category: 'jackets', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', description: 'Sharp fit with a refined finish. Tailored from premium wool blend.' },
  { id: 2, name: 'Luxury Loafer', price: 89, category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', description: 'Comfort meets elegance. Hand-stitched leather upper.' },
  { id: 3, name: 'Urban Watch', price: 79, category: 'accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80', description: 'Minimal design with bold presence. Swiss movement.' },
  { id: 4, name: 'Classic Chinos', price: 59, category: 'pants', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80', description: 'Versatile chinos with a modern slim cut.' },
  { id: 5, name: 'Quilted Jacket', price: 149, category: 'jackets', image: 'https://images.unsplash.com/photo-1549989476-3f0e8a1d1f56?auto=format&fit=crop&w=800&q=80', description: 'Lightweight quilted jacket for cool evenings.' }
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
