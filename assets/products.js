const products = [
  { id: 1, name: 'Áo khoác Bomber', price: 129, category: 'jackets', image: 'assets/images/Ao khoac bomber.jpg', description: 'Áo khoác bomber phong cách năng động, dễ phối đồ.' },
  { id: 2, name: 'Áo khoác Kaki', price: 99, category: 'jackets', image: 'assets/images/Ao khoac kapo.jpg', description: 'Áo khoác kaki form rộng, chất liệu bền đẹp.' },
  { id: 3, name: 'Áo khoác chần bông', price: 149, category: 'jackets', image: 'assets/images/Ao khoac.jpg', description: 'Áo khoác chần bông mỏng nhẹ, thích hợp cho buổi tối se lạnh.' },
  { id: 4, name: 'Áo len', price: 79, category: 'sweaters', image: 'assets/images/Ao len.jpg', description: 'Áo len mềm mại, giữ ấm tốt, dễ phối phong cách.' },
  { id: 5, name: 'Áo oversize', price: 59, category: 'shirts', image: 'assets/images/Ao oversize.jpg', description: 'Áo form rộng phong cách đường phố hiện đại.' },
  { id: 6, name: 'Áo thun nam', price: 39, category: 'shirts', image: 'assets/images/Ao thun nam.jpg', description: 'Áo thun cotton co giãn thoải mái, mặc hàng ngày.' },
  { id: 7, name: 'Giày nam Sneaker', price: 89, category: 'shoes', image: 'assets/images/giay nam Sneaker.jpg', description: 'Giày sneaker năng động, đế êm, phù hợp mọi trang phục.' },
  { id: 8, name: 'Giày thể thao', price: 79, category: 'shoes', image: 'assets/images/Giay the thao.webp', description: 'Giày thể thao nhẹ, thoáng khí, thích hợp vận động.' },
  { id: 9, name: 'Mũ lưỡi trai Wondea', price: 25, category: 'accessories', image: 'assets/images/Mu luoi tra nam WONDEA.jpg', description: 'Mũ lưỡi trai thời trang, form chuẩn, dễ đội.' },
  { id: 10, name: 'Mũ lưỡi trai Force', price: 25, category: 'accessories', image: 'assets/images/Mu luoi Trai Force.jpg', description: 'Mũ lưỡi trai phong cách thể thao, chất liệu bền.' }
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