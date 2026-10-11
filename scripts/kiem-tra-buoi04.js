#!/usr/bin/env node
/*
 * Kiểm tra hình thức bài nộp Buổi 4 (chạy trong GitHub Actions khi mở/cập nhật PR).
 *
 * Script KHÔNG yêu cầu mọi ca kiểm thử phải xanh: bản v1.1 vẫn còn lỗi, và việc
 * phát hiện chúng chính là nội dung của buổi học.
 *
 * Chạy thử trên máy:  node scripts/kiem-tra-buoi04.js
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const GOC = path.join(__dirname, '..');
const FILE_MD = ['Buoi04-TestPlan.md', 'Buoi04-XacNhan-HoiQuy.md', 'Buoi04-Exploratory.md'];
const SO_ISSUE_TOI_THIEU = 2;
const SO_DONG_XAC_NHAN = 12;

const loi = [];
const doc = (p) => fs.readFileSync(path.join(GOC, p), 'utf8');
const ton_tai = (p) => fs.existsSync(path.join(GOC, p));

// ---------- 1. Ba báo cáo ----------
for (const f of FILE_MD) {
  const p = 'bai-nop/' + f;
  if (!ton_tai(p)) { loi.push(`Không tìm thấy ${p}`); continue; }
  const nd = doc(p);
  if (nd.includes('CHUA_DIEN')) loi.push(`${p}: chưa điền xong (vẫn còn dòng đánh dấu CHUA_DIEN)`);
  if (!/\*\*MSSV:\*\*\s*\S/.test(nd)) loi.push(`${p}: chưa điền MSSV`);
}

// ---------- 2. Bảng kiểm thử xác nhận ----------
if (ton_tai('bai-nop/Buoi04-XacNhan-HoiQuy.md')) {
  const nd = doc('bai-nop/Buoi04-XacNhan-HoiQuy.md');
  const ketLuan = (nd.match(/ĐÃ SỬA|SỬA CHƯA TRỌN|CHƯA SỬA/g) || []).length;
  // 3 lần xuất hiện trong phần giải thích đầu bảng, phần còn lại là kết luận thực tế
  if (ketLuan < SO_DONG_XAC_NHAN + 3) {
    loi.push(`Bảng kiểm thử xác nhận mới có ${Math.max(0, ketLuan - 3)}/${SO_DONG_XAC_NHAN} dòng có kết luận`);
  }
  const dongFR06 = (nd.match(/^\|\s*[1-9]\s*\|/gm) || []).length;
  if (dongFR06 < 6) loi.push(`Phần kiểm thử FR-06 cần ít nhất 6 ca (hiện nhận diện được ${dongFR06})`);
  if (!/Đạt|Không đạt|Chưa phủ/.test(nd)) loi.push('Ma trận truy vết chưa điền trạng thái');
}

// ---------- 3. Liên kết issue ----------
if (ton_tai('bai-nop/Buoi04-Exploratory.md')) {
  const nd = doc('bai-nop/Buoi04-Exploratory.md');
  const issues = new Set(nd.match(/https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/issues\/\d+/g) || []);
  console.log(`   Số issue được dẫn liên kết: ${issues.size}`);
  if (issues.size < SO_ISSUE_TOI_THIEU) {
    loi.push(`Cần ít nhất ${SO_ISSUE_TOI_THIEU} đường dẫn issue trong Buoi04-Exploratory.md (hiện có ${issues.size})`);
  }
  if (!/Critical|High|Medium|Low/.test(nd)) loi.push('Chưa điền Severity/Priority cho các issue');
  const nhatKy = (nd.match(/^\|\s*\d{1,2}[:h]\d{2}/gm) || []).length;
  if (nhatKy < 4) loi.push(`Nhật ký phiên exploratory cần ít nhất 4 mốc thời gian (hiện có ${nhatKy})`);
}

// ---------- 4. Chạy lại bộ kiểm thử đơn vị ----------
const fileKq = path.join(GOC, 'ket-qua-jest.json');
let jestBin;
try { jestBin = require.resolve('jest/bin/jest'); } catch { jestBin = null; }
if (!jestBin) {
  loi.push('Không tìm thấy Jest. Chạy npm install trước.');
} else {
  spawnSync(process.execPath, [jestBin, '--json', '--outputFile', fileKq], { cwd: GOC, encoding: 'utf8' });
  if (!fs.existsSync(fileKq)) {
    loi.push('Không chạy được Jest');
  } else {
    const kq = JSON.parse(fs.readFileSync(fileKq, 'utf8'));
    fs.unlinkSync(fileKq);
    console.log(`   Bộ kiểm thử đơn vị trên v1.1: ${kq.numTotalTests} ca (${kq.numPassedTests} đạt, ${kq.numFailedTests} thất bại)`);
    if (kq.numTotalTests < 30) loi.push(`Bộ kiểm thử đơn vị chỉ còn ${kq.numTotalTests} ca, ít hơn Buổi 3. Không được xóa ca để báo cáo đẹp hơn`);
    if (kq.numRuntimeErrorTestSuites > 0) loi.push(`${kq.numRuntimeErrorTestSuites} tập test không chạy được`);
  }
}

// ---------- Kết luận ----------
if (loi.length === 0) {
  console.log('Bài nộp Buổi 4 đạt các kiểm tra hình thức.');
  process.exit(0);
}
console.log(`\nCòn ${loi.length} vấn đề cần sửa:`);
loi.forEach((l, i) => {
  console.log(`   ${i + 1}. ${l}`);
  if (process.env.GITHUB_ACTIONS) console.log(`::error::${l}`);
});
process.exit(1);
