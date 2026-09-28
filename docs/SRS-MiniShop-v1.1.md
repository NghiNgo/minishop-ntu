# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Hệ thống MiniShop NTU

| Thông tin | Nội dung |
|---|---|
| Mã tài liệu | MSN-SRS |
| Phiên bản | **1.1** |
| Trạng thái | Đã review – phát hành cho phát triển và kiểm thử |
| Người soạn | Nhóm phân tích nghiệp vụ (BA) |
| Ngày | ……/……/20…… |

## Lịch sử thay đổi

| Phiên bản | Nội dung thay đổi |
|---|---|
| 1.0 | Bản nháp đầu tiên |
| 1.1 | Sửa theo kết quả review: thống nhất tuổi (2.2, FR-01.3); định nghĩa mật khẩu mạnh (FR-01.4); bổ sung xử lý email trùng (FR-01.5); thống nhất và bổ sung quy tắc khóa tài khoản (FR-02.3, FR-02.4, NFR-03); định lượng giới hạn giỏ hàng (FR-03.4); ngưỡng miễn phí vận chuyển "từ 500.000đ" (FR-04.2); định nghĩa nội thành/ngoại thành (1.3); thống nhất thuật ngữ "Thành viên VIP" (FR-05.3); điều kiện hủy đơn (FR-05.5); bỏ bước nhập mã giảm giá (UC-03); định lượng NFR-01, NFR-02; sửa ví dụ 2 Phụ lục A |

---

## 1. Giới thiệu

### 1.1. Mục đích
Tài liệu này mô tả các yêu cầu đối với hệ thống **MiniShop NTU** – cửa hàng trực tuyến bán quà lưu niệm của Trường Đại học Nha Trang, phục vụ sinh viên, cựu sinh viên và khách. Tài liệu là cơ sở để nhóm phát triển xây dựng hệ thống và nhóm kiểm thử thiết kế các ca kiểm thử.

### 1.2. Phạm vi
Hệ thống gồm các chức năng: đăng ký, đăng nhập, xem sản phẩm, quản lý giỏ hàng, tính phí vận chuyển, đặt hàng và hủy đơn hàng.

Ngoài phạm vi phiên bản này: thanh toán trực tuyến (hệ thống chỉ hỗ trợ thanh toán khi nhận hàng – COD), mã giảm giá, quản lý kho, chức năng dành cho quản trị viên.

### 1.3. Thuật ngữ

| Thuật ngữ | Định nghĩa |
|---|---|
| Khách | Người truy cập chưa đăng nhập |
| Thành viên | Người dùng đã đăng ký tài khoản |
| Thành viên VIP | Thành viên được quản trị viên nâng hạng |
| Tạm tính | Tổng (đơn giá × số lượng) của các sản phẩm trong giỏ, chưa gồm phí vận chuyển và giảm giá |
| COD | Cash On Delivery – thanh toán khi nhận hàng |
| Nội thành | Địa chỉ giao hàng thuộc các phường trung tâm thành phố Nha Trang; người dùng chọn khu vực từ danh sách có sẵn |
| Ngoại thành | Địa chỉ giao hàng trong tỉnh Khánh Hòa nhưng không thuộc nội thành. Hệ thống không giao hàng ngoài tỉnh |

---

## 2. Mô tả tổng quan

### 2.1. Nhóm người dùng

| Nhóm | Quyền |
|---|---|
| Khách | Xem danh sách sản phẩm, đăng ký tài khoản |
| Thành viên | Như Khách, cộng thêm: đăng nhập, dùng giỏ hàng, đặt hàng, hủy đơn |
| Thành viên VIP | Như Thành viên, cộng thêm các ưu đãi được mô tả ở mục 3 |

### 2.2. Ràng buộc chung
- Người dùng đăng ký tài khoản phải **từ 18 tuổi trở lên** (xem FR-01.3).
- Hệ thống là ứng dụng web, chạy trên các trình duyệt Chrome, Edge, Firefox phiên bản mới nhất.
- Đơn vị tiền tệ: Việt Nam đồng (VNĐ).

---

## 3. Yêu cầu chức năng

### FR-01. Đăng ký tài khoản

| Mã | Yêu cầu |
|---|---|
| FR-01.1 | Người dùng nhập các thông tin: họ tên, email, tuổi, mật khẩu. |
| FR-01.2 | Họ tên là thông tin bắt buộc. |
| FR-01.3 | Tuổi là **số nguyên từ 18 đến 100** (bao gồm cả 18 và 100). Ngoài khoảng này, hệ thống hiển thị thông báo lỗi và không tạo tài khoản. |
| FR-01.4 | Mật khẩu có độ dài **từ 8 đến 20 ký tự** (bao gồm cả 8 và 20), chứa **ít nhất một chữ cái và ít nhất một chữ số**. |
| FR-01.5 | Email phải đúng định dạng và không được trùng với email đã đăng ký (không phân biệt chữ hoa, chữ thường). Nếu trùng, hệ thống hiển thị "Email đã được sử dụng" và không tạo tài khoản. |
| FR-01.6 | Khi đăng ký thành công, hệ thống hiển thị thông báo "Đăng ký thành công". |

### FR-02. Đăng nhập

