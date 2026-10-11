// Nghiệp vụ tính phí vận chuyển - xem SRS mục FR-04
// Phiên bản 1.1: đã xử lý phản hồi về ngưỡng miễn phí và ưu đãi VIP.
const FEES = {
  'noi-thanh': 20000,
  'ngoai-thanh': 35000,
};

const FREE_SHIPPING_THRESHOLD = 500000;

function calcShippingFee({ subtotal, zone, customerType } = {}) {
  if (!Object.prototype.hasOwnProperty.call(FEES, zone)) {
    throw new Error('Khu vực giao hàng không hợp lệ');
  }
  if (typeof subtotal !== 'number' || Number.isNaN(subtotal)) {
    throw new Error('Giá trị đơn hàng không hợp lệ');
  }
  if (customerType === 'VIP') {
    return 0;
  }
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return FEES[zone];
}

module.exports = { calcShippingFee, FEES, FREE_SHIPPING_THRESHOLD };
