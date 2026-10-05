// Cấu hình ESLint (định dạng "flat config" của ESLint 9)
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'public/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      // Bổ sung ngoài bộ "recommended"
      eqeqeq: 'error', // bắt buộc dùng === / !==
    },
  },
  {
    // Các file kiểm thử dùng biến toàn cục của Jest (describe, test, expect…)
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      // Trong khung bài, một số import chưa dùng tới cho đến khi sinh viên hoàn thành TODO
      'no-unused-vars': 'warn',
    },
  },
  {
    // Riêng thư mục bài tập phân tích tĩnh: thêm các quy tắc cảnh báo "code smell"
    files: ['src/lab-static/**/*.js'],
    rules: {
      'no-console': 'warn', // không để console.log trong mã nghiệp vụ
      complexity: ['warn', 5], // hàm có quá nhiều nhánh rẽ
    },
  },
];
