# THỰC HÀNH BUỔI 1
# LÀM QUEN HỆ THỐNG VÀ KIỂM THỬ TĨNH

**Học phần:** Kiểm thử phần mềm (SOT357) · **Thời lượng:** 3 giờ · **Hình thức:** Cá nhân
**Liên quan lý thuyết:** Chương 1 (Tổng quan) và Chương 3 (Kiểm thử tĩnh)

---

## Mục tiêu

Sau buổi thực hành, sinh viên có khả năng:

1. Cài đặt và vận hành được môi trường thực hành (Node.js, Git, VS Code) cùng hệ thống MiniShop NTU.
2. Phân biệt được **Error – Defect – Failure** trên một hệ thống cụ thể.
3. Thực hiện được một buổi **review tài liệu yêu cầu** có cấu trúc: đúng vai trò, dùng checklist, lập biên bản.
4. Sử dụng được công cụ **phân tích tĩnh (ESLint)**, giải thích được cảnh báo và phân biệt lỗi thật với code smell.
5. Nhận ra **giới hạn** của kiểm thử tĩnh và giá trị của nguyên lý kiểm thử sớm (Shift-left).

## Chuẩn bị trước buổi học (bắt buộc)

- [ ] Cài **Node.js LTS** (≥ 18.18) tại https://nodejs.org
- [ ] Cài **Git** tại https://git-scm.com và **VS Code** tại https://code.visualstudio.com
- [ ] Trong VS Code, cài tiện ích **ESLint** (nhà phát hành: Microsoft)
- [ ] Có tài khoản **GitHub** (tên hiển thị và ảnh đại diện đúng với bản thân)
- [ ] **Hoàn thành mục A (Thiết lập ban đầu)** trong `docs/HuongDanNopBai-PullRequest.md`: tạo repo riêng tư `sot357-<MSSV>`, đẩy mã nguồn mẫu lên, mời giảng viên, khai báo link repo
- [ ] Đọc lại slide Chương 1 (Error/Defect/Failure, 7 nguyên lý) và Chương 3 (các loại review, vai trò trong review, static analysis)

## Lịch trình

| Thời gian | Nội dung | Hình thức |
|---|---|---|
| 0:00 – 0:10 | Giới thiệu buổi học, mục tiêu và cách nộp bài | Cả lớp |
| 0:10 – 0:40 | **Phần 1.** Cài đặt môi trường, khám phá MiniShop NTU | Cá nhân |
| 0:40 – 1:55 | **Phần 2.** Review tài liệu SRS | Cá nhân |
| 1:55 – 2:05 | Nghỉ giải lao | |
| 2:05 – 2:40 | **Phần 3.** Phân tích tĩnh mã nguồn với ESLint | Cá nhân |
| 2:40 – 2:50 | Mở Pull Request nộp bài | Cá nhân |
| 2:50 – 3:00 | Thảo luận, tổng kết | Cả lớp |

---

## PHẦN 1. CÀI ĐẶT VÀ KHÁM PHÁ HỆ THỐNG (30 phút · cá nhân)

### 1.1. Cài đặt

