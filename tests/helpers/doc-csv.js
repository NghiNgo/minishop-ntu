/*
 * Tiện ích đọc file CSV bài nộp Buổi 2 để dùng làm dữ liệu kiểm thử ở Buổi 3.
 * Sinh viên KHÔNG cần sửa file này.
 *
 * Cách dùng:
 *   const { docDuLieuKiemThu } = require('../helpers/doc-csv');
 *   const duLieu = docDuLieuKiemThu();                      // toàn bộ
 *   const duLieuPhiVC = docDuLieuKiemThu('calcShippingFee'); // lọc theo hàm
 *
 * Mỗi phần tử trả về có dạng:
 *   { maCa: 'TC-64130001-01', ham: 'validateRegistration',
 *     thamSo: { ...đối tượng đã parse... }, ketQuaKyVong: 'KHONG_HOP_LE' }
 */
const fs = require('fs');
const path = require('path');

const DUONG_DAN = path.join(__dirname, '..', '..', 'bai-nop', 'Buoi02-DuLieuKiemThu.csv');

function tachDongCsv(noiDung) {
  const dong = [];
  let o = '';
  let hang = [];
  let trongNhay = false;
  for (let i = 0; i < noiDung.length; i++) {
    const c = noiDung[i];
    if (trongNhay) {
      if (c === '"') {
        if (noiDung[i + 1] === '"') {
          o += '"';
          i++;
        } else {
          trongNhay = false;
        }
      } else o += c;
    } else if (c === '"') trongNhay = true;
    else if (c === ',') {
      hang.push(o);
      o = '';
    } else if (c === '\n') {
      hang.push(o);
      dong.push(hang);
      hang = [];
      o = '';
    } else if (c !== '\r') o += c;
  }
  if (o !== '' || hang.length) {
    hang.push(o);
    dong.push(hang);
  }
  return dong.filter((h) => h.some((x) => x.trim() !== ''));
}

function docDuLieuKiemThu(tenHam) {
  if (!fs.existsSync(DUONG_DAN)) {
    throw new Error(`Không tìm thấy ${DUONG_DAN}. Hãy hoàn thành bài nộp Buổi 2 trước.`);
  }
  let noiDung = fs.readFileSync(DUONG_DAN, 'utf8');
  if (noiDung.charCodeAt(0) === 0xfeff) noiDung = noiDung.slice(1);

  const bang = tachDongCsv(noiDung);
  const dong = bang.slice(1).map((h, i) => {
    const [maCa, ham, thamSo, ketQuaKyVong] = h.map((x) => (x || '').trim());
    let doiTuong;
    try {
      doiTuong = JSON.parse(thamSo);
    } catch {
      throw new Error(`Dòng ${i + 2} của Buoi02-DuLieuKiemThu.csv có ThamSo không phải JSON hợp lệ: ${thamSo}`);
    }
    return { maCa, ham, thamSo: doiTuong, ketQuaKyVong };
  });

  const ketQua = tenHam ? dong.filter((d) => d.ham === tenHam) : dong;
  if (ketQua.length === 0) {
    throw new Error(`Buoi02-DuLieuKiemThu.csv không có dòng nào cho hàm ${tenHam}`);
  }
  return ketQua;
}

module.exports = { docDuLieuKiemThu, DUONG_DAN };
