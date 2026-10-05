/*
 * BUỔI 3 - PHẦN 1: Kiểm thử hướng dữ liệu
 *
 * Nạp trực tiếp bộ ca đã thiết kế ở Buổi 2 (bai-nop/Buoi02-DuLieuKiemThu.csv)
 * và chạy chúng trên các hàm nghiệp vụ của MiniShop.
 *
 * Chạy riêng file này:  npx jest tests/unit/du-lieu-csv
 */
const { docDuLieuKiemThu } = require('../helpers/doc-csv');
const { validateRegistration } = require('../../src/services/registration');
const { validateQuantity } = require('../../src/services/cart');
const { calcShippingFee } = require('../../src/services/shipping');

describe('validateRegistration - dữ liệu từ Buoi02-DuLieuKiemThu.csv', () => {
  const duLieu = docDuLieuKiemThu('validateRegistration');

  test.each(duLieu)('$maCa: $ketQuaKyVong', ({ thamSo, ketQuaKyVong }) => {
    // Hàm trả về MẢNG thông báo lỗi: mảng rỗng nghĩa là dữ liệu hợp lệ.
    const loi = validateRegistration(thamSo);
    const thucTe = loi.length === 0 ? 'HOP_LE' : 'KHONG_HOP_LE';
    expect(thucTe).toBe(ketQuaKyVong);
  });
});

describe('validateQuantity - dữ liệu từ Buoi02-DuLieuKiemThu.csv', () => {
  const duLieu = docDuLieuKiemThu('validateQuantity');

  // TODO (1): viết test.each tương tự khối ở trên.
  //   - validateQuantity nhận MỘT tham số là số lượng: validateQuantity(thamSo.qty)
  //   - Hàm trả về true/false, cần quy đổi sang 'HOP_LE' / 'KHONG_HOP_LE' trước khi so sánh.
  test('TODO: thay khối này bằng test.each cho validateQuantity', () => {
    expect(duLieu.length).toBeGreaterThan(0);
  });
});

describe('calcShippingFee - dữ liệu từ Buoi02-DuLieuKiemThu.csv', () => {
  const duLieu = docDuLieuKiemThu('calcShippingFee');

  // TODO (2): viết test.each cho calcShippingFee.
  //   - Hàm nhận MỘT đối tượng: calcShippingFee(thamSo)
  //   - Kết quả mong đợi trong CSV là chuỗi, phải đổi sang số: Number(ketQuaKyVong)
  test('TODO: thay khối này bằng test.each cho calcShippingFee', () => {
    expect(duLieu.length).toBeGreaterThan(0);
  });
});
