/*
 * Ví dụ minh họa cho Buổi 3 — KHÔNG thuộc hệ thống MiniShop.
 * Quy tắc: điểm là số từ 0 đến 10.
 *   >= 8.5 Giỏi · >= 7.0 Khá · >= 5.0 Trung bình · còn lại Yếu
 */
const khoDiem = require('./kho-diem');

function xepLoai(diem) {
  if (typeof diem !== 'number' || Number.isNaN(diem)) {
    throw new Error('Điểm phải là số');
  }
  if (diem < 0 || diem > 10) {
    throw new Error('Điểm phải nằm trong khoảng 0 đến 10');
  }
  if (diem >= 8.5) return 'Giỏi';
  if (diem >= 7) return 'Khá';
  if (diem >= 5) return 'Trung bình';
  return 'Yếu';
}

// Hàm có phụ thuộc: dùng để minh họa kỹ thuật mock
function xepLoaiTheoMssv(mssv) {
  return xepLoai(khoDiem.layDiem(mssv));
}

module.exports = { xepLoai, xepLoaiTheoMssv };
