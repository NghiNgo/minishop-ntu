# BUỔI 5 – CA KIỂM THỬ FLAKY VÀ PAGE OBJECT MODEL

- **Họ tên:** Nguyễn Quốc Bảo
- **MSSV:** 65130195

## 1. Ca kiểm thử flaky

### 1.1. Quan sát trước khi sửa

Chạy `npx playwright test tests/e2e/02-flaky --repeat-each=5`.

| Ca kiểm thử | Số lần đạt / tổng số lần chạy | Thông báo lỗi khi thất bại |
|---|---|---|
| Danh sách sản phẩm hiển thị đủ 7 mặt hàng | 0/5 | Expected: 7, Received: 8 |
| Tính phí vận chuyển cho thành viên thường | 5/5 | Không có lỗi trong lần chạy được ghi nhận |

Ca danh sách sản phẩm thất bại cả 5 lần vì locator đếm cả dòng tiêu đề bảng. Đây là lỗi locator, không phải flaky ngẫu nhiên. Chưa có kết quả chạy lặp của phiên bản nguyên gốc trước mọi chỉnh sửa.

### 1.2. Nguyên nhân

| Ca kiểm thử | Dòng lệnh gây vấn đề | Vì sao không ổn định |
|---|---|---|
| Danh sách sản phẩm | `locator('tbody tr')` | Chọn cả dòng tiêu đề và 7 dòng sản phẩm nên đếm thành 8. |
| Tính phí vận chuyển | Đọc `textContent()` ngay sau thao tác bấm | Có thể đọc nội dung trước khi giao diện cập nhật xong. |

Đối với ca danh sách sản phẩm, nguyên nhân thực tế là chọn sai phần tử, không phải chờ chưa đủ thời gian.

### 1.3. Cách sửa

| Ca kiểm thử | Đã thay bằng gì | Vì sao cách mới ổn định |
|---|---|---|
| Danh sách sản phẩm | `locator('tr[data-testid^="sp-"]')` và `await expect(...).toHaveCount(7)` | Chỉ chọn dòng sản phẩm, không đếm dòng tiêu đề. |
| Tính phí vận chuyển | `await expect(page.getByTestId('fee-msg')).toContainText('Phí vận chuyển')` | Playwright tự chờ thông báo cập nhật thay vì đọc nội dung tức thời. |

Không sử dụng `waitForTimeout()` trong hai ca kiểm thử đã sửa.

### 1.4. Xác nhận sau khi sửa

Chạy lại `npx playwright test tests/e2e/02-flaky --repeat-each=5`.

| Ca kiểm thử | Số lần đạt / tổng số lần chạy |
|---|---|
| Danh sách sản phẩm hiển thị đủ 7 mặt hàng | 5/5 |
| Tính phí vận chuyển cho thành viên thường | 5/5 |
| **Tổng cộng** | **10/10** |

Kết quả sau sửa: 10 ca đạt, 0 ca thất bại, thời gian 17,6 giây.

### 1.5. Câu hỏi phân tích

**1.5.1. Vì sao cấu hình học phần đặt `retries: 0`? Trong dự án thật, đặt `retries: 2` có phải cách tốt để xử lý flaky không?**

Cấu hình `retries: 0` giúp phát hiện ngay khi ca kiểm thử thất bại và dễ tìm nguyên nhân. Nếu tự động chạy lại, ca flaky có thể chuyển sang Pass khiến nhóm phát triển bỏ qua lỗi.

Trong dự án thực tế, `retries: 2` có thể giúp thu thập thêm bằng chứng hoặc xử lý sự cố môi trường tạm thời. Tuy nhiên, đây không phải giải pháp sửa flaky. Cần xác định và khắc phục nguyên nhân gốc.

**1.5.2. Một ca flaky gây thiệt hại gì cho nhóm phát triển? Vì sao nguy hiểm hơn ca luôn thất bại?**

Ca flaky gây mất thời gian chạy lại, kiểm tra log và điều tra nguyên nhân. Nó còn làm kết quả CI/CD thiếu tin cậy.

Ca luôn thất bại thường dễ tái hiện và xác định nguyên nhân hơn. Ca flaky có thể lúc đạt lúc thất bại với cùng mã nguồn, khiến nhóm khó phân biệt lỗi thật với lỗi kiểm thử.

**1.5.3. Ngoài độ trễ mạng, nêu hai nguyên nhân khác thường gây flaky.**

1. **Race condition:** các thao tác bất đồng bộ thực hiện không đúng thứ tự hoặc chưa hoàn tất trước khi kiểm tra.
2. **Dữ liệu kiểm thử không độc lập:** ca trước thay đổi dữ liệu, ảnh hưởng đến kết quả ca tiếp theo.

## 2. Page Object Model

### 2.1. Các lớp đã xây dựng

