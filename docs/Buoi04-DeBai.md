# THỰC HÀNH BUỔI 4
# KIỂM THỬ XÁC NHẬN, HỒI QUY VÀ QUẢN LÝ LỖI
### Tài liệu hướng dẫn thực hành từng bước

**Học phần:** Kiểm thử phần mềm (SOT357) · **Thời lượng:** 3 giờ · **Hình thức:** Cá nhân
**Liên quan lý thuyết:** Chương 5 (Quản lý kiểm thử)
**Tài liệu gốc:** `docs/SRS-MiniShop-v1.2.md` và `docs/GhiChuPhatHanh-v1.1.md`
**Phần mềm cần kiểm thử:** MiniShop NTU **v1.1.0**

---

## BỐI CẢNH

Sau ba buổi, nhóm kiểm thử đã báo 12 lỗi. Nhóm phát triển vừa phát hành **bản 1.1.0**, tuyên bố đã sửa toàn bộ 12 lỗi đó và bổ sung chức năng tìm kiếm, lọc sản phẩm.

Vai trò hôm nay: kiểm thử viên nhận bản mới và phải trả lời ba câu hỏi.

1. **Các lỗi đã báo có thật sự được sửa không?** → kiểm thử xác nhận.
2. **Việc sửa lỗi có làm hỏng thứ vốn đang chạy đúng không?** → kiểm thử hồi quy.
3. **Còn lỗi nào chưa ai biết không?** → kiểm thử thăm dò.

Cuối buổi phải đưa ra khuyến nghị: bản 1.1 có đủ điều kiện phát hành hay không.

## CẤU TRÚC TÀI LIỆU

| Mục | Nội dung |
|---|---|
| **Cơ sở lý thuyết** | Tóm tắt kỹ thuật trong 5–6 dòng |
| **Yêu cầu thực hiện** | Phần bài tập phải làm, kèm quy trình từng bước |
| **Tự kiểm tra trước khi tiếp tục** | Danh mục tự kiểm trước khi chuyển sang phần kế tiếp |

## Mục tiêu

Sau buổi thực hành, sinh viên có khả năng:

1. Viết được **kế hoạch kiểm thử rút gọn** có phạm vi, rủi ro và tiêu chí vào/ra.
2. Thực hiện **kiểm thử xác nhận** và phân biệt ba mức kết quả: đã sửa, sửa chưa trọn, chưa sửa.
3. Thực hiện **kiểm thử hồi quy** bằng bộ kiểm thử tự động, và phân biệt lỗi hồi quy với ca kiểm thử lỗi thời.
4. Tiến hành một **phiên kiểm thử thăm dò** có charter và giới hạn thời gian, ghi nhật ký phiên.
5. Viết **báo cáo lỗi** tái hiện được, gán Severity và Priority có lập luận, và theo dõi vòng đời lỗi.

## Chuẩn bị trước buổi học

- [ ] Pull Request Buổi 3 đã được duyệt và merge vào `main`
- [ ] Mở lại `bai-nop/Buoi03-PhanTichKetQua.md` để nhớ số liệu `npm test` ở Buổi 3
- [ ] Đọc lại thang Severity và Priority trong slide Chương 5

## Lịch trình

| Thời gian | Nội dung |
|---|---|
| 0:00 – 0:15 | **Bước 0.** Nhận bản v1.1, đọc ghi chú phát hành |
| 0:15 – 0:35 | **Phần 1.** Lập kế hoạch kiểm thử rút gọn |
| 0:35 – 1:15 | **Phần 2.** Kiểm thử xác nhận 12 mục đã báo |
| 1:15 – 1:25 | Nghỉ giải lao |
| 1:25 – 2:00 | **Phần 3.** Kiểm thử hồi quy |
| 2:00 – 2:25 | **Phần 4.** Phiên kiểm thử thăm dò |
| 2:25 – 2:50 | **Phần 5.** Báo cáo lỗi trên GitHub Issues |
| 2:50 – 3:00 | Kết luận đợt kiểm thử, mở Pull Request |

