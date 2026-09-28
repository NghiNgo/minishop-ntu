#!/usr/bin/env node
/*
 * Kiểm tra tự động bài nộp trên Pull Request (chạy bởi GitHub Actions).
 * Có thể chạy thử trên máy:  NHANH=buoi-01 NHANH_GOC=main node scripts/kiem-tra-nop-bai.js
 *
 * Kiểm tra 3 việc:
 *   1. Tên nhánh đúng quy ước (buoi-XX)
 *   2. Chỉ sửa các file được phép, và đã điền các file bắt buộc
 *   3. Các lệnh kiểm tra (ví dụ ESLint) chạy thành công
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nhanh = process.env.NHANH || execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const nhanhGoc = process.env.NHANH_GOC || 'main';
const quyDinhTatCa = JSON.parse(fs.readFileSync(path.join(__dirname, 'quy-dinh-nop-bai.json'), 'utf8'));
const tomTat = process.env.GITHUB_STEP_SUMMARY;

const ketQua = []; // { muc, dat, chiTiet }

function ghi(muc, dat, chiTiet = '') {
  ketQua.push({ muc, dat, chiTiet });
  console.log(`${dat ? '✅' : '❌'} ${muc}${chiTiet ? '\n   ' + chiTiet.split('\n').join('\n   ') : ''}`);
  if (!dat && process.env.GITHUB_ACTIONS) {
    console.log(`::error::${muc}${chiTiet ? ' – ' + chiTiet.split('\n')[0] : ''}`);
  }
}

function ketThuc() {
  const datHet = ketQua.every((k) => k.dat);
  if (tomTat) {
    const dong = [
      `## Kết quả kiểm tra bài nộp – nhánh \`${nhanh}\``,
      '',
      '| Mục kiểm tra | Kết quả | Ghi chú |',
      '|---|---|---|',
      ...ketQua.map((k) => `| ${k.muc} | ${k.dat ? '✅ Đạt' : '❌ Chưa đạt'} | ${k.chiTiet.replace(/\n/g, '<br>').replace(/\|/g, '\\|')} |`),
      '',
      datHet
        ? '**Bài nộp đã qua kiểm tra tự động.** Giảng viên sẽ chấm nội dung trên Pull Request.'
        : '**Bài nộp chưa đạt.** Sửa các mục ❌, commit và push lại, kiểm tra sẽ tự chạy lại.',
    ];
    fs.appendFileSync(tomTat, dong.join('\n') + '\n');
  }
  process.exit(datHet ? 0 : 1);
}

// 1. Tên nhánh
const quyDinh = quyDinhTatCa[nhanh];
if (!quyDinh) {
  const hopLe = Object.keys(quyDinhTatCa).filter((k) => !k.startsWith('_')).join(', ');
  ghi('Tên nhánh đúng quy ước', false, `Nhánh "${nhanh}" không có trong quy định. Các nhánh hợp lệ: ${hopLe}`);
  ketThuc();
}
ghi('Tên nhánh đúng quy ước', true, quyDinh.moTa);

// 2. File thay đổi
let fileThayDoi = [];
try {
  fileThayDoi = execSync(`git diff --name-only ${nhanhGoc}...HEAD`).toString().split('\n').filter(Boolean);
} catch (err) {
  ghi('Đọc danh sách file thay đổi', false, 'Không so sánh được với nhánh gốc: ' + err.message);
  ketThuc();
}

const duocPhep = (f) => quyDinh.duocSua.some((p) => (p.endsWith('/') ? f.startsWith(p) : f === p));
const saiPhamVi = fileThayDoi.filter((f) => !duocPhep(f));
ghi(
  'Chỉ sửa các file được phép',
  saiPhamVi.length === 0,
  saiPhamVi.length === 0
    ? `${fileThayDoi.length} file thay đổi, đều hợp lệ`
    : `Không được sửa: ${saiPhamVi.join(', ')}. Hoàn tác các file này (git checkout ${nhanhGoc} -- <file>) rồi push lại.`
);

const chuaDien = quyDinh.batBuocDien.filter((f) => !fileThayDoi.includes(f));
ghi(
  'Đã điền đủ các file bắt buộc',
  chuaDien.length === 0,
  chuaDien.length === 0 ? quyDinh.batBuocDien.join(', ') : `Chưa điền: ${chuaDien.join(', ')}`
);

// 3. Lệnh kiểm tra
for (const { ten, lenh } of quyDinh.lenhKiemTra) {
  try {
    execSync(lenh, { stdio: 'pipe' });
    ghi(ten, true, 'Không còn lỗi');
  } catch (err) {
    const out = (err.stdout || '').toString().trim().split('\n').slice(-3).join('\n');
    ghi(ten, false, out || err.message);
  }
}

ketThuc();
