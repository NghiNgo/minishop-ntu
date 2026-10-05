# THỰC HÀNH BUỔI 3
# KIỂM THỬ ĐƠN VỊ VÀ BAO PHỦ MÃ NGUỒN
### Tài liệu hướng dẫn thực hành từng bước

**Học phần:** Kiểm thử phần mềm (SOT357) · **Thời lượng:** 3 giờ · **Hình thức:** Cá nhân
**Liên quan lý thuyết:** Chương 2 (Kiểm thử đơn vị) và Chương 4 (phần hộp trắng)
**Tài liệu gốc:** `docs/SRS-MiniShop-v1.1.md` · **Đầu vào:** bộ ca kiểm thử đã nộp ở Buổi 2

---

## CẤU TRÚC TÀI LIỆU

Mỗi phần thực hành được trình bày theo bốn mục, luôn cùng một thứ tự:

| Mục | Nội dung |
|---|---|
| **Cơ sở lý thuyết** | Tóm tắt kỹ thuật trong 5–6 dòng, đủ để thực hiện bài tập |
| **Ví dụ minh họa** | Mã nguồn mẫu đã chạy được, nằm trong `tests/vi-du/` |
| **Yêu cầu thực hiện** | Phần bài tập phải làm, kèm quy trình từng bước |
| **Tự kiểm tra trước khi tiếp tục** | Danh mục tự kiểm trước khi chuyển sang phần kế tiếp |

Các ví dụ minh họa dùng bài toán xếp loại điểm sinh viên, nằm ngoài MiniShop, nhằm minh họa kỹ thuật mà không làm lộ đáp án của bài tập.

## Mục tiêu

Sau buổi thực hành, sinh viên có khả năng:

1. Viết được ca kiểm thử đơn vị bằng **Jest** với cấu trúc `describe / test / expect`.
2. Chuyển bộ ca kiểm thử thiết kế trên giấy thành **kiểm thử hướng dữ liệu** (`test.each`) chạy tự động.
3. Phân tích được một ca kiểm thử thất bại để kết luận **lỗi nằm ở mã nguồn hay ở ca kiểm thử**.
4. Đo và đọc được **bao phủ câu lệnh và bao phủ nhánh**, giải thích vì sao 100% câu lệnh chưa đủ.
5. Dùng **mock** để cô lập đơn vị cần kiểm thử khỏi các phụ thuộc.

## Chuẩn bị trước buổi học

- [ ] Pull Request Buổi 2 đã được duyệt và merge vào `main`
- [ ] Ôn lại cú pháp JavaScript: hàm mũi tên, destructuring, `module.exports` và `require`
- [ ] Đọc lại bộ ca kiểm thử của mình ở Buổi 2, đặc biệt file `bai-nop/Buoi02-DuLieuKiemThu.csv`

## Lịch trình

| Thời gian | Nội dung |
|---|---|
| 0:00 – 0:10 | **Bước 0.** Nhận tài liệu, cài Jest, chạy thử ví dụ mẫu |
| 0:10 – 0:25 | Giảng viên trình bày ví dụ minh họa trong `tests/vi-du/` |
| 0:25 – 1:05 | **Phần 1.** Kiểm thử hướng dữ liệu từ bộ ca Buổi 2 |
| 1:05 – 1:25 | **Phần 2.** Phân tích các ca thất bại |
| 1:25 – 1:35 | Nghỉ giải lao |
| 1:35 – 2:15 | **Phần 3.** Đo và nâng bao phủ nhánh |
| 2:15 – 2:45 | **Phần 4.** Kiểm thử với mock |
| 2:45 – 3:00 | Hoàn thiện báo cáo, mở Pull Request |

---

# BƯỚC 0. CHUẨN BỊ (10 phút)

## 0.1. Nhận tài liệu mới

```bash
git checkout main
git pull upstream main
git push origin main
git checkout -b buoi-03
npm install                 # cài Jest (lần đầu, khoảng 1 phút)
```