---

# BƯỚC 0. NHẬN BẢN MỚI (15 phút)

## 0.1. Lấy mã nguồn v1.1

```bash
git checkout main
git pull upstream main
git push origin main
git checkout -b buoi-04
npm install
npm start                   # mở http://localhost:3000, kiểm tra giao diện có thanh lọc sản phẩm
```

Kiểm tra nhanh phiên bản: mở http://localhost:3000/api/health, trường `version` phải là `1.1.0`.

## 0.2. Đọc ghi chú phát hành

Mở `docs/GhiChuPhatHanh-v1.1.md`. Tài liệu này liệt kê 12 lỗi nhóm phát triển **khẳng định** đã sửa, một chức năng mới, và phạm vi tệp bị thay đổi.

> Ghi chú phát hành là **tuyên bố**, không phải bằng chứng. Trong thực tế, một phần đáng kể các mục "đã sửa" hóa ra chỉ sửa một nửa, hoặc sửa chỗ này làm hỏng chỗ khác.

## 0.3. Đọc phần mới của tài liệu yêu cầu

Từ buổi này, tài liệu gốc là **SRS v1.2**. So với v1.1, bản này bổ sung **FR-06 (Tìm kiếm và lọc sản phẩm)** với 8 yêu cầu con. Đọc kỹ FR-06.4 (biên của khoảng giá), FR-06.5 (thứ tự sắp xếp) và FR-06.6 (lọc theo tồn kho).

## 0.4. Tự kiểm tra trước khi tiếp tục

- [ ] `/api/health` trả về `version: 1.1.0`
- [ ] Giao diện có thanh lọc với 5 tiêu chí và hai nút Lọc, Xóa bộ lọc
- [ ] Danh sách sản phẩm hiện 7 mặt hàng, có cột Danh mục và Tồn kho

---

# PHẦN 1. KẾ HOẠCH KIỂM THỬ RÚT GỌN (20 phút)

## 1.1. Cơ sở lý thuyết

- Kế hoạch kiểm thử trả lời: kiểm thử **cái gì**, **không kiểm cái gì**, **theo thứ tự nào**, và **khi nào dừng**.
- **Phân tích rủi ro** quyết định thứ tự: rủi ro = mức thiệt hại nếu lỗi xảy ra × khả năng vùng đó có lỗi. Vùng vừa bị sửa nhiều là vùng có khả năng chứa lỗi cao.
- **Tiêu chí bắt đầu (entry)**: điều kiện để bắt đầu kiểm thử, ví dụ bản build cài được và chạy được luồng cơ bản.
- **Tiêu chí kết thúc (exit)**: điều kiện để tuyên bố kết thúc, ví dụ đã chạy hết ca ưu tiên cao và không còn lỗi Critical mở.

## 1.2. Yêu cầu thực hiện

Điền `bai-nop/Buoi04-TestPlan.md`. Thời lượng chỉ 20 phút, nên viết ngắn và cụ thể, tránh câu chữ chung chung.

Lưu ý khi điền mục 3 (rủi ro): đọc phần 3 của ghi chú phát hành để biết **tệp nào bị sửa nhiều nhất**. Một vùng vừa bị sửa ở bốn chỗ khác nhau có rủi ro cao hơn hẳn vùng không ai đụng tới.

Tiêu chí kết thúc phải **đo được**. "Kiểm thử kỹ càng" không phải tiêu chí; "đã chạy hết ca ưu tiên Cao và không còn lỗi Severity Critical ở trạng thái mở" mới là tiêu chí.

## 1.3. Tự kiểm tra trước khi tiếp tục

- [ ] Mục 2 nêu rõ cả phần **không** kiểm thử và lý do
- [ ] Ba vùng rủi ro đều có lý do dựa trên dữ liệu, không phải cảm tính
- [ ] Tiêu chí kết thúc đo được bằng con số hoặc trạng thái cụ thể