1. Mở thư mục repo `sot357-<MSSV>` (đã tạo ở bước chuẩn bị) bằng VS Code, mở terminal (`Ctrl + ` `). Nếu dùng máy phòng lab: làm mục **E** trong hướng dẫn nộp bài (khai báo tên, đăng nhập).
2. Tạo nhánh làm bài: `git checkout -b buoi-01`.
3. Chạy lần lượt: `npm install` → `npm start`.
4. Mở http://localhost:3000. **Chụp màn hình** trình duyệt và terminal đang chạy server.
5. Mở terminal thứ hai, chạy `npm run lint`. Ghi lại kết quả (có bao nhiêu lỗi?).

Gặp sự cố: xem mục 6 trong `README.md` trước khi hỏi giảng viên.

Ảnh chụp màn hình đặt trong thư mục `bai-nop/hinh/`, đặt tên có MSSV (ví dụ `64130001-server.png`).

### 1.2. Khám phá hệ thống: Error – Defect – Failure

Nhắc lại: **Error** (sai lầm của con người) → tạo ra **Defect** (khiếm khuyết trong sản phẩm: mã nguồn, tài liệu) → khi được thực thi có thể gây ra **Failure** (hành vi sai quan sát được).

Thực hiện các kịch bản sau, **ghi kết quả vào** `bai-nop/Buoi01-Phan1-KhamPha.md`.

**Kịch bản 1.** Tại mục *Đăng ký*, nhập: họ tên bất kỳ, email `test17@ntu.edu.vn`, tuổi `17`, mật khẩu `Matkhau123`. Nhấn *Đăng ký*.
- Kết quả thực tế là gì? So với tài liệu SRS (`docs/SRS-MiniShop-v1.0.md`), đây có phải failure không?
- Mở `src/services/registration.js`, tìm **defect** (ghi rõ số dòng).
- Theo bạn, **error** nào của con người đã dẫn tới defect này?

**Kịch bản 2.** Đăng nhập bằng `sv@ntu.edu.vn / Matkhau123`. Thêm vào giỏ 1 *Balo laptop* và 1 *Áo thun NTU*. Chọn khu vực *Nội thành*, nhấn *Tính phí vận chuyển*.
- Tạm tính bằng bao nhiêu? Phí vận chuyển bằng bao nhiêu?
- Đọc mục FR-04.2 **và** Phụ lục A của SRS. Hệ thống đúng hay sai? Bạn có kết luận được không? Vì sao?

**Kịch bản 3 (tự do, 5 phút).** Tự khám phá hệ thống và ghi lại **ít nhất 1 hiện tượng** mà bạn cho là bất thường (mô tả các bước làm, kết quả mong đợi, kết quả thực tế).

---

## PHẦN 2. REVIEW TÀI LIỆU YÊU CẦU (75 phút · cá nhân)

Tài liệu cần review: **`docs/SRS-MiniShop-v1.0.md`** (bản nháp do bộ phận phân tích nghiệp vụ soạn, sắp được chuyển cho lập trình viên).

Trong thực tế, review tài liệu là hoạt động có nhiều người tham gia với các vai trò Moderator, Author, Reviewer và Scribe. Ở buổi thực hành này, mỗi sinh viên thực hiện **vai trò Reviewer một cách độc lập**; bước rà soát chung do giảng viên điều phối ở cuối phần sẽ mô phỏng cuộc họp review.

### 2.1. Quy trình thực hiện

| Bước | Thời gian | Hoạt động |
|---|---|---|
| 1. Đọc tổng quan | 10 phút | Đọc lướt toàn bộ SRS để nắm phạm vi và cấu trúc tài liệu, chưa ghi lỗi |
| 2. Review độc lập | 35 phút | Đối chiếu từng mục với checklist ở 2.2, ghi mọi lỗi phát hiện được vào phiếu review. **Làm việc độc lập, không trao đổi** |
| 3. Rà soát chung | 20 phút | Giảng viên điều phối, đi lần lượt từng mục của SRS; sinh viên lần lượt trình bày lỗi mình tìm được. Mỗi lỗi nghe được từ bạn khác mà mình chưa có thì bổ sung vào phiếu và **đánh dấu ở cột Nguồn phát hiện** |
| 4. Hoàn thiện | 10 phút | Phân loại, xác định mức độ, đề xuất sửa và ghi kết luận review |

Điểm số của phần này căn cứ trên **số lỗi tự phát hiện ở bước 2**, không tính lỗi bổ sung ở bước 3. Vì vậy việc ghi trung thực cột *Nguồn phát hiện* là bắt buộc; ghi sai bị coi là gian lận học thuật.

### 2.2. Checklist review yêu cầu

| Mã | Câu hỏi kiểm tra | Loại lỗi nếu vi phạm |
|---|---|---|
| CL-01 | Mỗi yêu cầu có thể hiểu theo **đúng một cách** không? Có từ ngữ cảm tính như "nhanh", "hợp lý", "đủ mạnh", "thân thiện"…? | **MƠ HỒ** |
| CL-02 | Hai yêu cầu (hoặc yêu cầu và ví dụ, bảng, hình) có **nói ngược nhau** không? | **MÂU THUẪN** |
| CL-03 | Yêu cầu đã mô tả đủ: dữ liệu vào, kết quả, **trường hợp lỗi/ngoại lệ**, điều kiện biên, trạng thái? | **THIẾU** |
| CL-04 | Có thể viết một ca kiểm thử với **kết quả mong đợi rõ ràng** cho yêu cầu này không? | **KHÔNG KIỂM THỬ ĐƯỢC** |
| CL-05 | Yêu cầu có **thực hiện được** trong thực tế (kỹ thuật, chi phí) không? | **KHÔNG KHẢ THI** |
| CL-06 | Mọi thuật ngữ đã được **định nghĩa** và dùng **nhất quán** trong toàn tài liệu? | **THUẬT NGỮ** |
| CL-07 | Số liệu, ví dụ minh họa có **chính xác** so với quy tắc? | **SAI SỐ LIỆU** |
| CL-08 | Mọi bước trong ca sử dụng (use case) đều có **yêu cầu chức năng** tương ứng? | **THIẾU** |
| CL-09 | Với dữ liệu số: đã rõ **kiểu dữ liệu**, **giá trị nhỏ nhất/lớn nhất**, biên có bao gồm hay không? | **THIẾU / MƠ HỒ** |

Mức độ nghiêm trọng của lỗi tài liệu:
- **Major (Nghiêm trọng):** nếu không sửa, lập trình viên hoặc kiểm thử viên có thể hiểu sai và làm sai chức năng.
- **Minor (Nhẹ):** lỗi trình bày, chính tả, không ảnh hưởng tới cách hiểu.

### 2.3. Kết quả cần nộp

Điền **`bai-nop/Buoi01-Phan2-PhieuReview.md`**. Mỗi lỗi ghi rõ: vị trí (mã yêu cầu), mô tả, mã checklist, loại lỗi, mức độ, nguồn phát hiện và đề xuất sửa.

---

## PHẦN 3. PHÂN TÍCH TĨNH VỚI ESLINT (35 phút · cá nhân)

File cần phân tích: **`src/lab-static/orderUtils.js`** – các hàm tiện ích xử lý đơn hàng do một lập trình viên mới viết. **Không chạy file này**, chỉ phân tích tĩnh.

### 3.1. Chạy công cụ
```bash
npm run lint:lab
```
Chụp màn hình kết quả. Ghi tổng số `error` và `warning`.

### 3.2. Phân tích từng cảnh báo
Với **mỗi** dòng ESLint báo, điền vào bảng trong `bai-nop/Buoi01-Phan3-PhanTichTinh.md`:
- Dòng, tên quy tắc (rule);
- Giải thích **bằng lời của bạn** vấn đề là gì;
- Nếu chương trình chạy, điều gì có thể xảy ra?
- Phân loại:
  - **DEFECT** – chắc chắn gây kết quả sai hoặc làm chương trình dừng;
  - **SMELL** – không gây sai ngay nhưng làm mã khó đọc, khó bảo trì, dễ phát sinh lỗi về sau;
  - **CHẤP NHẬN** – cảnh báo không cần sửa trong ngữ cảnh này (giải thích vì sao).

Gợi ý: tra cứu ý nghĩa mỗi rule tại `https://eslint.org/docs/latest/rules/<tên-rule>`.

### 3.3. Sửa mã nguồn
Sửa `orderUtils.js` cho đến khi `npm run lint:lab` **không còn lỗi**.

> Sửa theo **đúng ý đồ** được mô tả trong chú thích của từng hàm và theo SRS, **không phải chỉ để hết cảnh báo**. Một cách sửa làm ESLint "im lặng" nhưng làm hàm chạy sai vẫn bị tính là sai.

### 3.4. Giới hạn của phân tích tĩnh
Sau khi ESLint đã sạch, đọc lại toàn bộ file và so với chú thích + SRS. Tìm **ít nhất 2 lỗi logic** mà ESLint **không** phát hiện được. Ghi vào mục cuối của file bài nộp.

### 3.5. (Không bắt buộc) Shift-left ngay trong trình soạn thảo
Mở `orderUtils.js` bản gốc trong VS Code (đã cài tiện ích ESLint). Quan sát các gạch chân đỏ/vàng. Viết 1–2 câu: lợi ích của việc phát hiện lỗi ngay khi đang gõ mã so với khi đã chạy chương trình?

---

## NỘP BÀI (bằng Pull Request)

Làm theo mục **B** trong `docs/HuongDanNopBai-PullRequest.md`. Tóm tắt:

| Nội dung | Repo | Nhánh | File được sửa | Hạn |
|---|---|---|---|---|
| Toàn bộ Buổi 1 | `sot357-<MSSV>` | `buoi-01` | `bai-nop/Buoi01-Phan1-KhamPha.md`, `bai-nop/Buoi01-Phan2-PhieuReview.md`, `bai-nop/Buoi01-Phan3-PhanTichTinh.md`, `bai-nop/hinh/`, `src/lab-static/orderUtils.js` | **Mở PR** trước khi kết thúc buổi; Phần 3 được **push thêm commit** vào cùng PR đến **23:59** cùng ngày |

- Tiêu đề PR: `[Buổi 1] <Họ tên> – <MSSV>`.
- Mục **Reviewers**: chọn giảng viên.
- Sau khi mở PR, kiểm tra tự động sẽ chạy. Dấu báo lỗi ở mục ESLint lúc cuối giờ là bình thường nếu sinh viên chưa sửa xong Phần 3.
- Thời điểm nộp được tính theo **thời điểm push lên GitHub** (hiển thị trên dòng thời gian của PR).
- **Không tự Merge.** Chỉ merge sau khi giảng viên *Approve*.

Trường hợp không truy cập được GitHub (sự cố mạng, tài khoản…), báo ngay giảng viên trong buổi học để được nộp dự phòng qua hệ thống học tập.

## THANG ĐIỂM (10 điểm)

| Phần | Tiêu chí | Điểm |
|---|---|---|
| 1 | Môi trường chạy được (ảnh chụp server + trang web + kết quả `npm run lint`) | 0,5 |
| 1 | Trả lời đúng và có lập luận cho kịch bản 1, 2; kịch bản 3 mô tả tái hiện được | 1,5 |
| 2 | Số lỗi hợp lệ **tự phát hiện** trong SRS (không tính lỗi bổ sung ở bước rà soát chung) | 3,0 |
| 2 | Phân loại, mức độ, đề xuất sửa hợp lý | 1,5 |
| 2 | Phiếu review ghi đủ thời gian các bước, phân biệt trung thực lỗi tự tìm và lỗi bổ sung, có kết luận review | 0,5 |
| 3 | Bảng phân tích đầy đủ, giải thích đúng | 1,0 |
| 3 | Phân loại DEFECT/SMELL/CHẤP NHẬN hợp lý | 0,5 |
| 3 | Mã đã sửa: sạch ESLint **và** đúng ý đồ | 1,0 |
| 3 | Tìm được lỗi logic mà ESLint bỏ sót | 0,5 |
| | **Tổng** | **10** |

**Trừ điểm quy trình nộp bài** (tối đa −1,0): sai tên nhánh hoặc sửa file ngoài phạm vi mà không khắc phục (−0,5); tự merge khi chưa được Approve (−0,5); repo để chế độ Public (−0,5).
