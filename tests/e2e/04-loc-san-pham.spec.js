/*
 * BUỔI 5 — PHẦN 4: Tự động hóa kiểm thử hồi quy cho FR-06
 */
const { test, expect } = require('@playwright/test');
const { datLaiDuLieu } = require('../helpers/dat-lai-du-lieu');
const { ProductPage } = require('../pages/ProductPage');

let trangSanPham;

test.beforeEach(async ({ page, request }) => {
  await datLaiDuLieu(request);
  trangSanPham = new ProductPage(page);
  await trangSanPham.moTrang();
});

// FR-06.3: Lọc theo danh mục Đồ dùng học tập.
test('FR-06.3 — lọc theo danh mục Đồ dùng học tập', async () => {
  await trangSanPham.loc({ danhMuc: 'do-dung-hoc-tap' });

  const ten = await trangSanPham.danhSachTen();

  expect(ten).toHaveLength(3);
  expect(ten).toEqual(
    expect.arrayContaining([
      'Sổ tay sinh viên',
      'Bút ký NTU',
      'Balo laptop',
    ])
  );
});

// FR-06.2: Tìm kiếm một phần tên, không phân biệt hoa thường.
test('FR-06.2 — tìm kiếm từ khóa không phân biệt hoa thường', async () => {
  await trangSanPham.loc({ tuKhoa: 'tHuN' });

  const ten = await trangSanPham.danhSachTen();

  expect(ten).toEqual(['Áo thun NTU']);
});

// FR-06.4: Khoảng giá 100.000đ–300.000đ bao gồm hai đầu mút.
test('FR-06.4 — lọc khoảng giá từ 100.000đ đến 300.000đ', async () => {
  await trangSanPham.loc({ khoangGia: '100k-300k' });

  const ten = await trangSanPham.danhSachTen();
  const gia = await trangSanPham.danhSachGia();

  expect(ten).toHaveLength(3);
  expect(ten).toEqual(
    expect.arrayContaining([
      'Bình nước giữ nhiệt',
      'Áo thun NTU',
      'Nón bảo hiểm NTU',
    ])
  );

  expect(gia.every((value) => value >= 100000 && value <= 300000))
    .toBe(true);

  // Kiểm tra biên dưới 100.000đ được bao gồm.
  expect(gia).toContain(100000);
});

// FR-06.5: Sắp xếp giá tăng dần.
test('FR-06.5 — sắp xếp giá tăng dần', async () => {
  await trangSanPham.loc({ sapXep: 'gia-tang' });

  const gia = await trangSanPham.danhSachGia();

  expect(gia).toEqual([...gia].sort((a, b) => a - b));
});

// FR-06.5: Sắp xếp giá giảm dần.
test('FR-06.5 — sắp xếp giá giảm dần', async () => {
  await trangSanPham.loc({ sapXep: 'gia-giam' });

  const gia = await trangSanPham.danhSachGia();

  expect(gia).toEqual([...gia].sort((a, b) => b - a));
});

// FR-06.6: Chỉ hiển thị sản phẩm có tồn kho lớn hơn 0.
test('FR-06.6 — chỉ hiển thị sản phẩm còn hàng', async () => {
  await trangSanPham.loc({ conHang: true });

  const ten = await trangSanPham.danhSachTen();
  const tonKho = await trangSanPham.danhSachTonKho();

  expect(ten).toHaveLength(5);
  expect(tonKho).toHaveLength(5);
  expect(tonKho).not.toContain('Hết hàng');
});

// FR-06.7: Các điều kiện lọc được áp dụng đồng thời.
test('FR-06.7 — kết hợp từ khóa, danh mục và tình trạng tồn kho', async () => {
  await trangSanPham.loc({
    tuKhoa: 'NTU',
    danhMuc: 'qua-luu-niem',
    conHang: true,
  });

  const ten = await trangSanPham.danhSachTen();

  expect(ten).toEqual([
    'Áo thun NTU',
    'Áo khoác gió NTU',
  ]);
});

// FR-06.7: Không có sản phẩm phù hợp.
test('FR-06.7 — hiển thị thông báo khi không có kết quả', async () => {
  await trangSanPham.loc({
    tuKhoa: 'sanpham-khong-ton-tai-123',
  });

  const ten = await trangSanPham.danhSachTen();

  expect(ten).toHaveLength(0);
  await expect(trangSanPham.thongBaoRong)
    .toHaveText('Không tìm thấy sản phẩm phù hợp');
});