---

# PHẦN 2. KIỂM THỬ XÁC NHẬN (40 phút)

## 2.1. Cơ sở lý thuyết

- **Kiểm thử xác nhận (confirmation testing)**: chạy lại **đúng ca kiểm thử đã phát hiện lỗi**, với **đúng dữ liệu cũ**, trên bản đã sửa.
- Không được thay dữ liệu hay rút gọn các bước. Nếu đổi dữ liệu, kết quả không chứng minh được điều gì về lỗi cũ.
- Kết quả có ba mức, không phải hai: **đã sửa**, **sửa chưa trọn**, **chưa sửa**. Mức giữa là mức hay bị bỏ qua nhất.

## 2.2. Yêu cầu thực hiện

Điền bảng ở mục 1 của `bai-nop/Buoi04-XacNhan-HoiQuy.md`, đủ cả 12 dòng.

**Quy trình cho mỗi dòng:**

1. Tìm lại ca kiểm thử tương ứng trong `bai-nop/Buoi02-TestCase.csv` (ghi mã ca vào bảng).
2. Chạy lại ca đó: qua giao diện, hoặc chạy ca Jest tương ứng nếu đã có từ Buổi 3.
3. Ghi **kết quả thực tế**, nguyên văn thông báo nếu có.
4. Đối chiếu với SRS v1.2 rồi chọn một trong ba kết luận.

**Gợi ý cho mức "sửa chưa trọn":** một chức năng có thể đúng ở trường hợp đã báo nhưng sai ở trường hợp lân cận. Ví dụ, nếu lỗi báo là "chấp nhận giá trị X", hãy thử luôn các giá trị ngay cạnh X. Kỹ thuật phân tích giá trị biên của Buổi 2 vẫn dùng được ở đây.

Với mục F-05 (tự mở khóa sau 15 phút), hãy nghĩ cách kiểm chứng trong thời lượng buổi học, và ghi lại cách làm vào cột Ghi chú.

## 2.3. Tự kiểm tra trước khi tiếp tục

- [ ] Đủ 12 dòng, mỗi dòng có kết quả thực tế cụ thể
- [ ] Mỗi kết luận "SỬA CHƯA TRỌN" đều chỉ rõ trường hợp nào vẫn sai
- [ ] Đã điền dòng tổng hợp ba con số ở cuối bảng

---

# PHẦN 3. KIỂM THỬ HỒI QUY (35 phút)

## 3.1. Cơ sở lý thuyết

- **Kiểm thử hồi quy (regression testing)**: chạy lại các ca kiểm thử của **những phần không được sửa**, để phát hiện hư hại do thay đổi gây ra.
- Đây là lý do tồn tại của kiểm thử tự động: chạy lại 50 ca bằng tay mất cả buổi, bằng máy mất vài giây.
- Một ca chuyển từ xanh sang đỏ có hai khả năng: **lỗi hồi quy** của mã nguồn, hoặc **ca kiểm thử đã lỗi thời** vì yêu cầu thay đổi. Phải phân biệt được, nếu không sẽ báo lỗi sai.

## 3.2. Yêu cầu thực hiện

**Bước 1 — Chạy bộ kiểm thử đơn vị:**

```bash
npm test
```

Ghi số liệu vào mục 2 của `Buoi04-XacNhan-HoiQuy.md`, so sánh với số liệu đã ghi ở Buổi 3.

**Bước 2 — Lập bảng ca chuyển trạng thái.** Mục 2.1 cho các ca từ đỏ sang xanh, mục 2.2 cho các ca từ xanh sang đỏ.

**Bước 3 — Phân tích mục 2.2.** Với mỗi ca mới đỏ, trả lời: mã nguồn hỏng, hay ca kiểm thử lỗi thời? Căn cứ luôn là SRS v1.2.

