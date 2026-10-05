/*
 * VÍ DỤ MINH HỌA BUỔI 3 — đọc file này trước khi làm bài.
 * Chạy riêng ví dụ:  npx jest tests/vi-du
 */
const { xepLoai, xepLoaiTheoMssv } = require('./xep-loai');
const khoDiem = require('./kho-diem');

// ---------------------------------------------------------------
// 1. Cấu trúc cơ bản: describe / test / expect
// ---------------------------------------------------------------
describe('xepLoai - cấu trúc cơ bản', () => {
  test('điểm 9 được xếp loại Giỏi', () => {
    expect(xepLoai(9)).toBe('Giỏi');
  });

  test('điểm ngoài khoảng cho phép thì ném lỗi', () => {
    expect(() => xepLoai(10.5)).toThrow('Điểm phải nằm trong khoảng 0 đến 10');
  });
});

// ---------------------------------------------------------------
// 2. Kiểm thử hướng dữ liệu với test.each
//    Mỗi phần tử của mảng là một ca kiểm thử.
// ---------------------------------------------------------------
describe('xepLoai - kiểm thử hướng dữ liệu (biên của từng lớp)', () => {
  const duLieu = [
    { maCa: 'VD-01', diem: 8.5, mongDoi: 'Giỏi' },
    { maCa: 'VD-02', diem: 8.49, mongDoi: 'Khá' },
    { maCa: 'VD-03', diem: 7, mongDoi: 'Khá' },
    { maCa: 'VD-04', diem: 5, mongDoi: 'Trung bình' },
    { maCa: 'VD-05', diem: 4.99, mongDoi: 'Yếu' },
  ];

  test.each(duLieu)('$maCa: điểm $diem -> $mongDoi', ({ diem, mongDoi }) => {
    expect(xepLoai(diem)).toBe(mongDoi);
  });
});

// ---------------------------------------------------------------
// 3. Mock một mô-đun phụ thuộc
//    Mục đích: kiểm thử xepLoaiTheoMssv mà KHÔNG phụ thuộc dữ liệu thật.
// ---------------------------------------------------------------
jest.mock('./kho-diem');

describe('xepLoaiTheoMssv - minh họa mock', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // mỗi ca kiểm thử bắt đầu từ trạng thái sạch
  });

  test('trả về xếp loại tương ứng với điểm mà kho dữ liệu cung cấp', () => {
    khoDiem.layDiem.mockReturnValue(6.0); // ra lệnh cho mock trả về 6.0

    expect(xepLoaiTheoMssv('64130099')).toBe('Trung bình');
    expect(khoDiem.layDiem).toHaveBeenCalledWith('64130099'); // kiểm tra tương tác
    expect(khoDiem.layDiem).toHaveBeenCalledTimes(1);
  });

  test('lỗi từ kho dữ liệu được truyền ra ngoài', () => {
    khoDiem.layDiem.mockImplementation(() => {
      throw new Error('Không tìm thấy sinh viên: 000');
    });

    expect(() => xepLoaiTheoMssv('000')).toThrow('Không tìm thấy sinh viên');
  });
});
