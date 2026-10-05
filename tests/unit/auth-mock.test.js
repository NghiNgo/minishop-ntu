/*
 * BUỔI 3 - PHẦN 4: Kiểm thử với mock
 *
 * Nghiệp vụ khóa tài khoản (FR-02.2 đến FR-02.4) đọc dữ liệu người dùng từ
 * src/data/store.js. Nếu dùng dữ liệu thật, các ca kiểm thử sẽ ảnh hưởng lẫn nhau:
 * ca này khóa tài khoản thì ca sau chạy sai. Vì vậy ta mock mô-đun kho dữ liệu.
 */
const store = require('../../src/data/store');
const { login, MAX_FAILED_ATTEMPTS } = require('../../src/services/auth');

jest.mock('../../src/data/store');

function taoNguoiDung(ghiDe = {}) {
  return {
    email: 'sv@ntu.edu.vn',
    password: 'Matkhau123',
    fullName: 'Nguyen Van Sinh Vien',
    type: 'THUONG',
    failedAttempts: 0,
    locked: false,
    ...ghiDe,
  };
}

describe('login - nghiệp vụ khóa tài khoản', () => {
  let nguoiDung;

  beforeEach(() => {
    jest.resetAllMocks();
    nguoiDung = taoNguoiDung();
    store.findUser.mockImplementation((email) => (email === nguoiDung.email ? nguoiDung : undefined));
  });

  // Ví dụ mẫu đã viết sẵn.
  test('đăng nhập đúng thì thành công', () => {
    const kq = login('sv@ntu.edu.vn', 'Matkhau123');
    expect(kq.ok).toBe(true);
    expect(kq.user.email).toBe('sv@ntu.edu.vn');
  });

  // TODO (5): viết thêm ít nhất 4 ca, bám theo bộ ca ST đã thiết kế ở Buổi 2:
  //   - email không tồn tại
  //   - sai mật khẩu 2 lần: tài khoản chưa bị khóa
  //   - sai mật khẩu MAX_FAILED_ATTEMPTS lần liên tiếp: nguoiDung.locked === true
  //   - đăng nhập đúng sau 2 lần sai: nguoiDung.failedAttempts trở về 0  (FR-02.3)
  //   - tài khoản đang bị khóa, nhập ĐÚNG mật khẩu: vẫn bị từ chối, thông báo nói rõ bị khóa (FR-02.4)
});
