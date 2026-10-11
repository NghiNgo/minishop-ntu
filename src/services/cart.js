// Nghiệp vụ giỏ hàng - xem SRS mục FR-03
// Phiên bản 1.1: chặn số lượng 0, kiểm tra sản phẩm tồn tại, giới hạn tổng số lượng.
const store = require('../data/store');

const MAX_QTY = 99;
const MAX_TOTAL_QTY = 200;

function validateQuantity(qty) {
  const n = Number(qty);
  return Number.isInteger(n) && n >= 1 && n <= MAX_QTY;
}

function getCart(email) {
  if (!store.carts[email]) {
    store.carts[email] = [];
  }
  return store.carts[email];
}

function cartDetail(email) {
  const items = getCart(email).map((line) => {
    const product = store.findProduct(line.productId);
    const price = product ? product.price : 0;
    return {
      productId: line.productId,
      name: product ? product.name : '(không xác định)',
      price,
      qty: line.qty,
      lineTotal: price * line.qty,
    };
  });
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  return { items, subtotal };
}

function tongSoLuong(email) {
  return getCart(email).reduce((sum, l) => sum + l.qty, 0);
}

function addToCart(email, productId, qty) {
  if (!validateQuantity(qty)) {
    return { ok: false, status: 400, message: 'Số lượng phải là số nguyên từ 1 đến 99' };
  }
  if (!store.findProduct(productId)) {
    return { ok: false, status: 404, message: 'Sản phẩm không tồn tại' };
  }
  if (tongSoLuong(email) + Number(qty) > MAX_TOTAL_QTY) {
    return {
      ok: false,
      status: 400,
      message: `Tổng số lượng sản phẩm trong giỏ không được vượt quá ${MAX_TOTAL_QTY}`,
    };
  }
  const cart = getCart(email);
  const line = cart.find((l) => l.productId === Number(productId));
  if (line) {
    line.qty = Number(qty);
  } else {
    cart.push({ productId: Number(productId), qty: Number(qty) });
  }
  return { ok: true, status: 200, cart: cartDetail(email) };
}

function removeFromCart(email, productId) {
  const cart = getCart(email);
  const index = cart.findIndex((l) => l.productId === Number(productId));
  if (index === -1) {
    return { ok: false, status: 404, message: 'Sản phẩm không có trong giỏ' };
  }
  cart.splice(index, 1);
  return { ok: true, status: 200, cart: cartDetail(email) };
}

function clearCart(email) {
  store.carts[email] = [];
}

module.exports = {
  validateQuantity,
  addToCart,
  removeFromCart,
  cartDetail,
  clearCart,
  tongSoLuong,
  MAX_QTY,
  MAX_TOTAL_QTY,
};
