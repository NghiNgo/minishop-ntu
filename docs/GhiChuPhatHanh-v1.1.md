# GHI CHÚ PHÁT HÀNH — MiniShop NTU phiên bản 1.1.0

| Thông tin | Nội dung |
|---|---|
| Phiên bản | 1.1.0 |
| Ngày phát hành | ……/……/20…… |
| Người phát hành | Nhóm phát triển MiniShop |
| Tài liệu yêu cầu áp dụng | SRS v1.2 |

Bản này xử lý các lỗi do nhóm kiểm thử báo cáo sau Buổi 1 đến Buổi 3, đồng thời bổ sung chức năng tìm kiếm và lọc sản phẩm theo yêu cầu mới.

---

## 1. Lỗi đã xử lý

Nhóm phát triển **khẳng định** đã sửa các lỗi sau. Nhiệm vụ của nhóm kiểm thử là xác nhận lại từng mục.

| # | Mô tả lỗi đã báo | Yêu cầu liên quan | Tệp được sửa |
|---|---|---|---|
| F-01 | Hệ thống chấp nhận đăng ký với tuổi 17 | FR-01.3 | `src/services/registration.js` |
| F-02 | Hệ thống chấp nhận mật khẩu dài 21 ký tự | FR-01.4 | `src/services/registration.js` |
| F-03 | Hệ thống chưa kiểm tra mật khẩu phải có cả chữ cái và chữ số | FR-01.4 | `src/services/registration.js` |
| F-04 | Bộ đếm số lần đăng nhập sai không được đặt lại sau khi đăng nhập đúng | FR-02.3 | `src/services/auth.js` |
| F-05 | Tài khoản bị khóa báo "Sai email hoặc mật khẩu" thay vì thông báo bị khóa; chưa tự mở khóa sau 15 phút | FR-02.4 | `src/services/auth.js` |
| F-06 | Thêm sản phẩm với số lượng 0 vẫn thành công | FR-03.2 | `src/services/cart.js` |
| F-07 | Chưa giới hạn tổng số lượng sản phẩm trong giỏ | FR-03.4 | `src/services/cart.js` |
| F-08 | Thêm sản phẩm không tồn tại vẫn trả về thành công | FR-03.6 | `src/services/cart.js` |
| F-09 | Đơn hàng đúng 500.000đ không được miễn phí vận chuyển | FR-04.2 | `src/services/shipping.js` |
| F-10 | Thành viên VIP ở ngoại thành vẫn bị tính phí vận chuyển | FR-04.3 | `src/services/shipping.js` |
| F-11 | Chưa áp dụng giảm giá 5% cho thành viên VIP | FR-05.3 | `src/server.js` |
| F-12 | Hủy đơn hàng không tồn tại gây lỗi 500; chưa kiểm tra trạng thái đơn | FR-05.5 | `src/server.js` |

## 2. Chức năng mới

| # | Mô tả | Yêu cầu |
|---|---|---|
| N-01 | Màn hình **Tìm kiếm và lọc sản phẩm**: lọc theo từ khóa, danh mục, khoảng giá, sắp xếp, chỉ hiện sản phẩm còn hàng | FR-06 |
| N-02 | Danh mục sản phẩm mở rộng từ 5 lên 7 mặt hàng; mỗi sản phẩm có thêm danh mục và số lượng tồn kho | FR-06.1 |

## 3. Phạm vi thay đổi mã nguồn

```
src/services/registration.js    src/services/auth.js
src/services/cart.js            src/services/shipping.js
src/server.js                   src/data/store.js
public/index.html               public/app.js            public/style.css
```

Không thay đổi chữ ký của bất kỳ hàm nào, nên bộ kiểm thử đơn vị viết ở Buổi 3 vẫn chạy được trên bản này.

## 4. Những phần chưa làm

| # | Nội dung | Lý do |
|---|---|---|
| K-01 | Thanh toán trực tuyến, mã giảm giá, quản lý kho | Ngoài phạm vi theo SRS mục 1.2 |
| K-02 | Trừ tồn kho khi đặt hàng thành công | Dự kiến phiên bản sau |

---

> **Lưu ý của nhóm kiểm thử:** ghi chú phát hành là **tuyên bố của nhóm phát triển**, không phải bằng chứng. Mọi mục ở phần 1 đều phải được kiểm thử xác nhận lại, và toàn hệ thống phải được kiểm thử hồi quy vì việc sửa lỗi có thể sinh ra lỗi mới.