Nếu kết luận ca kiểm thử đã lỗi thời, được phép sửa ca đó trong `tests/unit/`, nhưng **phải ghi rõ lý do** vào bảng. Nếu kết luận mã nguồn hỏng, giữ nguyên ca đỏ và báo lỗi ở Phần 5.

> Không được xóa ca kiểm thử để báo cáo đẹp hơn. Script kiểm tra sẽ đối chiếu tổng số ca với Buổi 3.

**Bước 4 — Kiểm thử chức năng mới FR-06.** Điền mục 3 với ít nhất 6 ca. Nếu đã làm bài pairwise tự chọn ở Buổi 2, dùng lại bộ ca đó, đây chính là lúc nó phát huy tác dụng.

**Bước 5 — Cập nhật ma trận truy vết** ở mục 4, gồm cả các yêu cầu FR-06 mới.

## 3.3. Tự kiểm tra trước khi tiếp tục

- [ ] Tổng số ca của `npm test` không giảm so với Buổi 3
- [ ] Mọi ca mới đỏ đều có dòng phân tích với căn cứ là mã yêu cầu
- [ ] Phần FR-06 có ít nhất 6 ca với kết quả mong đợi dẫn từ SRS v1.2
- [ ] Ma trận truy vết đã có các dòng FR-06

---

# PHẦN 4. KIỂM THỬ THĂM DÒ (25 phút)

## 4.1. Cơ sở lý thuyết

- **Kiểm thử thăm dò (exploratory testing)**: thiết kế, thực thi và học hỏi diễn ra **đồng thời**. Không có kịch bản viết trước, nhưng cũng không phải bấm loạn.
- **Session-based testing** đặt ra ba ràng buộc: một **charter** (mục tiêu phiên), một **giới hạn thời gian**, và một **nhật ký phiên**.
- Kỹ thuật thường dùng: **đoán lỗi** dựa trên kinh nghiệm, thử các giá trị bất thường, thao tác sai thứ tự, và quan sát những chỗ hệ thống vừa bị sửa.
- Mọi phát hiện phải **tái hiện được** mới có giá trị. Ghi ngay các bước khi vừa thấy hiện tượng, đừng để cuối phiên mới nhớ lại.

## 4.2. Yêu cầu thực hiện

Giảng viên giao charter theo **chữ số cuối của MSSV**:

| Chữ số cuối MSSV | Mã | Charter |
|---|---|---|
| 0, 1 | CT-01 | Thăm dò luồng **đăng ký tài khoản**, tập trung vào quy tắc mật khẩu mới trong v1.1. Thử các mật khẩu ở nhiều độ dài và thành phần ký tự khác nhau. |
| 2, 3 | CT-02 | Thăm dò **giỏ hàng**: thêm, cập nhật, xóa, nhiều dòng sản phẩm, số lượng lớn, và giới hạn tổng số lượng mới. |
| 4, 5 | CT-03 | Thăm dò **màn hình lọc sản phẩm FR-06**: tổ hợp nhiều tiêu chí, từ khóa lạ, sắp xếp, lọc tồn kho. |
| 6, 7 | CT-04 | Thăm dò **đặt hàng và hủy đơn**: số tiền hiển thị ở từng bước, đơn của thành viên thường và VIP, hủy đơn ở các trạng thái. |
| 8, 9 | CT-05 | Thăm dò **đăng nhập và khóa tài khoản**: chuỗi đăng nhập sai và đúng xen kẽ, hành vi trong và sau thời gian khóa. |

**Quy tắc phiên:**
- Đặt hẹn giờ **25 phút**, dừng đúng giờ kể cả khi đang hứng thú.
- Ghi nhật ký **ngay trong lúc làm**, mỗi 3–5 phút một dòng, kể cả khi không phát hiện gì.
- Bám charter của mình. Thấy hiện tượng lạ ngoài charter thì ghi vào mục "Câu hỏi còn bỏ ngỏ", không đuổi theo.
- Khi gặp hiện tượng bất thường, dành thời gian **thu hẹp** nó: tìm bộ bước ngắn nhất tái hiện được.

