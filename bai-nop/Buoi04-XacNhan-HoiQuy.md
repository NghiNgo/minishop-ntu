# BÁO CÁO KIỂM THỬ XÁC NHẬN VÀ HỒI QUY – BUỔI 4

## Thông tin chung

- **Họ tên:** Nguyễn Quốc Bảo
- **MSSV:** 65130195
- **Phiên bản hệ thống:** 1.1.0
- **Tài liệu yêu cầu:** SRS-MiniShop-v1.2
- **Ngày thực hiện:** 05/11/2026

---

## 1. Kiểm thử xác nhận 12 lỗi từ phiên bản trước

Mục tiêu là kiểm tra lại 12 lỗi đã được ghi nhận trong tài liệu phát hành `GhiChuPhatHanh-v1.1.md`, đối chiếu kết quả thực tế với yêu cầu trong SRS v1.2.

Các mã F-01 đến F-12 dưới đây là mã tham chiếu của 12 lỗi cần xác nhận, không phải mã test case được lấy từ file CSV Buổi 2.

| Mã kiểm tra xác nhận | Nội dung kiểm tra | Kết quả thực tế | Đánh giá |
|---|---|---|---|
| F-01 | Kiểm tra giới hạn tuổi đăng ký 18–100 | Tuổi 17 bị từ chối; 18 và 100 được chấp nhận; 101 bị từ chối | Đạt |
| F-02 | Kiểm tra mật khẩu dài tối đa 20 ký tự | Mật khẩu 21 ký tự bị từ chối với thông báo yêu cầu mật khẩu từ 8 đến 20 ký tự | Đạt |
| F-03 | Kiểm tra độ dài tối thiểu và thành phần mật khẩu | Mật khẩu 8 ký tự bị từ chối; mật khẩu 9 ký tự có cả chữ và số được chấp nhận; mật khẩu thiếu chữ hoặc số bị từ chối đúng quy định | Không đạt |
| F-04 | Kiểm tra bộ đếm đăng nhập sai được đặt lại sau đăng nhập thành công | Sau hai lần đăng nhập sai và một lần đăng nhập đúng, số lần thử được đặt lại về 0 và tài khoản không bị khóa | Đạt |
| F-05 | Kiểm tra khóa tài khoản sau 3 lần đăng nhập sai và tự mở khóa | Khi đang khóa, hệ thống trả HTTP 423 và thông báo đúng. Tuy nhiên, thời gian khóa trong mã nguồn là 15 giây, trong khi SRS yêu cầu 15 phút | Không đạt |
| F-06 | Kiểm tra số lượng sản phẩm tối thiểu và tối đa | `validateQuantity`: số lượng 0 không hợp lệ; 1 và 99 hợp lệ; 100 không hợp lệ | Đạt |
| F-07 | Kiểm tra giới hạn tổng số lượng sản phẩm trong giỏ | Tổng số lượng 200 được chấp nhận; thêm 1 sản phẩm làm tổng vượt giới hạn bị từ chối với HTTP 400 | Đạt |
| F-08 | Kiểm tra thêm sản phẩm không tồn tại vào giỏ | Thêm sản phẩm ID 999999 bị từ chối với HTTP 404 và thông báo sản phẩm không tồn tại | Đạt |
| F-09 | Kiểm tra miễn phí vận chuyển khi đơn hàng đạt 500.000 đồng | Phí vận chuyển nội thành: 499.999 đồng tính 20.000 đồng; 500.000 và 500.001 đồng được miễn phí | Đạt |
| F-10 | Kiểm tra phí vận chuyển cho khách VIP ở khu vực ngoại thành | Khách thường bị tính 35.000 đồng; khách VIP được miễn phí | Đạt |
| F-11 | Kiểm tra giảm giá 5% cho khách VIP | Đơn hàng có giá trị 300.000 đồng được giảm 15.000 đồng; phí vận chuyển 0 đồng; tổng thanh toán 285.000 đồng | Đạt |
| F-12 | Kiểm tra hủy đơn hàng không tồn tại | Gửi yêu cầu hủy đơn hàng ID 999999 trả về HTTP 404 | Đạt |

### Tổng hợp kết quả xác nhận

| Kết quả | Số lượng |
|---|---:|
| Đạt – lỗi đã được khắc phục | 10 |
| Không đạt – lỗi chưa được khắc phục đầy đủ | 2 |
| Tổng số lỗi được kiểm tra | 12 |

