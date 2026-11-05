/*
 * Page Object cho màn hình Sản phẩm và bộ lọc (FR-06).
 */
class ProductPage {
  constructor(page) {
    this.page = page;
    this.danhSach = page.getByTestId('product-list');
    this.nutLoc = page.getByTestId('btn-loc');
    this.nutXoaBoLoc = page.getByTestId('btn-xoabo-loc');
    this.thongBaoRong = page.getByTestId('khong-co-ket-qua');

    this.oTuKhoa = page.getByTestId('f-tukhoa');
    this.chonDanhMuc = page.getByTestId('f-danhmuc');
    this.chonKhoangGia = page.getByTestId('f-khoanggia');
    this.chonSapXep = page.getByTestId('f-sapxep');
    this.chkConHang = page.getByTestId('f-conhang');

    this.cacDongSanPham = this.danhSach.locator('tr[data-testid^="sp-"]');
  }

  async moTrang() {
    await this.page.goto('/');
    await this.chokKetQua();
  }

  async chokKetQua() {
    await this.danhSach
      .locator('table, [data-testid="khong-co-ket-qua"]')
      .first()
      .waitFor({ state: 'visible' });
  }

  async loc({ tuKhoa, danhMuc, khoangGia, sapXep, conHang } = {}) {
    if (tuKhoa !== undefined) {
      await this.oTuKhoa.fill(tuKhoa);
    }

    if (danhMuc !== undefined) {
      await this.chonDanhMuc.selectOption(danhMuc);
    }

    if (khoangGia !== undefined) {
      await this.chonKhoangGia.selectOption(khoangGia);
    }

    if (sapXep !== undefined) {
      await this.chonSapXep.selectOption(sapXep);
    }

    if (conHang !== undefined) {
      if (conHang) {
        await this.chkConHang.check();
      } else {
        await this.chkConHang.uncheck();
      }
    }

    await this.nutLoc.click();
    await this.chokKetQua();
  }

  async xoaBoLoc() {
    await this.nutXoaBoLoc.click();
    await this.chokKetQua();
  }

  async danhSachTen() {
    if (await this.thongBaoRong.isVisible()) {
      return [];
    }

    return this.cacDongSanPham.locator('td:nth-child(1)').allTextContents();
  }

  async danhSachGia() {
    if (await this.thongBaoRong.isVisible()) {
      return [];
    }

    const giaHienThi = await this.cacDongSanPham
      .locator('td:nth-child(3)')
      .allTextContents();

    return giaHienThi.map((gia) =>
      Number(gia.replace(/[^\d]/g, ''))
    );
  }

  async danhSachTonKho() {
    if (await this.thongBaoRong.isVisible()) {
      return [];
    }

    return this.cacDongSanPham
      .locator('td:nth-child(4)')
      .allTextContents();
  }

  async themVaoGio(maSanPham, soLuong) {
    await this.page.getByTestId(`qty-${maSanPham}`).fill(String(soLuong));
    await this.page.getByTestId(`add-${maSanPham}`).click();
  }
}

module.exports = { ProductPage };