Điền mục 1 của `bai-nop/Buoi04-Exploratory.md`. Nhật ký cần ít nhất 4 mốc thời gian.

## 4.3. Tự kiểm tra trước khi tiếp tục

- [ ] Nhật ký ghi cả những thử nghiệm không phát hiện gì
- [ ] Mỗi phát hiện đều có cột "có tái hiện được không" đã điền
- [ ] Phần trăm thời gian ở mục 1.2 cộng lại bằng 100

---

# PHẦN 5. BÁO CÁO LỖI VÀ VÒNG ĐỜI LỖI (25 phút)

## 5.1. Cơ sở lý thuyết

- Một báo cáo lỗi tốt giúp lập trình viên tái hiện lỗi **mà không cần hỏi lại**: các bước cụ thể, dữ liệu cụ thể, kết quả mong đợi dẫn từ yêu cầu, kết quả thực tế nguyên văn.
- **Severity (mức nghiêm trọng)** là thuộc tính kỹ thuật: lỗi gây hậu quả nặng tới đâu. **Priority (mức ưu tiên)** là quyết định kinh doanh: nên sửa trước hay sau.
- Hai mức này **độc lập**. Lỗi sai chính tả trên trang chủ có Severity thấp nhưng Priority cao; lỗi sập hệ thống ở chức năng hiếm dùng thì ngược lại.
- Vòng đời lỗi: *Mới → Được gán → Đang sửa → Chờ kiểm thử lại → Đóng*, với hai nhánh rẽ là **Rejected** (không phải lỗi) và **Reopen** (sửa chưa xong).

## 5.2. Yêu cầu thực hiện

**Bước 1 — Tạo issue.** Trong repo của mình, vào tab **Issues → New issue**, chọn mẫu **Báo cáo lỗi**. Tạo **ít nhất 2 issue** cho những lỗi nghiêm trọng nhất phát hiện hôm nay, từ bất kỳ phần nào (xác nhận, hồi quy, hoặc thăm dò).

Điền đầy đủ mẫu, đặc biệt ba mục: các bước tái hiện, kết quả mong đợi kèm mã yêu cầu, và lập luận cho Severity, Priority.

**Bước 2 — Ghi vào báo cáo.** Điền bảng mục 2 của `Buoi04-Exploratory.md`, dán đường dẫn đầy đủ của từng issue, dạng `https://github.com/<tài-khoản>/<repo>/issues/<số>`.

**Bước 3 — Trả lời mục 2.1 và 2.2** về lập luận Severity, Priority.

**Bước 4 — Vòng đời lỗi.** Giảng viên đóng vai nhóm phát triển và phản hồi các issue ngay trong buổi: `Fixed`, `Rejected` hoặc `Need more info`. Ghi phản hồi và hành động tiếp theo vào mục 3.

Nếu nhận `Rejected`, không tranh cãi bằng cảm tính: bổ sung bằng chứng hoặc trích dẫn mã yêu cầu. Nếu nhận `Need more info`, bổ sung thông tin còn thiếu, và tự rút kinh nghiệm xem báo cáo ban đầu thiếu gì.

**Bước 5 — Kết luận đợt kiểm thử.** Trả lời mục 4: bản 1.1 có đủ điều kiện phát hành không? Đối chiếu với **tiêu chí kết thúc** đã viết trong kế hoạch ở Phần 1. Nếu tiêu chí chưa đạt mà vẫn khuyến nghị phát hành, phải nêu rõ rủi ro chấp nhận.

## 5.3. Tự kiểm tra trước khi tiếp tục

- [ ] Mỗi issue có đủ bước tái hiện mà người khác làm theo được
- [ ] Mỗi issue dẫn được một mã yêu cầu trong SRS v1.2
- [ ] Severity và Priority đều có lập luận, không chỉ chọn mức
- [ ] Kết luận ở mục 4 trả lời rõ Có hoặc Không

