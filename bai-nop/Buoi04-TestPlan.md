# BUỔI 4 – KẾ HOẠCH KIỂM THỬ

- **Họ tên:** Nguyễn Quốc Bảo
- **MSSV:** 65130195
- **Phiên bản phần mềm:** MiniShop NTU v1.1.0
- **Tài liệu yêu cầu:** SRS v1.2

## 1. Mục tiêu đợt kiểm thử

Đợt kiểm thử nhằm xác nhận 12 lỗi được nhóm phát triển thông báo đã sửa có thực sự được khắc phục theo SRS v1.2 hay không. Đợt kiểm thử nhằm xác nhận 12 lỗi được nhóm phát triển thông báo đã sửa có thực sự được khắc phục theo SRS v1.2 hay không. Đồng thời, kiểm tra hồi quy các chức năng liên quan và đánh giá chức năng mới FR-06 về tìm kiếm, lọc và sắp xếp sản phẩm. Kết quả giúp xác định các lỗi còn tồn tại trước khi phát hành phiên bản 1.1.0.

## 2. Phạm vi

| Nội dung | Có kiểm thử | Lý do |
|---|---|---|
| 12 lỗi nhóm phát triển khẳng định đã sửa | Có | Xác nhận từng lỗi F-01 đến F-12 theo yêu cầu SRS |
| Các chức năng không nằm trong danh sách sửa | Có, trong phạm vi liên quan | Kiểm tra hồi quy để phát hiện ảnh hưởng ngoài dự kiến |
| Chức năng mới FR-06 | Có | Kiểm tra tìm kiếm, lọc danh mục, khoảng giá, tình trạng tồn kho và sắp xếp |
| Hiệu năng, bảo mật | Không | Không thuộc trọng tâm của đợt kiểm thử này |

## 3. Rủi ro và mức ưu tiên

| # | Vùng chức năng | Mức rủi ro | Lý do | Thứ tự kiểm thử |
|---|---|---|---|---|
| 1 | Đăng ký, đăng nhập và khóa tài khoản | Cao | Liên quan đến xác thực người dùng, điều kiện mật khẩu và cơ chế khóa tài khoản | 1 |
| 2 | Giỏ hàng, đặt hàng và tính phí | Cao | Sai sót có thể làm sai số lượng, phí vận chuyển hoặc tổng tiền khách hàng phải thanh toán | 2 |
| 3 | Tìm kiếm, lọc và sắp xếp sản phẩm FR-06 | Trung bình | Là chức năng mới, có nhiều điều kiện kết hợp và có thể hiển thị sai sản phẩm | 3 |

## 4. Chiến lược

| Loại kiểm thử | Phạm vi áp dụng | Công cụ |
|---|---|---|
| Kiểm thử xác nhận | Kiểm tra lại 12 lỗi F-01 đến F-12 | Node.js, PowerShell, Postman hoặc API tương đương |
| Kiểm thử hồi quy | Chạy các kiểm thử đơn vị và kiểm tra các chức năng liên quan sau sửa lỗi | Jest, Node.js |
| Exploratory | Kiểm tra FR-06 theo charter CT-03 trong quá trình sử dụng giao diện | Trình duyệt, DevTools Network, PowerShell |

## 5. Tiêu chí bắt đầu và kết thúc

**Tiêu chí bắt đầu (entry criteria):**
- Có mã nguồn MiniShop NTU phiên bản 1.1.0 và tài liệu SRS v1.2.
- Máy chủ chạy được, các chức năng cần kiểm thử có thể truy cập.

**Tiêu chí kết thúc (exit criteria):**
- Đã thực hiện các trường hợp kiểm thử thuộc phạm vi và ghi nhận kết quả Pass/Fail.
- Các lỗi phát hiện được ghi nhận kèm bằng chứng; báo cáo và kết luận kiểm thử được hoàn thiện.

## 6. Sản phẩm bàn giao

| Sản phẩm | Nơi nộp |
|---|---|
| Kế hoạch kiểm thử | `bai-nop/Buoi04-TestPlan.md` |
| Báo cáo xác nhận và hồi quy | `bai-nop/Buoi04-XacNhan-HoiQuy.md` |
| Báo cáo exploratory | `bai-nop/Buoi04-Exploratory.md` |
| Ảnh minh chứng lỗi | `bai-nop/hinh/` |
| GitHub Issues ghi nhận lỗi | GitHub Issues của repository cá nhân |