Nếu `git pull` báo xung đột ở `package-lock.json`, lấy bản của giảng viên rồi cài lại:

```bash
git checkout upstream/main -- package-lock.json package.json
npm install
git add package.json package-lock.json
git commit -m "Nhan cau hinh Jest tu repo mau"
```

## 0.2. Chạy thử ví dụ mẫu

```bash
npx jest tests/vi-du
```

Kết quả đúng là **9 ca kiểm thử đạt**. Nếu lệnh chạy được, môi trường đã sẵn sàng.

## 0.3. Những gì vừa được thêm vào repo

| Đường dẫn | Vai trò |
|---|---|
| `tests/vi-du/` | Ví dụ minh họa, **không sửa** |
| `tests/helpers/doc-csv.js` | Tiện ích đọc file CSV Buổi 2, **không sửa** |
| `tests/unit/du-lieu-csv.test.js` | Khung bài Phần 1 |
| `tests/unit/do-phu.test.js` | Khung bài Phần 3 |
| `tests/unit/auth-mock.test.js` | Khung bài Phần 4 |
| `bai-nop/Buoi03-PhanTichKetQua.md` | Báo cáo Phần 2 |
| `bai-nop/Buoi03-DoPhu.md` | Báo cáo Phần 3 |

Các lệnh npm mới:

| Lệnh | Tác dụng |
|---|---|
| `npm test` | Chạy toàn bộ ca kiểm thử |
| `npm run coverage` | Chạy kèm đo bao phủ, kết quả xem ở `coverage/lcov-report/index.html` |
| `npx jest <đường-dẫn>` | Chạy riêng một file hoặc một thư mục |
| `npm run test:watch` | Tự chạy lại mỗi khi lưu file |

---

# PHẦN 1. KIỂM THỬ HƯỚNG DỮ LIỆU (40 phút)

## 1.1. Cơ sở lý thuyết

- Một ca kiểm thử Jest gồm ba phần: **chuẩn bị dữ liệu**, **gọi hàm**, **so sánh kết quả** bằng `expect`.
- `describe` gom nhóm các ca liên quan; tên nhóm và tên ca nên đọc như một câu tiếng Việt mô tả hành vi.
- Khi nhiều ca chỉ khác nhau ở **dữ liệu**, dùng `test.each(mảng)` thay vì chép đi chép lại. Đây chính là cách biến một bảng ca kiểm thử thành mã nguồn.
- Phép so sánh thường dùng: `toBe` (giá trị nguyên thủy), `toEqual` (đối tượng, mảng), `toContain` (phần tử trong mảng), `toThrow` (hàm phải ném lỗi).

## 1.2. Ví dụ minh họa

Mở `tests/vi-du/xep-loai.test.js`, đọc **khối 1 và khối 2**. Khối 2 minh họa đúng kỹ thuật cần dùng ở phần này: một mảng dữ liệu, mỗi phần tử là một ca, và một `test.each` duy nhất sinh ra toàn bộ ca kiểm thử.

Lưu ý cách đặt tên ca: `'$maCa: điểm $diem -> $mongDoi'`. Jest tự thay các biến `$...` bằng giá trị của từng dòng dữ liệu, nhờ đó khi một ca thất bại, báo cáo chỉ thẳng mã ca bị sai.

## 1.3. Yêu cầu thực hiện

Mở `tests/unit/du-lieu-csv.test.js`. Khối đầu tiên dành cho `validateRegistration` **đã được viết sẵn làm mẫu**. Nhiệm vụ là hoàn thành hai khối còn lại.

**TODO (1) — `validateQuantity`:**
- Hàm nhận một tham số là số lượng: `validateQuantity(thamSo.qty)`;
- Hàm trả về `true` hoặc `false`, phải quy đổi sang `'HOP_LE'` / `'KHONG_HOP_LE'` rồi mới so sánh;
- Xóa khối `test('TODO: thay khối này...')`.