---

# NỘP BÀI

| Nội dung | Repo | Nhánh | Hạn |
|---|---|---|---|
| Toàn bộ Buổi 4 | `sot357-<MSSV>` | `buoi-04` | **Mở PR** trước khi kết thúc buổi; push bổ sung đến **23:59 cùng ngày** |

```bash
git add bai-nop tests
git commit -m "Buoi 4: kiem thu xac nhan, hoi quy va quan ly loi"
git push -u origin buoi-04
```

File được phép sửa: `bai-nop/Buoi04-*.md`, `bai-nop/hinh/`, và `tests/unit/*.test.js` cùng `bai-nop/Buoi02-DuLieuKiemThu.csv` trong trường hợp cập nhật ca kiểm thử đã lỗi thời.

**Không sửa bất kỳ file nào trong `src/`.**

## Bảng tra lỗi của kiểm tra tự động

| Thông báo | Nguyên nhân | Cách khắc phục |
|---|---|---|
| *chưa điền xong (CHUA_DIEN)* | Quên xóa dòng đánh dấu | Xóa dòng `<!-- CHUA_DIEN … -->` |
| *Bảng kiểm thử xác nhận mới có N/12 dòng* | Chưa điền đủ cột Kết luận | Điền đủ 12 dòng với một trong ba giá trị |
| *Cần ít nhất 2 đường dẫn issue* | Chưa dán link, hoặc dán link rút gọn | Dán link đầy đủ dạng `https://github.com/.../issues/12` |
| *Nhật ký phiên cần ít nhất 4 mốc thời gian* | Cột thời điểm để trống hoặc ghi không theo dạng giờ:phút | Ghi dạng `14:05` ở cột đầu |
| *Phần kiểm thử FR-06 cần ít nhất 6 ca* | Bảng mục 3 chưa đủ dòng | Bổ sung ca |
| *Bộ kiểm thử đơn vị chỉ còn N ca* | Đã xóa ca kiểm thử | Khôi phục; chỉ được sửa, không được xóa |

---

# THANG ĐIỂM (10 điểm)

| Phần | Tiêu chí | Điểm |
|---|---|---|
| 1 | Kế hoạch có phạm vi rõ ràng, nêu cả phần không kiểm thử | 0,5 |
| 1 | Phân tích rủi ro có căn cứ; tiêu chí vào/ra đo được | 1,0 |
| 2 | Đủ 12 dòng xác nhận, kết quả thực tế cụ thể | 1,5 |
| 2 | Phân biệt đúng ba mức, chỉ rõ trường hợp còn sai ở mức "sửa chưa trọn" | 1,0 |
| 3 | Bảng so sánh trước và sau đầy đủ, đúng số liệu | 0,5 |
| 3 | Phát hiện đủ các ca hồi quy, phân biệt đúng lỗi mã nguồn và ca lỗi thời | 1,5 |
| 3 | Kiểm thử FR-06 đủ 6 ca, RTM cập nhật | 1,0 |
| 4 | Phiên thăm dò đúng quy tắc: bám charter, đúng thời lượng, nhật ký ghi trong lúc làm | 1,0 |
| 4 | Phát hiện có giá trị, tái hiện được | 0,5 |
| 5 | Hai issue viết đạt chuẩn, tái hiện được, dẫn mã yêu cầu | 1,0 |
| 5 | Lập luận Severity và Priority thuyết phục, hiểu được trường hợp hai mức lệch nhau | 0,5 |
| 5 | Kết luận đợt kiểm thử có căn cứ, đối chiếu tiêu chí kết thúc | 0,5 |
| | **Tổng** | **10** |

**Trừ điểm quy trình nộp bài** (tối đa −1,0): giữ nguyên quy định Buổi 1. Sửa mã nguồn trong `src/` bị trừ 2,0 điểm.
