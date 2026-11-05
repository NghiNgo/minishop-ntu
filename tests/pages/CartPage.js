/*
 * Page Object cho khu vực Giỏ hàng và đặt hàng.
 */
class CartPage {
  constructor(page) {
    this.page = page;
    this.gio = page.getByTestId('cart');
    this.tamTinh = page.getByTestId('subtotal');

    this.chonKhuVuc = page.getByTestId('zone');
    this.nutTinhPhi = page.getByTestId('btn-fee');
    this.nutDatHang = page.getByTestId('btn-order');
    this.thongBaoPhi = page.getByTestId('fee-msg');
  }

  async tinhPhi(khuVuc) {
    await this.chonKhuVuc.selectOption(khuVuc);
    await this.nutTinhPhi.click();
    await this.thongBaoPhi.waitFor({ state: 'visible' });
  }

  async datHang(khuVuc) {
    await this.chonKhuVuc.selectOption(khuVuc);
    await this.nutDatHang.click();
    await this.thongBaoPhi.waitFor({ state: 'visible' });
  }

  async xoaSanPham(maSanPham) {
    await this.page.getByTestId(`remove-${maSanPham}`).click();
  }
}

module.exports = { CartPage };