**TODO (2) — `calcShippingFee`:**
- Hàm nhận trọn một đối tượng: `calcShippingFee(thamSo)`;
- Giá trị trong CSV là chuỗi, phải đổi sang số bằng `Number(ketQuaKyVong)`.

Chạy:

```bash
npx jest tests/unit/du-lieu-csv
```

**Sẽ có một số ca thất bại. Đó là điều được mong đợi** — MiniShop có lỗi cài sẵn. Không sửa mã nguồn trong `src/`, cũng không sửa kết quả mong đợi cho khớp với hành vi hiện tại. Việc phân tích thuộc Phần 2.

Nếu Jest báo lỗi `Buoi02-DuLieuKiemThu.csv không có dòng nào cho hàm ...`, nghĩa là bài Buổi 2 còn thiếu dòng cho hàm đó. Hãy bổ sung vào file CSV, vì bộ dữ liệu của chính mình là đầu vào của buổi này.

## 1.4. Tự kiểm tra trước khi tiếp tục

- [ ] Ba khối `describe` đều dùng `test.each`, không còn khối `TODO`
- [ ] Số ca kiểm thử chạy ra bằng đúng số dòng trong `Buoi02-DuLieuKiemThu.csv`
- [ ] Mỗi ca thất bại đều hiện rõ mã ca trong tên, ví dụ `TC-64130001-12`
- [ ] Chưa sửa bất kỳ file nào trong `src/`

---

# PHẦN 2. PHÂN TÍCH CÁC CA THẤT BẠI (20 phút)

## 2.1. Cơ sở lý thuyết

Một ca kiểm thử thất bại chỉ nói rằng **kết quả thực tế khác kết quả mong đợi**. Nó không nói bên nào sai. Có ba khả năng:

| Phân loại | Nghĩa là | Hành động đúng |
|---|---|---|
| **LỖI MÃ NGUỒN** | Mã nguồn không làm đúng SRS v1.1 | Báo lỗi cho nhóm phát triển (Buổi 4) |
| **LỖI CA KIỂM THỬ** | Ca kiểm thử hiểu sai yêu cầu hoặc ghi sai kết quả mong đợi | Sửa ca kiểm thử |
| **YÊU CẦU CHƯA RÕ** | SRS không đủ căn cứ để kết luận | Hỏi lại bộ phận phân tích nghiệp vụ |

Kiểm thử viên thiếu kinh nghiệm thường mắc một lỗi nguy hiểm: thấy ca đỏ liền sửa kết quả mong đợi cho khớp với hành vi thực tế. Làm vậy là **hợp thức hóa lỗi** và biến bộ kiểm thử thành vô dụng.

## 2.2. Ví dụ minh họa

Giả sử ca `VD-02` mong đợi điểm 8.49 xếp loại Khá nhưng chương trình trả về Giỏi.

- Nếu quy tắc ghi rõ "từ 8.5 trở lên là Giỏi" thì đây là **LỖI MÃ NGUỒN**, có thể do lập trình viên viết `>= 8.4`.
- Nếu quy tắc chỉ ghi "khoảng 8.5" thì đây là **YÊU CẦU CHƯA RÕ**.
- Nếu quy tắc ghi "trên 8.4 là Giỏi" thì chính ca kiểm thử sai, tức **LỖI CA KIỂM THỬ**.

Cùng một hiện tượng, ba kết luận khác nhau, và điều quyết định luôn là **tài liệu yêu cầu**.

## 2.3. Yêu cầu thực hiện

Điền `bai-nop/Buoi03-PhanTichKetQua.md`:

1. **Mục 1:** chạy `npm test`, ghi lại tổng số ca, số đạt, số thất bại.
2. **Mục 2:** với **mỗi** ca thất bại, điền một dòng gồm mã ca, kết quả mong đợi, kết quả thực tế, phân loại nguyên nhân và **mã yêu cầu trong SRS v1.1** làm căn cứ. Không có căn cứ thì không được kết luận là lỗi mã nguồn.
3. **Mục 3:** đối chiếu với 5 ca đã chạy tay ở Buổi 2.
4. **Mục 4:** ghi nhận trung thực những ca phải sửa khi chuyển từ bảng sang mã. Nếu ở Buổi 2 cột `KetQuaMongDoi` viết mơ hồ, chính lúc này sẽ thấy hậu quả.