**Các lỗi chưa được khắc phục đầy đủ:**

- **F-03:** Mật khẩu có đúng 8 ký tự nhưng bị từ chối, chưa đáp ứng yêu cầu độ dài tối thiểu 8 ký tự.
- **F-05:** Hệ thống có cơ chế khóa và thông báo phù hợp nhưng thời gian khóa chỉ là 15 giây thay vì 15 phút.

**Kết luận:** Có 10/12 lỗi được xác nhận đã khắc phục. Hai lỗi F-03 và F-05 cần tiếp tục xử lý.

---

## 2. Kết quả kiểm thử hồi quy

### 2.1. Mục tiêu

Kiểm tra các chức năng hiện có sau những thay đổi ở phiên bản 1.1.0, nhằm phát hiện lỗi phát sinh và đánh giá khả năng hoạt động của các bộ kiểm thử tự động.

### 2.2. Công cụ và cách thực hiện

- **Node.js:** chạy các lệnh kiểm tra và thực thi mã.
- **Jest:** chạy bộ kiểm thử tự động.
- **PowerShell:** thực hiện lệnh kiểm tra trong môi trường Windows.
- **Postman:** gửi yêu cầu API và kiểm tra phản hồi.
- **Trình duyệt và Developer Tools:** kiểm tra giao diện, Network và phản hồi API.

### 2.3. Kết quả chạy `npm test`

Kết quả thực tế:

```text
FAIL tests/unit/du-lieu-csv.test.js
Error: Buoi02-DuLieuKiemThu.csv không có dòng nào cho hàm validateQuantity

PASS tests/vi-du/xep-loai.test.js
PASS tests/unit/do-phu.test.js
PASS tests/unit/auth-mock.test.js

Test Suites: 1 failed, 3 passed, 4 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.06 s
```

### 2.4. Phân tích kết quả

- Có 3/4 test suite chạy thành công.
- Có 12 test được thực thi và đều đạt.
- Một test suite không chạy hoàn chỉnh do file `bai-nop/Buoi02-DuLieuKiemThu.csv` không có dữ liệu cho hàm `validateQuantity`.
- File `tests/unit/du-lieu-csv.test.js` cũng còn phần TODO cho `validateQuantity` và `calcShippingFee`.

Nguyên nhân trực tiếp của lỗi là dữ liệu CSV hiện tại không đáp ứng cấu trúc dữ liệu mà bộ kiểm thử yêu cầu. Đây là vấn đề về dữ liệu và bộ test mẫu, không phải kết quả chứng minh chức năng trong mã nguồn bị lỗi.

Không chỉnh sửa file CSV, bộ test mẫu hoặc mã nguồn trong phạm vi bài kiểm thử Buổi 4 chỉ để làm cho `npm test` chuyển sang trạng thái thành công.

### 2.5. So sánh với kết quả Buổi 3

Tài liệu Buổi 3 ghi nhận 64 test case, trong đó 62 đạt và 2 không đạt. Tuy nhiên, kết quả `npm test` Buổi 4 hiện tại chỉ thực thi được 12 test; một test suite không chạy do thiếu dữ liệu CSV.

Do phạm vi và số lượng test được thực thi không tương đương, không thể kết luận tỷ lệ đạt của Buổi 4 tăng hay giảm so với Buổi 3.

**Kết luận hồi quy:** Các test được thực thi trong lần chạy này đều đạt. Tuy nhiên, kết quả toàn bộ bộ kiểm thử chưa hoàn chỉnh do một test suite không thể chạy.

---

## 3. Kiểm thử chức năng lọc và sắp xếp sản phẩm FR-06

### 3.1. Mục tiêu

Kiểm tra chức năng tìm kiếm, lọc theo danh mục, lọc theo khoảng giá, lọc sản phẩm còn hàng và sắp xếp sản phẩm theo giá.

### 3.2. Kết quả kiểm thử

