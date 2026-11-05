# BUỔI 4 – KIỂM THỬ THĂM DÒ VÀ BÁO CÁO LỖI

- **Họ tên:** Nguyễn Quốc Bảo
- **MSSV:** 65130195

## 1. Phiên kiểm thử thăm dò (session-based testing)

| Mục | Nội dung |
|---|---|
| Mã charter được giao | CT-03 |
| Nội dung charter | Kiểm thử thăm dò chức năng lọc sản phẩm FR-06 |
| Thời gian bắt đầu | Chưa ghi nhận |
| Thời gian kết thúc | Chưa xác định chính xác |
| Thời lượng thực tế | Chưa xác định |

### 1.1. Nhật ký phiên

| Thời điểm | Đã thử điều gì | Quan sát được |
|---|---|---|
| 14:06:07 | Tìm kiếm từ khóa NTU | Hiển thị đúng 4 sản phẩm có tên chứa NTU. API trả HTTP 200. |
| 14:07:40 | Tìm kiếm từ khóa x123 | Không có sản phẩm phù hợp, giao diện hiển thị thông báo tương ứng. API trả HTTP 200. |
| 14:08:34 | Kết hợp danh mục Quà lưu niệm và khoảng giá 100k–300k | Hiển thị đúng 3 sản phẩm phù hợp. |
| 14:10:11 | Sắp xếp giá tăng dần và giảm dần | Cả hai chế độ đều hiển thị cùng một thứ tự, không đúng yêu cầu giảm dần. |
| 14:14:05 | Sắp xếp Mới nhất | Hiển thị theo ID giảm dần, phù hợp với logic được triển khai trong mã nguồn. |
| 14:16:15 | Bật bộ lọc chỉ hiển thị sản phẩm còn hàng | Vẫn hiển thị cả 7 sản phẩm, bao gồm 2 sản phẩm có tồn kho bằng 0. |
| 14:19:23 | Kiểm tra khoảng giá 100k–300k | Hiển thị đúng 3 sản phẩm. |
| 14:20:47 | Kiểm tra khoảng giá dưới 100k | Hiển thị đúng 2 sản phẩm: Bút ký NTU và Sổ tay sinh viên. |
| 14:22:18 | Kiểm tra khoảng giá trên 300k | Hiển thị đúng 2 sản phẩm: Balo laptop và Áo khoác gió NTU. |
| 14:25:51 (05/11/2026) | Kiểm tra mã nguồn xử lý sắp xếp Mới nhất | Xác nhận chức năng đang sắp xếp theo ID giảm dần. |

### 1.2. Phân bổ thời gian

| Hoạt động | Ước lượng % thời gian |
|---|---:|
| Thiết lập dữ liệu, chuẩn bị | 15% |
| Thăm dò theo charter | 55% |
| Điều tra và thu hẹp hiện tượng bất thường | 20% |
| Ghi chép | 10% |

### 1.3. Phát hiện

| # | Hiện tượng | Có tái hiện được không | Mức nghiêm trọng dự kiến | Đã báo thành issue |
|---|---|---|---|---|
| 1 | Sắp xếp giá giảm dần nhưng kết quả vẫn theo thứ tự tăng dần | Có | Medium | Có – Issue #8 |
| 2 | Bộ lọc sản phẩm còn hàng vẫn hiển thị sản phẩm có tồn kho bằng 0 | Có | High | Có – Issue #9 |

### 1.4. Câu hỏi còn bỏ ngỏ

1. Chức năng Mới nhất hiện sắp xếp theo ID giảm dần. Cần xác nhận ID có luôn phản ánh thời gian tạo sản phẩm trong dữ liệu thực tế hay không.
2. Cần kiểm tra lại các tổ hợp đồng thời giữa từ khóa, danh mục, khoảng giá và tình trạng tồn kho sau khi các lỗi FR-06 được sửa.

## 2. Báo cáo lỗi trên GitHub Issues

| # | Mã lỗi | Tiêu đề issue | Đường dẫn issue | Severity | Priority | Nguồn phát hiện |
|---|---|---|---|---|---|---|
| 1 | BUG-FR06-01 | Sắp xếp giá giảm dần không đúng | [Issue #8](https://github.com/quocbao110805/sot357-65130195/issues/8) | Medium | High | Exploratory CT-03 |
| 2 | BUG-FR06-02 | Bộ lọc còn hàng vẫn hiển thị sản phẩm hết hàng | [Issue #9](https://github.com/quocbao110805/sot357-65130195/issues/9) | High | High | Exploratory CT-03 |

### 2.1. Giải thích lựa chọn Severity và Priority

Đối với BUG-FR06-02, Severity được đánh giá là High vì khách hàng có thể nhìn thấy và lựa chọn sản phẩm đã hết hàng. Điều này gây nhầm lẫn trong quá trình mua sắm và ảnh hưởng đến trải nghiệm đặt hàng. Priority được đánh giá High vì đây là chức năng lọc cơ bản, cần sửa trước khi phát hành để tránh ảnh hưởng đến người dùng.

Đối với BUG-FR06-01, Severity được đánh giá Medium vì chức năng sắp xếp vẫn trả về danh sách sản phẩm nhưng thứ tự không đúng yêu cầu. Priority được đánh giá High vì cần sửa để người dùng có thể sắp xếp sản phẩm theo giá giảm dần chính xác.

### 2.2. Trường hợp Severity và Priority lệch nhau

BUG-FR06-01 có Severity Medium nhưng Priority High. Lỗi không làm mất dữ liệu hoặc ngăn người dùng xem sản phẩm, tuy nhiên cần ưu tiên sửa vì sắp xếp giá là chức năng quan trọng khi người dùng lựa chọn sản phẩm.

## 3. Vòng đời lỗi

| Issue | Trạng thái hiện tại | Phản hồi | Hành động tiếp theo của kiểm thử viên |
|---|---|---|---|
| BUG-FR06-01 – Issue #8 | Open | Chưa ghi nhận phản hồi từ nhóm phát triển | Chờ xử lý, sau đó kiểm thử xác nhận chức năng sắp xếp giá giảm dần |
| BUG-FR06-02 – Issue #9 | Open | Chưa ghi nhận phản hồi từ nhóm phát triển | Chờ xử lý, sau đó kiểm thử xác nhận bộ lọc chỉ hiển thị sản phẩm còn hàng |

Cả hai lỗi đã được tạo thành GitHub Issues để nhóm phát triển theo dõi và xử lý. Tại thời điểm lập báo cáo, chưa có thông tin xác nhận lỗi đã được sửa.

## 4. Kết luận đợt kiểm thử

**Không – phiên bản 1.1.0 chưa đủ điều kiện phát hành.**

Qua kiểm thử thăm dò đã phát hiện 2 lỗi trong chức năng FR-06: sắp xếp giá giảm dần sai và lọc sản phẩm còn hàng không chính xác. Cả hai lỗi đã được báo cáo trên GitHub Issues.

Ngoài ra, kiểm thử xác nhận 12 lỗi cũ cũng ghi nhận F-03 chưa được khắc phục và F-05 mới chỉ khắc phục một phần. Các lỗi này cần được nhóm phát triển xử lý và kiểm thử xác nhận lại trước khi phát hành.