Nếu kết luận một ca là **LỖI CA KIỂM THỬ**, hãy sửa lại ca đó trong `Buoi02-DuLieuKiemThu.csv` và ghi rõ ở mục 4. Đây là trường hợp duy nhất được phép sửa dữ liệu Buổi 2.

## 2.4. Tự kiểm tra trước khi tiếp tục

- [ ] Mọi ca thất bại đều có một dòng phân tích
- [ ] Mỗi dòng phân loại LỖI MÃ NGUỒN đều dẫn được một mã yêu cầu cụ thể
- [ ] Không sửa kết quả mong đợi chỉ để ca kiểm thử chuyển sang xanh

---

# PHẦN 3. BAO PHỦ MÃ NGUỒN (40 phút)

## 3.1. Cơ sở lý thuyết

- **Bao phủ câu lệnh (statement coverage):** tỷ lệ dòng lệnh được thực thi ít nhất một lần.
- **Bao phủ nhánh (branch coverage):** tỷ lệ **nhánh rẽ** được đi qua. Một câu `if` có hai nhánh: điều kiện đúng và điều kiện sai.
- Một hàm có thể đạt 100% câu lệnh mà chỉ 50% nhánh, vì nhánh "không vào `if`" chưa bao giờ xảy ra.
- Bao phủ cao **không** đồng nghĩa với không còn lỗi. Nó chỉ cho biết phần nào của mã **chưa từng được chạy**, tức là chắc chắn chưa được kiểm thử.

## 3.2. Ví dụ minh họa

```bash
npx jest tests/vi-du --coverage --collectCoverageFrom="tests/vi-du/xep-loai.js"
```

Quan sát bảng kết quả: hàm `xepLoai` có bốn mức xếp loại, mỗi mức là một nhánh. Nếu bỏ ca `VD-05` (điểm 4.99), nhánh "Yếu" không bao giờ chạy và bao phủ nhánh tụt xuống, trong khi bao phủ câu lệnh gần như không đổi.

## 3.3. Yêu cầu thực hiện

**Bước 1 — Đo lần đầu.** Chạy `npm run coverage` khi mới có ca của Phần 1. Ghi bảng số liệu vào mục 1 của `bai-nop/Buoi03-DoPhu.md`.

**Bước 2 — Tìm nhánh chưa phủ.** Mở `coverage/lcov-report/index.html` bằng trình duyệt, bấm vào từng file. Dòng tô vàng là nhánh chưa đi qua, dòng tô đỏ là câu lệnh chưa chạy. Ghi vào mục 2.

**Bước 3 — Bổ sung ca.** Mở `tests/unit/do-phu.test.js`, hoàn thành **TODO (3)** và **TODO (4)** để đạt **100% bao phủ nhánh** cho `src/services/shipping.js` và `src/services/cart.js`.

Gợi ý cho những nhánh khó thấy:
- `calcShippingFee` ném lỗi trong hai trường hợp khác nhau, kiểm bằng `expect(() => ...).toThrow(...)`;
- `cartDetail` có một nhánh chỉ chạy khi sản phẩm **không tồn tại** trong danh mục;
- `getCart` có một nhánh chỉ chạy với email **chưa từng có giỏ hàng**.

**Bước 4 — Đo lại và trả lời câu hỏi.** Ghi số liệu mới vào mục 3 và trả lời ba câu ở mục 4.

## 3.4. Tự kiểm tra trước khi tiếp tục

