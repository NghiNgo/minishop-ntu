// Nghiệp vụ đăng ký tài khoản - xem SRS mục FR-01
// Phiên bản 1.1: đã siết lại kiểm tra tuổi và bổ sung kiểm tra thành phần mật khẩu.
const store = require('../data/store');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_AGE = 18;
const MAX_AGE = 100;

function validateRegistration({ fullName, email, age, password } = {}) {
  const errors = [];

  if (!fullName || !String(fullName).trim()) {
    errors.push('Họ tên là bắt buộc');
  }

  if (!email || !EMAIL_PATTERN.test(String(email))) {
    errors.push('Email không hợp lệ');
  }

  const ageNumber = Number(age);
  if (!Number.isInteger(ageNumber)) {
    errors.push('Tuổi phải là số nguyên');
  } else if (ageNumber < MIN_AGE || ageNumber > MAX_AGE) {
    errors.push('Tuổi không nằm trong phạm vi cho phép');
  }

  const pwd = String(password || '');
  if (pwd.length <= 8 || pwd.length > 20) {
    errors.push('Mật khẩu phải có từ 8 đến 20 ký tự');
  } else if (!/[a-z]/.test(pwd) || !/\d/.test(pwd)) {
    errors.push('Mật khẩu phải có ít nhất một chữ cái và một chữ số');
  }

  return errors;
}

function register(data = {}) {
  const errors = validateRegistration(data);
  if (errors.length > 0) {
    return { ok: false, status: 400, errors };
  }
  const email = String(data.email).toLowerCase();
  if (store.findUser(email)) {
    return { ok: false, status: 409, errors: ['Email đã được sử dụng'] };
  }
  store.users.push({
    email,
    password: String(data.password),
    fullName: String(data.fullName).trim(),
    age: Number(data.age),
    type: 'THUONG',
    failedAttempts: 0,
    locked: false,
  });
  return { ok: true, status: 201, message: 'Đăng ký thành công' };
}

module.exports = { validateRegistration, register, MIN_AGE, MAX_AGE };