| Mã test | Nội dung kiểm tra | Kết quả mong đợi | Kết quả thực tế | Đánh giá |
|---|---|---|---|---|
| TC-FR06-01 | Tìm kiếm từ khóa `NTU` | Hiển thị 4 sản phẩm có tên chứa NTU | Hiển thị đúng 4 sản phẩm | Đạt |
| TC-FR06-02 | Lọc danh mục Quà lưu niệm | Hiển thị 4 sản phẩm thuộc danh mục | Hiển thị đúng 4 sản phẩm | Đạt |
| TC-FR06-03 | Lọc giá từ 100.000 đến 300.000 đồng | Hiển thị sản phẩm nằm trong khoảng giá, bao gồm hai mốc | Hiển thị 3 sản phẩm: 100.000, 150.000 và 200.000 đồng | Đạt |
| TC-FR06-04 | Lọc giá dưới 100.000 đồng và sắp xếp tăng dần | Hiển thị sản phẩm dưới 100.000 đồng theo giá tăng dần | Bút ký NTU 35.000 đồng đứng trước Sổ tay sinh viên 50.000 đồng | Đạt |
| TC-FR06-05 | Lọc giá trên 300.000 đồng và sắp xếp giảm dần | Áo khoác gió NTU 450.000 đồng đứng trước Balo laptop 350.000 đồng | Balo laptop đứng trước Áo khoác gió NTU | Không đạt |
| TC-FR06-06 | Lọc sản phẩm còn hàng | Chỉ hiển thị sản phẩm có số lượng tồn kho lớn hơn 0 | Hiển thị cả 7 sản phẩm, bao gồm 2 sản phẩm có tồn kho bằng 0 | Không đạt |

### 3.3. Tổng hợp kết quả

| Kết quả | Số lượng |
|---|---:|
| Đạt | 4 |
| Không đạt | 2 |
| Tổng số test case | 6 |

### 3.4. Phân tích lỗi phát hiện

**BUG-FR06-01 – Sắp xếp giá giảm dần không đúng**

- Hiện tượng: Khi chọn sắp xếp giá giảm dần, sản phẩm có giá thấp hơn vẫn đứng trước sản phẩm có giá cao hơn.
- Kết quả mong đợi: Áo khoác gió NTU (450.000 đồng) đứng trước Balo laptop (350.000 đồng).
- Kết quả thực tế: Balo laptop đứng trước Áo khoác gió NTU.
- Nguyên nhân được xác định khi kiểm tra mã nguồn: Cả hai lựa chọn `gia-tang` và `gia-giam` đều đang sử dụng phép sắp xếp tăng dần.
- Mức độ nghiêm trọng đề xuất: Medium.
- Mức độ ưu tiên đề xuất: High.
- GitHub Issue: https://github.com/quocbao110805/sot357-65130195/issues/8

**BUG-FR06-02 – Bộ lọc sản phẩm còn hàng hiển thị cả sản phẩm hết hàng**

- Hiện tượng: Khi bật bộ lọc còn hàng, danh sách vẫn hiển thị sản phẩm có tồn kho bằng 0.
- Kết quả mong đợi: Chỉ hiển thị sản phẩm có tồn kho lớn hơn 0.
- Kết quả thực tế: Danh sách vẫn có đủ 7 sản phẩm, trong đó có Bình nước giữ nhiệt và Nón bảo hiểm NTU với tồn kho bằng 0.
- Nguyên nhân được xác định khi kiểm tra mã nguồn: Điều kiện lọc tồn kho chưa loại bỏ các sản phẩm có số lượng bằng 0.
- Mức độ nghiêm trọng đề xuất: High.
- Mức độ ưu tiên đề xuất: High.
- GitHub Issue: https://github.com/quocbao110805/sot357-65130195/issues/9

### 3.5. Minh chứng

- Ảnh lỗi sắp xếp giá giảm dần: `bai-nop/hinh/giagiamdan.png`
- Ảnh lỗi lọc sản phẩm còn hàng: `bai-nop/hinh/locspconhang.png`

**Kết luận:** Chức năng FR-06 đạt 4/6 test case. Hai lỗi liên quan đến sắp xếp giá giảm dần và lọc sản phẩm còn hàng đã được ghi nhận thành GitHub Issue #8 và #9. Cả hai issue đang ở trạng thái Open tại thời điểm lập báo cáo.

---

## 4. Ma trận truy vết yêu cầu (RTM)

