// Nghiệp vụ đăng nhập và khóa tài khoản - xem SRS mục FR-02
// Phiên bản 1.1: đặt lại bộ đếm khi đăng nhập đúng, thông báo rõ khi bị khóa,
// và tự mở khóa sau thời gian quy định.
const store = require('../data/store');

const MAX_FAILED_ATTEMPTS = 3;
const LOCK_DURATION_MS = 15 * 1000;

const THONG_BAO_SAI = 'Sai email hoặc mật khẩu';
const THONG_BAO_KHOA = 'Tài khoản đã bị khóa, vui lòng thử lại sau 15 phút';

function daHetHanKhoa(user) {
  return user.lockedAt && Date.now() - user.lockedAt >= LOCK_DURATION_MS;
}

function login(email, password) {
  const user = store.findUser(email);
  if (!user) {
    return { ok: false, status: 401, message: THONG_BAO_SAI };
  }

  if (user.locked) {
    if (daHetHanKhoa(user)) {
      user.locked = false;
      user.lockedAt = null;
      user.failedAttempts = 0;
    } else {
      return { ok: false, status: 423, message: THONG_BAO_KHOA };
    }
  }

  if (user.password !== password) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      user.locked = true;
      user.lockedAt = Date.now();
      return { ok: false, status: 423, message: THONG_BAO_KHOA };
    }
    return { ok: false, status: 401, message: THONG_BAO_SAI };
  }

  user.failedAttempts = 0;
  return {
    ok: true,
    status: 200,
    user: { email: user.email, fullName: user.fullName, type: user.type },
  };
}

module.exports = { login, MAX_FAILED_ATTEMPTS, LOCK_DURATION_MS };
