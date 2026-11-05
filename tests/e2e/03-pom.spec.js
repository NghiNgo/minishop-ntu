/*
 * BUỔI 5 — PHẦN 3: Viết lại ca kiểm thử theo Page Object Model
 */
const { test, expect } = require('@playwright/test');
const { datLaiDuLieu } = require('../helpers/dat-lai-du-lieu');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

const TK_THUONG = {
  email: 'sv@ntu.edu.vn',
  matKhau: 'Matkhau123',
};

const TK_VIP = {
  email: 'vip@ntu.edu.vn',
  matKhau: 'Matkhau123',
};

test.beforeEach(async ({ request }) => {
  await datLaiDuLieu(request);
});

// Ca mẫu: đăng nhập sai mật khẩu bị từ chối.
test('FR-02.2 — đăng nhập sai mật khẩu bị từ chối', async ({ page }) => {
  const trangDangNhap = new LoginPage(page);

  await trangDangNhap.moTrang();
  await trangDangNhap.dangNhap(TK_THUONG.email, 'MatKhauSai');

  await expect(trangDangNhap.thongBao)
    .toHaveText('Sai email hoặc mật khẩu');
});

// FR-04.3: VIP được miễn phí vận chuyển ở ngoại thành.
test('FR-04.3 — VIP miễn phí vận chuyển ở ngoại thành theo POM', async ({ page }) => {
  const trangDangNhap = new LoginPage(page);
  const trangSanPham = new ProductPage(page);
  const trangGio = new CartPage(page);

  // Đăng nhập tài khoản VIP.
  await trangDangNhap.moTrang();
  await trangDangNhap.dangNhap(TK_VIP.email, TK_VIP.matKhau);

  await expect(trangDangNhap.thanhNguoiDung).toBeVisible();

  // Chờ danh sách sản phẩm tải xong.
  await trangSanPham.chokKetQua();

  // Thêm Áo thun NTU (mã 1) vào giỏ.
  await trangSanPham.themVaoGio(1, 1);

  // Tính phí vận chuyển ở ngoại thành.
  await trangGio.tinhPhi('ngoai-thanh');

  await expect(trangGio.thongBaoPhi).toContainText(/0\s*đ/);
});

// FR-02.3: Tài khoản bị khóa sau 3 lần đăng nhập sai liên tiếp.
test('FR-02.3 — khóa tài khoản sau 3 lần sai theo POM', async ({ page }) => {
  const trangDangNhap = new LoginPage(page);

  await trangDangNhap.moTrang();
  await trangDangNhap.dangNhapSaiNhieuLan(TK_THUONG.email, 3);

  await expect(trangDangNhap.thongBao).toContainText(/khóa|khoa/i);
});