| Mã | Yêu cầu |
|---|---|
| FR-02.1 | Thành viên đăng nhập bằng email và mật khẩu. |
| FR-02.2 | Nếu email hoặc mật khẩu không đúng, hệ thống hiển thị thông báo "Sai email hoặc mật khẩu". |
| FR-02.3 | Sau **3 lần** đăng nhập sai **liên tiếp**, tài khoản bị khóa trong **15 phút**. Một lần đăng nhập đúng sẽ đặt lại bộ đếm số lần sai về 0. |
| FR-02.4 | Trong thời gian bị khóa, mọi lần đăng nhập (kể cả đúng mật khẩu) đều bị từ chối với thông báo "Tài khoản đã bị khóa, vui lòng thử lại sau 15 phút". Hết 15 phút, tài khoản tự động được mở khóa và bộ đếm về 0. |

### FR-03. Giỏ hàng

| Mã | Yêu cầu |
|---|---|
| FR-03.1 | Chỉ thành viên đã đăng nhập mới được thêm sản phẩm vào giỏ hàng. |
| FR-03.2 | Số lượng của mỗi sản phẩm là số nguyên từ 1 đến 99. |
| FR-03.3 | Nếu sản phẩm đã có trong giỏ, số lượng được cập nhật thành giá trị mới nhập. |
| FR-03.4 | Tổng số lượng của tất cả sản phẩm trong giỏ không vượt quá **200**. |
| FR-03.6 | Thêm vào giỏ một sản phẩm không tồn tại, hệ thống báo lỗi "Sản phẩm không tồn tại". |
| FR-03.5 | Thành viên có thể xóa sản phẩm khỏi giỏ hàng. |

### FR-04. Phí vận chuyển

| Mã | Yêu cầu |
|---|---|
| FR-04.1 | Phí vận chuyển tính theo khu vực giao hàng: **nội thành 20.000đ**, **ngoại thành 35.000đ**. |
| FR-04.2 | Đơn hàng có tạm tính **từ 500.000đ trở lên** được miễn phí vận chuyển. |
| FR-04.3 | Thành viên VIP được miễn phí vận chuyển ở **mọi khu vực**, không phụ thuộc tạm tính. |
| FR-04.4 | Phí vận chuyển được hiển thị cho thành viên trước khi xác nhận đặt hàng. |

Ví dụ minh họa xem **Phụ lục A**.

### FR-05. Đặt hàng và hủy đơn hàng

| Mã | Yêu cầu |
|---|---|
| FR-05.1 | Thành viên chọn khu vực giao hàng và xác nhận đặt hàng. Hình thức thanh toán là COD. |
| FR-05.2 | Tổng tiền phải trả = Tạm tính − Giảm giá + Phí vận chuyển. |
| FR-05.3 | **Thành viên VIP** được giảm 5% trên tạm tính. Ngưỡng miễn phí vận chuyển (FR-04.2) được xét theo tạm tính **trước** giảm giá. |
| FR-05.4 | Sau khi đặt hàng thành công, giỏ hàng được làm trống và hệ thống gửi email xác nhận cho thành viên. |
| FR-05.5 | Thành viên chỉ có thể hủy đơn hàng **của sinh viên** khi đơn đang ở trạng thái "Chờ xác nhận". Hủy đơn không tồn tại, hệ thống báo "Không tìm thấy đơn hàng". |

### UC-03. Ca sử dụng "Đặt hàng"

- **Tác nhân:** Thành viên
- **Tiền điều kiện:** Thành viên đã đăng nhập, giỏ hàng có ít nhất một sản phẩm.
- **Luồng chính:**
  1. Thành viên mở giỏ hàng.
  2. Thành viên chọn khu vực giao hàng.
  3. Hệ thống hiển thị tạm tính, giảm giá, phí vận chuyển và tổng tiền.
  4. Thành viên nhấn "Đặt hàng".
  5. Hệ thống tạo đơn hàng ở trạng thái "Chờ xác nhận" và hiển thị mã đơn.
- **Hậu điều kiện:** Đơn hàng được lưu; giỏ hàng trống.

---

## 4. Yêu cầu phi chức năng

| Mã | Nhóm | Yêu cầu |
|---|---|---|
| NFR-01 | Hiệu năng | 95% yêu cầu được phản hồi trong **dưới 2 giây** khi có 50 người dùng đồng thời. |
| NFR-02 | Độ tin cậy | Độ sẵn sàng của hệ thống đạt **ít nhất 99%** thời gian mỗi tháng. |
| NFR-03 | Bảo mật | Mật khẩu được lưu dưới dạng băm (hash). Quy tắc khóa tài khoản theo FR-02.3, FR-02.4. |
| NFR-04 | Giao diện | Giao diện bằng tiếng Việt, hiển thị tốt trên màn hình có chiều rộng từ 360px trở lên. |
| NFR-05 | Hiển thị | Số tiền được định dạng theo kiểu Việt Nam, ví dụ: 150.000đ. |

---

## Phụ lục A. Ví dụ tính phí vận chuyển

| # | Loại thành viên | Khu vực | Tạm tính | Phí vận chuyển |
|---|---|---|---|---|
| 1 | Thường | Nội thành | 300.000đ | 20.000đ |
| 2 | Thường | Ngoại thành | 200.000đ | 35.000đ |
| 3 | Thường | Nội thành | 500.000đ | 0đ |
| 4 | VIP | Ngoại thành | 100.000đ | 0đ |
| 5 | Thường | Ngoại thành | 650.000đ | 0đ |