- [ ] `npm run coverage` cho thấy `shipping.js` và `cart.js` đạt **100% Branch**
- [ ] Các ca bổ sung đều có kết quả mong đợi dẫn từ SRS, không viết cho đủ chỉ tiêu
- [ ] Mục 2 của báo cáo giải thích được **vì sao** bộ ca Phần 1 không chạm tới các nhánh đó

---

# PHẦN 4. KIỂM THỬ VỚI MOCK (30 phút)

## 4.1. Cơ sở lý thuyết

- **Kiểm thử đơn vị** phải kiểm một đơn vị **một cách độc lập**. Khi đơn vị đó gọi sang mô-đun khác (cơ sở dữ liệu, dịch vụ thanh toán, kho dữ liệu dùng chung), ta thay mô-đun kia bằng một bản giả gọi là **mock**.
- Mock mang lại ba thứ: dữ liệu **ổn định**, khả năng tạo ra **tình huống khó dựng** (ví dụ lỗi mạng), và khả năng **kiểm tra tương tác** — hàm kia có được gọi không, gọi với tham số gì.
- Trong Jest: `jest.mock('đường-dẫn')` thay toàn bộ mô-đun; `mockReturnValue` và `mockImplementation` quy định hành vi; `toHaveBeenCalledWith` kiểm tra tương tác.
- Luôn đặt `jest.resetAllMocks()` trong `beforeEach` để các ca không ảnh hưởng lẫn nhau.

## 4.2. Ví dụ minh họa

Đọc **khối 3** trong `tests/vi-du/xep-loai.test.js`. Hàm `xepLoaiTheoMssv` phụ thuộc vào `kho-diem.js`. Sau khi mock, ca kiểm thử tự quyết định điểm trả về, nên kiểm được mọi mức xếp loại mà không cần dữ liệu thật, và cũng kiểm được trường hợp kho dữ liệu ném lỗi.

## 4.3. Yêu cầu thực hiện

Nghiệp vụ khóa tài khoản trong `src/services/auth.js` đọc người dùng từ `src/data/store.js`. Nếu dùng dữ liệu thật, một ca làm khóa tài khoản sẽ khiến các ca sau chạy sai, và thứ tự chạy quyết định kết quả — đó là dấu hiệu của bộ kiểm thử kém.

Mở `tests/unit/auth-mock.test.js`, hoàn thành **TODO (5)**: viết thêm ít nhất 4 ca, bám theo bộ ca chuyển trạng thái đã thiết kế ở Buổi 2:

- email không tồn tại;
- sai mật khẩu 2 lần, tài khoản chưa bị khóa;
- sai mật khẩu đủ `MAX_FAILED_ATTEMPTS` lần liên tiếp, tài khoản bị khóa;
- đăng nhập đúng sau 2 lần sai, bộ đếm trở về 0 (FR-02.3);
- tài khoản đang bị khóa, nhập đúng mật khẩu vẫn bị từ chối kèm thông báo khóa (FR-02.4).

Hai ca cuối sẽ thất bại. Phân tích chúng trong báo cáo Phần 2 như các ca khác.

## 4.4. Tự kiểm tra trước khi tiếp tục

- [ ] File dùng `jest.mock` và điều khiển hành vi bằng `mockImplementation`
- [ ] Có `jest.resetAllMocks()` trong `beforeEach`
- [ ] Chạy `npx jest tests/unit/auth-mock` nhiều lần cho kết quả **giống hệt nhau**
- [ ] Đổi thứ tự các ca trong file không làm thay đổi kết quả

---

# NỘP BÀI

| Nội dung | Repo | Nhánh | Hạn |
|---|---|---|---|
| Toàn bộ Buổi 3 | `sot357-<MSSV>` | `buoi-03` | **Mở PR** trước khi kết thúc buổi; push bổ sung đến **23:59 cùng ngày** |

```bash
git add tests/unit bai-nop
git commit -m "Buoi 3: kiem thu don vi va bao phu ma nguon"
git push -u origin buoi-03
```

