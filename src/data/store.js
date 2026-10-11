// Dữ liệu mẫu lưu trong bộ nhớ (khởi động lại server là dữ liệu trở về ban đầu)

const products = [
  { id: 1, name: 'Áo thun NTU', price: 150000, category: 'qua-luu-niem', stock: 12 },
  { id: 2, name: 'Bình nước giữ nhiệt', price: 100000, category: 'qua-luu-niem', stock: 0 },
  { id: 3, name: 'Sổ tay sinh viên', price: 50000, category: 'do-dung-hoc-tap', stock: 40 },
  { id: 4, name: 'Balo laptop', price: 350000, category: 'do-dung-hoc-tap', stock: 5 },
  { id: 5, name: 'Nón bảo hiểm NTU', price: 200000, category: 'qua-luu-niem', stock: 0 },
  { id: 6, name: 'Bút ký NTU', price: 35000, category: 'do-dung-hoc-tap', stock: 100 },
  { id: 7, name: 'Áo khoác gió NTU', price: 450000, category: 'qua-luu-niem', stock: 3 },
];

const users = [
  {
    email: 'sv@ntu.edu.vn',
    password: 'Matkhau123',
    fullName: 'Nguyễn Văn Sinh Viên',
    age: 20,
    type: 'THUONG',
    failedAttempts: 0,
    locked: false,
  },
  {
    email: 'vip@ntu.edu.vn',
    password: 'Matkhau123',
    fullName: 'Trần Thị Thân Thiết',
    age: 35,
    type: 'VIP',
    failedAttempts: 0,
    locked: false,
  },
];

const carts = {}; // email -> [{ productId, qty }]
const orders = []; // { id, email, items, subtotal, shippingFee, total, status }

function findUser(email) {
  return users.find((u) => u.email === String(email || '').toLowerCase());
}

function findProduct(id) {
  return products.find((p) => p.id === Number(id));
}

module.exports = { products, users, carts, orders, findUser, findProduct };
