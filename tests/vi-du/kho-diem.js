/*
 * Ví dụ minh họa cho Buổi 3 — KHÔNG thuộc hệ thống MiniShop.
 * Mô-đun truy xuất dữ liệu (đóng vai "phụ thuộc" cần thay thế bằng mock khi kiểm thử).
 */
const BANG_DIEM = {
  '64130001': 8.75,
  '64130002': 6.5,
};

function layDiem(mssv) {
  // Trong thực tế hàm này truy vấn cơ sở dữ liệu
  if (!(mssv in BANG_DIEM)) {
    throw new Error('Không tìm thấy sinh viên: ' + mssv);
  }
  return BANG_DIEM[mssv];
}

module.exports = { layDiem };