File được phép sửa: `tests/unit/*.test.js`, `bai-nop/Buoi03-*.md`, `bai-nop/hinh/`. Trường hợp sửa ca kiểm thử sai ở Phần 2 thì được phép sửa thêm `bai-nop/Buoi02-DuLieuKiemThu.csv`.

**Không sửa bất kỳ file nào trong `src/`.** Việc sửa lỗi mã nguồn là của nhóm phát triển, sẽ thấy kết quả ở Buổi 4.

Kiểm tra tự động sẽ chạy Jest, đếm số ca và đo bao phủ. **Ca kiểm thử thất bại do lỗi cài sẵn không bị tính là lỗi bài nộp**; kiểm tra chỉ báo đỏ khi còn mục TODO, thiếu kỹ thuật bắt buộc, hoặc bao phủ nhánh chưa đạt.

## Bảng tra lỗi của kiểm tra tự động

| Thông báo | Nguyên nhân | Cách khắc phục |
|---|---|---|
| *còn N mục TODO chưa làm* | Chưa xóa dòng chú thích TODO sau khi hoàn thành | Xóa dòng `// TODO (n): ...` |
| *còn khối mẫu "TODO: thay khối này"* | Chưa thay khối giữ chỗ bằng `test.each` | Viết `test.each` rồi xóa khối cũ |
| *cần dùng test.each cho cả ba hàm* | Một khối còn viết thủ công | Chuyển sang `test.each` |
| *phải dùng jest.mock* | Phần 4 chưa mock kho dữ liệu | Thêm `jest.mock('../../src/data/store')` |
| *Mới có N ca kiểm thử, cần ít nhất 30* | Bộ ca còn mỏng, thường do CSV Buổi 2 thiếu dòng | Bổ sung dòng vào CSV và ca ở Phần 3 |
| *N tập test không chạy được* | Lỗi cú pháp, hoặc `describe` không chứa ca nào | Chạy `npx jest` xem thông báo chi tiết |
| *bao phủ nhánh mới đạt X%* | Còn nhánh chưa phủ | Mở báo cáo HTML, tìm dòng tô vàng |
| *Buoi02-DuLieuKiemThu.csv không có dòng nào cho hàm ...* | Bài Buổi 2 thiếu dữ liệu cho hàm đó | Bổ sung dòng vào CSV |

---

# THANG ĐIỂM (10 điểm)

| Phần | Tiêu chí | Điểm |
|---|---|---|
| 1 | Ba khối `test.each` chạy đúng, nạp đủ dữ liệu từ CSV Buổi 2 | 1,5 |
| 1 | Quy đổi kết quả đúng kiểu dữ liệu cho từng hàm, tên ca hiển thị mã ca | 1,0 |
| 2 | Mọi ca thất bại được phân tích, phân loại nguyên nhân hợp lý | 1,5 |
| 2 | Mỗi kết luận có căn cứ là mã yêu cầu cụ thể trong SRS v1.1 | 1,0 |
| 2 | Trả lời mục 3 và 4: so sánh với chạy tay, đánh giá chất lượng bộ ca Buổi 2 | 0,5 |
| 3 | Đạt 100% bao phủ nhánh cho `shipping.js` và `cart.js` | 1,5 |
| 3 | Báo cáo bao phủ đầy đủ: số liệu trước và sau, giải thích nhánh chưa phủ | 1,0 |
| 3 | Trả lời ba câu hỏi phân tích ở mục 4 | 0,5 |
| 4 | Dùng mock đúng cách, các ca độc lập với nhau và với thứ tự chạy | 1,0 |
| 4 | Viết đủ các ca chuyển trạng thái theo yêu cầu, kết quả mong đợi dẫn từ SRS | 0,5 |
| | **Tổng** | **10** |

**Trừ điểm quy trình nộp bài** (tối đa −1,0): giữ nguyên quy định Buổi 1. Ngoài ra, **sửa mã nguồn trong `src/` để ca kiểm thử chuyển sang xanh bị trừ 2,0 điểm**.
