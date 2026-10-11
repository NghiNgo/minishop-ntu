# BUỔI 4 – KIỂM THỬ XÁC NHẬN VÀ KIỂM THỬ HỒI QUY

<!-- CHUA_DIEN: xóa dòng này sau khi đã điền xong file -->

- **Họ tên:**
- **MSSV:**

## 1. Kiểm thử xác nhận

Với mỗi mục trong phần 1 của `docs/GhiChuPhatHanh-v1.1.md`, chạy lại ca kiểm thử tương ứng và kết luận.

Cột **Kết luận** nhận một trong ba giá trị:
- `ĐÃ SỬA` — hành vi đúng hoàn toàn theo SRS v1.2;
- `SỬA CHƯA TRỌN` — có cải thiện nhưng vẫn còn sai lệch so với yêu cầu;
- `CHƯA SỬA` — hành vi không đổi.

| Mã | Lỗi đã báo | Mã ca kiểm thử dùng lại | Kết quả thực tế trên v1.1 | Kết luận | Ghi chú |
|---|---|---|---|---|---|
| F-01 | Chấp nhận tuổi 17 | | | | |
| F-02 | Chấp nhận mật khẩu 21 ký tự | | | | |
| F-03 | Không kiểm tra thành phần mật khẩu | | | | |
| F-04 | Bộ đếm sai không được đặt lại | | | | |
| F-05 | Thông báo khi bị khóa, tự mở khóa | | | | |
| F-06 | Chấp nhận số lượng 0 | | | | |
| F-07 | Không giới hạn tổng số lượng giỏ | | | | |
| F-08 | Thêm sản phẩm không tồn tại | | | | |
| F-09 | Đơn đúng 500.000đ không miễn phí | | | | |
| F-10 | VIP ngoại thành vẫn bị tính phí | | | | |
| F-11 | Chưa giảm 5% cho VIP | | | | |
| F-12 | Hủy đơn không tồn tại gây lỗi 500 | | | | |

**Tổng hợp:** ĐÃ SỬA …… / SỬA CHƯA TRỌN …… / CHƯA SỬA ……

## 2. Kiểm thử hồi quy bằng bộ kiểm thử đơn vị

Chạy `npm test` trên bản v1.1 và so sánh với kết quả đã ghi ở Buổi 3.

| Chỉ số | Buổi 3 (v1.0) | Buổi 4 (v1.1) |
|---|---|---|
| Tổng số ca | | |
| Số ca đạt | | |
| Số ca thất bại | | |

### 2.1. Ca chuyển từ thất bại sang đạt

| Tên ca kiểm thử | Lỗi tương ứng đã được sửa |
|---|---|
| | |
| | |

### 2.2. Ca chuyển từ đạt sang thất bại (lỗi hồi quy)

Đây là phần quan trọng nhất của buổi học: bản sửa lỗi đã làm hỏng thứ vốn đang chạy đúng.

| Tên ca kiểm thử | Kết quả mong đợi | Kết quả thực tế trên v1.1 | Nguyên nhân: lỗi hồi quy của mã nguồn, hay ca kiểm thử đã lỗi thời? | Căn cứ (SRS v1.2) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

> Một ca đang xanh chuyển sang đỏ **không phải lúc nào cũng** là lỗi mã nguồn. Nếu yêu cầu thay đổi hoặc hành vi cũ vốn đã sai, chính ca kiểm thử mới là thứ cần cập nhật. Trường hợp đó, ghi rõ ở bảng trên và sửa ca kiểm thử.

## 3. Kiểm thử hồi quy trên chức năng mới FR-06

Chạy bộ ca pairwise (bài tự chọn Buổi 2) hoặc tự thiết kế tối thiểu 6 ca cho màn hình lọc.

| # | Từ khóa | Danh mục | Khoảng giá | Sắp xếp | Chỉ còn hàng | Kết quả mong đợi | Kết quả thực tế | Pass/Fail |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |
| 6 | | | | | | | | |

## 4. Ma trận truy vết cập nhật

| Yêu cầu | Mã ca phủ | Trạng thái trên v1.1 (Đạt / Không đạt / Chưa phủ) |
|---|---|---|
| FR-01.3 | | |
| FR-01.4 | | |
| FR-02.3 | | |
| FR-02.4 | | |
| FR-03.2 | | |
| FR-03.4 | | |
| FR-03.6 | | |
| FR-04.2 | | |
| FR-04.3 | | |
| FR-05.2 | | |
| FR-05.3 | | |
| FR-05.5 | | |
| FR-06.2 | | |
| FR-06.3 | | |
| FR-06.4 | | |
| FR-06.5 | | |
| FR-06.6 | | |
| FR-06.7 | | |