| Lớp | Số locator | Số phương thức | Màn hình tương ứng |
|---|---|---|---|
| LoginPage | 5 | 3 | Đăng nhập |
| ProductPage | 10 | 8 | Danh sách sản phẩm và bộ lọc |
| CartPage | 6 | 3 | Giỏ hàng và đặt hàng |

Số locator được tính theo các thuộc tính locator khai báo trong constructor, kể cả locator tổng hợp. Số phương thức không tính constructor.

Kết quả chạy `npx playwright test tests/e2e/03-pom.spec.js`: **3/3 Pass, thời gian 3,8 giây**.

### 2.2. So sánh trước và sau

Chọn ca **FR-04.3 – VIP miễn phí vận chuyển ở ngoại thành**, đã viết trong Phần 1 và Phần 3.

| Chỉ số | Bản ở Phần 1 (không POM) | Bản ở Phần 3 (có POM) |
|---|---|---|
| Số dòng trong thân ca kiểm thử, kể cả comment và dòng trống | 20 | 20 |
| Số lần gọi locator trực tiếp trong ca kiểm thử | 10 | 0 |

**Phần 1 – Không dùng Page Object**

```javascript
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
```

**Phần 3 – Dùng Page Object**

```javascript
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
```

**Nhận xét:** Số dòng chưa giảm rõ rệt vì vẫn giữ comment giải thích. Tuy nhiên, bản POM không còn locator trực tiếp trong ca kiểm thử. Các thao tác đăng nhập, thêm sản phẩm và tính phí có thể tái sử dụng.

### 2.3. Kịch bản thay đổi giao diện

Giả sử lập trình viên đổi `data-testid="btn-login"` thành `data-testid="nut-dang-nhap"`.

| Câu hỏi | Trả lời |
|---|---|
| Nếu không dùng POM, phải sửa bao nhiêu chỗ trong bài của mình? | Phải sửa từng vị trí gọi locator trực tiếp. Riêng ca FR-04.3 ở Phần 1 có 1 vị trí cần sửa. |
| Nếu có dùng POM, phải sửa bao nhiêu chỗ? | Chỉ cần sửa 1 chỗ trong `LoginPage.js`, tại `this.nutDangNhap`, cho tất cả các ca đang dùng lớp này. |

### 2.4. Câu hỏi phân tích

**2.4.1. Vì sao Page Object không được chứa `expect()`? Điều gì xảy ra nếu đặt khẳng định vào trong Page Object?**

Page Object chịu trách nhiệm quản lý locator và thao tác giao diện. Các lệnh `expect()` thuộc về ca kiểm thử vì mỗi kịch bản có kết quả mong đợi khác nhau.

Nếu đặt assertion trong Page Object, việc thao tác và kiểm tra bị trộn lẫn, khiến lớp khó tái sử dụng, bảo trì và khó xác định nguyên nhân khi kiểm thử thất bại.

**2.4.2. Nếu bỏ phần chờ thông báo trong `dangNhapSaiNhieuLan()` thì ca kiểm thử khóa tài khoản sẽ ra sao?**

Nếu không chờ, lần đăng nhập tiếp theo có thể diễn ra khi giao diện chưa hoàn tất xử lý lần trước. Điều này có thể làm bài kiểm thử thiếu ổn định hoặc kiểm tra trạng thái khóa trước khi hệ thống cập nhật.

Việc chờ thông báo giúp đồng bộ các thao tác. Tuy nhiên, chỉ chờ phần tử hiển thị chưa chắc bảo đảm thông báo mới đã cập nhật, nếu thông báo cũ vẫn đang hiển thị.

**2.4.3. `datLaiDuLieu()` giống và khác kỹ thuật mock đã học ở Buổi 3 như thế nào?**

**Giống nhau:** Cả hai đều giúp kiểm soát điều kiện đầu vào, giảm sự phụ thuộc vào trạng thái không xác định và tăng khả năng lặp lại kết quả.

**Khác nhau:**

- `datLaiDuLieu()` gọi API để đặt lại trạng thái dữ liệu của ứng dụng trước mỗi ca, sau đó kiểm thử các chức năng thật.
- Mock thay thế một thành phần hoặc phản hồi phụ thuộc bằng dữ liệu giả, giúp kiểm thử một phần chức năng mà không cần sử dụng toàn bộ thành phần thật.

Trong bài này, `datLaiDuLieu()` giúp các ca E2E có dữ liệu ban đầu ổn định; mock thích hợp hơn để cô lập thành phần hoặc mô phỏng các tình huống khó tạo ra.

## 3. Kết luận

Đã sửa locator và cách chờ kết quả ở Phần 2. Sau khi sửa, hai ca đạt **10/10 lượt chạy**.

Đã xây dựng và sử dụng ba lớp `LoginPage`, `ProductPage` và `CartPage`. Ba ca POM đều Pass.

Page Object Model giúp tổ chức mã kiểm thử rõ ràng, tái sử dụng thao tác và giảm công sức bảo trì khi giao diện thay đổi.

**Người thực hiện:** Nguyễn Quốc Bảo
**MSSV:** 65130195
