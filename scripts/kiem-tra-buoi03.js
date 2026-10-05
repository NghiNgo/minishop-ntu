#!/usr/bin/env node
/*
 * Kiểm tra hình thức bài nộp Buổi 3 (chạy trong GitHub Actions khi mở/cập nhật PR).
 *
 * LƯU Ý QUAN TRỌNG: script này KHÔNG yêu cầu mọi ca kiểm thử phải xanh.
 * MiniShop có lỗi cài sẵn, nên một số ca thất bại là đúng mong đợi. Việc phân tích
 * nguyên nhân thất bại là nội dung Phần 2 và do giảng viên chấm.
 *
 * Chạy thử trên máy:  node scripts/kiem-tra-buoi03.js
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const GOC = path.join(__dirname, '..');
const FILE_TEST = ['du-lieu-csv.test.js', 'do-phu.test.js', 'auth-mock.test.js'];
const FILE_MD = ['Buoi03-PhanTichKetQua.md', 'Buoi03-DoPhu.md'];
const TOI_THIEU_TEST = 30;
const FILE_PHU_100 = ['src/services/shipping.js', 'src/services/cart.js'];

const loi = [];
const doc = (p) => fs.readFileSync(path.join(GOC, p), 'utf8');
const ton_tai = (p) => fs.existsSync(path.join(GOC, p));

// ---------- 1. Các file bài nộp ----------
for (const f of FILE_TEST) {
  const p = 'tests/unit/' + f;
  if (!ton_tai(p)) { loi.push(`Không tìm thấy ${p}`); continue; }
  const nd = doc(p);
  const soTodo = (nd.match(/TODO \(\d\)/g) || []).length;
  if (soTodo > 0) loi.push(`${p}: còn ${soTodo} mục TODO chưa làm`);
  if (/TODO: thay khối này/.test(nd)) loi.push(`${p}: còn khối mẫu "TODO: thay khối này" chưa được thay`);
}
for (const f of FILE_MD) {
  const p = 'bai-nop/' + f;
  if (!ton_tai(p)) { loi.push(`Không tìm thấy ${p}`); continue; }
  const nd = doc(p);
  if (nd.includes('CHUA_DIEN')) loi.push(`${p}: chưa điền xong (vẫn còn dòng đánh dấu CHUA_DIEN)`);
  if (!/\*\*MSSV:\*\*\s*\S/.test(nd)) loi.push(`${p}: chưa điền MSSV`);
}

// ---------- 2. Kỹ thuật bắt buộc ----------
if (ton_tai('tests/unit/du-lieu-csv.test.js')) {
  const nd = doc('tests/unit/du-lieu-csv.test.js');
  const soEach = (nd.match(/test\.each/g) || []).length;
  if (soEach < 3) loi.push(`tests/unit/du-lieu-csv.test.js: cần dùng test.each cho cả ba hàm (hiện có ${soEach})`);
  if (!/docDuLieuKiemThu/.test(nd)) loi.push('tests/unit/du-lieu-csv.test.js: phải nạp dữ liệu từ Buoi02-DuLieuKiemThu.csv');
}
if (ton_tai('tests/unit/auth-mock.test.js')) {
  const nd = doc('tests/unit/auth-mock.test.js');
  if (!/jest\.mock\(/.test(nd)) loi.push('tests/unit/auth-mock.test.js: phải dùng jest.mock để thay thế kho dữ liệu');
  if (!/mockImplementation|mockReturnValue/.test(nd)) loi.push('tests/unit/auth-mock.test.js: phải điều khiển hành vi của mock');
}

// ---------- 3. Chạy Jest và đo bao phủ ----------
const fileKq = path.join(GOC, 'ket-qua-jest.json');
const jestBin = require.resolve('jest/bin/jest');
const chay = spawnSync(process.execPath, [jestBin, '--coverage', '--json', '--outputFile', fileKq], {
  cwd: GOC, encoding: 'utf8',
});

if (!fs.existsSync(fileKq)) {
  loi.push('Không chạy được Jest. Kết quả stderr: ' + String(chay.stderr || '').split('\n').slice(-5).join(' | '));
} else {
  const kq = JSON.parse(fs.readFileSync(fileKq, 'utf8'));
  fs.unlinkSync(fileKq);
  console.log(`   Jest: ${kq.numTotalTests} ca kiểm thử (${kq.numPassedTests} đạt, ${kq.numFailedTests} thất bại)`);
  if (kq.numTotalTests < TOI_THIEU_TEST) {
    loi.push(`Mới có ${kq.numTotalTests} ca kiểm thử, cần ít nhất ${TOI_THIEU_TEST}`);
  }
  if (kq.numRuntimeErrorTestSuites > 0) {
    loi.push(`${kq.numRuntimeErrorTestSuites} tập test không chạy được (lỗi cú pháp hoặc lỗi nạp dữ liệu)`);
  }

  const fileTomTat = path.join(GOC, 'coverage', 'coverage-summary.json');
  if (!fs.existsSync(fileTomTat)) {
    loi.push('Không tìm thấy coverage/coverage-summary.json');
  } else {
    const tt = JSON.parse(fs.readFileSync(fileTomTat, 'utf8'));
    for (const f of FILE_PHU_100) {
      const khoa = Object.keys(tt).find((k) => k.endsWith(f.replace('src/', 'src' + path.sep).replace(/\//g, path.sep)) || k.endsWith(f));
      if (!khoa) { loi.push(`Không đo được bao phủ cho ${f}`); continue; }
      const pct = tt[khoa].branches.pct;
      console.log(`   Bao phủ nhánh ${f}: ${pct}%`);
      if (pct < 100) loi.push(`${f}: bao phủ nhánh mới đạt ${pct}%, yêu cầu 100%`);
    }
  }
}

// ---------- Kết luận ----------
if (loi.length === 0) {
  console.log('Bài nộp Buổi 3 đạt các kiểm tra hình thức.');
  console.log('   (Các ca kiểm thử thất bại do lỗi cài sẵn của MiniShop không bị tính là lỗi bài nộp.)');
  process.exit(0);
}
console.log(`\nCòn ${loi.length} vấn đề cần sửa:`);
loi.forEach((l, i) => {
  console.log(`   ${i + 1}. ${l}`);
  if (process.env.GITHUB_ACTIONS) console.log(`::error::${l}`);
});
process.exit(1);
