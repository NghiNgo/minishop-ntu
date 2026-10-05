/*
 * BUỔI 3 - PHẦN 3: Bổ sung ca kiểm thử để đạt bao phủ nhánh
 *
 * Mục tiêu: 100% bao phủ nhánh cho hai file
 *   - src/services/shipping.js
 *   - src/services/cart.js
 *
 * Xem phần chưa phủ:  npm run coverage   rồi mở coverage/lcov-report/index.html
 */
const { calcShippingFee } = require('../../src/services/shipping');
const cart = require('../../src/services/cart');

describe('calcShippingFee - các nhánh ngoại lệ', () => {
  // Ví dụ mẫu: một nhánh ném lỗi đã được viết sẵn.
  test('khu vực không hợp lệ thì ném lỗi', () => {
    expect(() => calcShippingFee({ subtotal: 100000, zone: 'tinh-khac', customerType: 'THUONG' }))
      .toThrow('Khu vực giao hàng không hợp lệ');
  });

  // TODO (3): bổ sung các ca cho những nhánh còn lại của calcShippingFee.
  //   Gợi ý: đọc mã nguồn, mỗi câu lệnh if là một nhánh cần phủ cả hai chiều.
});

describe('cart - các nhánh của nghiệp vụ giỏ hàng', () => {
  const EMAIL = 'test-buoi03@ntu.edu.vn';

  beforeEach(() => {
    cart.clearCart(EMAIL); // mỗi ca kiểm thử bắt đầu với giỏ trống
  });

  // Ví dụ mẫu: một ca đã được viết sẵn để tập test này chạy được.
  test('thêm sản phẩm mới vào giỏ', () => {
    const kq = cart.addToCart(EMAIL, 1, 2);
    expect(kq.ok).toBe(true);
    expect(kq.cart.items).toHaveLength(1);
  });

  // TODO (4): viết các ca phủ hết nhánh còn lại của cart.js.
  //   Các hàm cần chạm tới: validateQuantity, cartDetail, addToCart, removeFromCart
  //   Lưu ý: có nhánh chỉ chạy khi thêm sản phẩm KHÔNG tồn tại, và có nhánh chỉ chạy
  //   với một email chưa từng có giỏ hàng.
});
