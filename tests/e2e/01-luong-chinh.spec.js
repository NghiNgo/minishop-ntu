
/*
 * BUỔI 5 — PHẦN 1: Tự động hóa ca kiểm thử ưu tiên Cao
 *
 * Chuyển ba ca đã thiết kế ở Buổi 2 thành ca kiểm thử E2E chạy trên trình duyệt thật.
 *
 * Chạy riêng file này:  npx playwright test tests/e2e/01-luong-chinh
 * Xem trình duyệt chạy: npx playwright test tests/e2e/01-luong-chinh --headed
 */
const { test, expect } = require('@playwright/test');
const { datLaiDuLieu } = require('../helpers/dat-lai-du-lieu');

const TK_THUONG = { email: 'sv@ntu.edu.vn', matKhau: 'Matkhau123' };
const TK_VIP = { email: 'vip@ntu.edu.vn', matKhau: 'Matkhau123' };

// Mỗi ca kiểm thử bắt đầu từ dữ liệu sạch: giỏ hàng trống, không tài khoản nào bị khóa.
test.beforeEach(async ({ page, request }) => {
  await datLaiDuLieu(request);
  await page.goto('/');
});

// ---------------------------------------------------------------
// CA MẪU ĐÃ VIẾT SẴN — ca mẫu tham khảo.
// Tương ứng ca BVA của Buổi 2: đăng ký với tuổi dưới giới hạn.
// ---------------------------------------------------------------
test('FR-01.3 — đăng ký với tuổi 17 bị từ chối', async ({ page }) => {
  await page.getByTestId('reg-name').fill('Nguyen Van A');
  await page.getByTestId('reg-email').fill(`e2e-${Date.now()}@ntu.edu.vn`);
  await page.getByTestId('reg-age').fill('17');
  await page.getByTestId('reg-password').fill('Matkhau123');
  await page.getByTestId('btn-register').click();

  await expect(page.getByTestId('reg-msg')).toHaveText(/Tuổi không nằm trong phạm vi/);
});

// ---------------------------------------------------------------
// Đã hoàn thành: FR-02.3 — khóa tài khoản sau 3 lần đăng nhập sai liên tiếp
// ---------------------------------------------------------------
test('FR-02.3 — khóa tài khoản sau 3 lần sai', async ({ page }) => {
  for (let i = 1; i <= 3; i++) {
    await page.getByTestId('login-email').fill(TK_THUONG.email);
    await page.getByTestId('login-password').fill('SaiMatKhau' + i);
    await page.getByTestId('btn-login').click();

    // Chờ thông báo của lần đăng nhập hiện tại trước khi gửi lần tiếp theo.
    await expect(page.getByTestId('login-msg')).toBeVisible();

    if (i < 3) {
      await expect(page.getByTestId('login-msg')).toContainText(
        'Sai email hoặc mật khẩu'
      );
    }
  }

  // Sau lần thứ ba, tài khoản phải bị khóa.
  await expect(page.getByTestId('login-msg')).toContainText(/khóa|khoa/i);
});

// ---------------------------------------------------------------
// Đã hoàn thành: FR-04.3 — VIP được miễn phí vận chuyển ở ngoại thành
// ---------------------------------------------------------------
test('FR-04.3 — VIP miễn phí vận chuyển ở ngoại thành', async ({ page }) => {
  // Đăng nhập tài khoản VIP.
  await page.getByTestId('login-email').fill(TK_VIP.email);
  await page.getByTestId('login-password').fill(TK_VIP.matKhau);
  await page.getByTestId('btn-login').click();

  await expect(page.getByTestId('user-bar')).toBeVisible();

  // Chờ danh sách sản phẩm tải xong.
  const danhSach = page.getByTestId('product-list');
  await expect(danhSach.locator('table')).toBeVisible();

  // Thêm Áo thun NTU (mã 1) vào giỏ.
  await page.getByTestId('qty-1').fill('1');
  await page.getByTestId('add-1').click();

  // Chọn Ngoại thành và tính phí vận chuyển.
  await page.getByTestId('zone').selectOption('ngoai-thanh');
  await page.getByTestId('btn-fee').click();

  await expect(page.getByTestId('fee-msg')).toContainText(/0\s*đ/);
});

// ---------------------------------------------------------------
// Đã hoàn thành: TC-65130195-26 — FR-05.2
// Thành viên thường, đơn 450.000đ, nội thành, phí 20.000đ.
// Tổng thanh toán kỳ vọng: 470.000đ.
// ---------------------------------------------------------------
test('TC-65130195-26 — FR-05.2: đơn 450.000đ nội thành', async ({ page }) => {
  // Đăng nhập tài khoản thành viên thường.
  await page.getByTestId('login-email').fill(TK_THUONG.email);
  await page.getByTestId('login-password').fill(TK_THUONG.matKhau);
  await page.getByTestId('btn-login').click();

  await expect(page.getByTestId('user-bar')).toBeVisible();

  // Chờ danh sách sản phẩm tải xong.
  const danhSach = page.getByTestId('product-list');
  await expect(danhSach.locator('table')).toBeVisible();

  // Áo thun NTU: 150.000đ × 1.
  await page.getByTestId('qty-1').fill('1');
  await page.getByTestId('add-1').click();

  // Sổ tay sinh viên: 50.000đ × 6.
  await page.getByTestId('qty-3').fill('6');
  await page.getByTestId('add-3').click();

  await page.getByTestId('zone').selectOption('noi-thanh');

  // Kiểm tra phí vận chuyển trước khi đặt hàng.
  await page.getByTestId('btn-fee').click();
  await expect(page.getByTestId('fee-msg')).toContainText(/Phí vận chuyển: 20\.000đ/);
  await expect(page.getByTestId('fee-msg')).toContainText(/Tổng: 470\.000đ/);

  // Kiểm tra tổng tiền sau khi đặt hàng.
  await page.getByTestId('btn-order').click();

  await expect(page.getByTestId('fee-msg'))
    .toContainText('Đặt hàng thành công');

  await expect(page.getByTestId('fee-msg'))
    .toContainText(/470\.000\s*đ/);
});