| Yêu cầu | Mã kiểm tra liên quan | Kết quả | Ghi chú |
|---|---|---|---|
| FR-01.3 – Kiểm tra độ tuổi đăng ký | F-01 | Đạt | Tuổi 18–100 được chấp nhận |
| FR-01.4 – Kiểm tra mật khẩu | F-02, F-03 | Không đạt | F-02 đạt, F-03 chưa đạt |
| FR-02.3 – Quản lý số lần đăng nhập sai | F-04 | Đạt | Đăng nhập thành công đặt lại bộ đếm |
| FR-02.4 – Khóa và mở khóa tài khoản | F-05 | Không đạt | Thời gian khóa chưa đúng 15 phút |
| FR-03.2 – Kiểm tra số lượng sản phẩm | F-06 | Đạt | Số lượng 0 và 100 bị từ chối |
| FR-03.4 – Giới hạn tổng số lượng giỏ hàng | F-07 | Đạt | Giới hạn tổng số lượng 200 |
| FR-03.6 – Kiểm tra sản phẩm tồn tại | F-08 | Đạt | Sản phẩm không tồn tại trả HTTP 404 |
| FR-04.2 – Miễn phí vận chuyển theo giá trị đơn hàng | F-09 | Đạt | Đạt ngưỡng 500.000 đồng |
| FR-04.3 – Phí vận chuyển theo loại khách hàng | F-10 | Đạt | Khách VIP được miễn phí vận chuyển |
| FR-05.2 – Yêu cầu liên quan đến chức năng chưa có bằng chứng kiểm tra | Chưa có | Chưa xác định | Chưa đủ dữ liệu để kết luận |
| FR-05.3 – Giảm giá khách VIP | F-11 | Đạt | Giảm 5% trên đơn hàng |
| FR-05.5 – Hủy đơn hàng không tồn tại | F-12 | Đạt | Đã xác nhận HTTP 404 |
| FR-06.2 – Tìm kiếm sản phẩm | TC-FR06-01 | Đạt | Tìm kiếm NTU trả về 4 sản phẩm |
| FR-06.3 – Lọc theo danh mục | TC-FR06-02 | Đạt | Lọc danh mục Quà lưu niệm |
| FR-06.4 – Lọc theo khoảng giá | TC-FR06-03, TC-FR06-04 | Đạt | Các khoảng giá đã kiểm tra cho kết quả đúng |
| FR-06.5 – Sắp xếp theo giá | TC-FR06-04, TC-FR06-05 | Không đạt | Sắp xếp giảm dần sai |
| FR-06.6 – Lọc sản phẩm còn hàng | TC-FR06-06 | Không đạt | Vẫn hiển thị sản phẩm tồn kho bằng 0 |
| FR-06.7 – Kết hợp nhiều điều kiện lọc | Chưa có | Chưa phủ | Chưa có đủ bằng chứng kiểm tra toàn bộ các tổ hợp điều kiện |

---

### Kết luận chung

Qua kiểm thử xác nhận, kiểm thử hồi quy và kiểm thử chức năng FR-06, thu được các kết quả sau:

1. **Kiểm thử xác nhận:** 10/12 lỗi cũ đã được khắc phục. Hai lỗi F-03 và F-05 chưa đáp ứng đầy đủ yêu cầu SRS v1.2.
2. **Kiểm thử hồi quy:** 12 test được thực thi đều đạt, nhưng một test suite không chạy do thiếu dữ liệu trong file CSV Buổi 2. Vì vậy, kết quả kiểm thử hồi quy chưa hoàn chỉnh.
3. **Kiểm thử FR-06:** 4/6 test case đạt. Phát hiện hai lỗi mới liên quan đến sắp xếp giá giảm dần và lọc sản phẩm còn hàng.
4. **Quản lý lỗi:** Hai lỗi FR-06 đã được tạo GitHub Issue #8 và #9. Cả hai đang ở trạng thái Open.

### Đánh giá phát hành

**Chưa đủ cơ sở để xác nhận phiên bản 1.1.0 đáp ứng toàn bộ yêu cầu kiểm thử.**

Lý do:
- F-03 còn lỗi tại biên độ dài mật khẩu: mật khẩu đúng 8 ký tự bị từ chối.
- F-05 chưa đáp ứng thời gian khóa tài khoản 15 phút theo SRS.
- BUG-FR06-01 và BUG-FR06-02 vẫn đang mở.
- Bộ kiểm thử hồi quy chưa chạy hoàn chỉnh do thiếu dữ liệu CSV.

Cần xử lý các lỗi còn tồn tại, bổ sung dữ liệu kiểm thử còn thiếu và thực hiện lại các test liên quan trước khi đánh giá phát hành.

**Người thực hiện:** Nguyễn Quốc Bảo
**MSSV:** 65130195
**Ngày lập báo cáo:** 05/11/2026
