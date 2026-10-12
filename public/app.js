/* Giao diện MiniShop NTU - JavaScript thuần phía trình duyệt */
let token = null;

const $ = (id) => document.getElementById(id);
const money = (n) => Number(n).toLocaleString('vi-VN') + 'đ';

function showMsg(el, text, ok) {
  el.textContent = text;
  el.className = 'msg ' + (ok ? 'ok' : 'err');
}

async function api(method, url, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function thamSoLoc() {
  const q = new URLSearchParams();
  const tuKhoa = $('f-tukhoa').value.trim();
  if (tuKhoa) q.set('tuKhoa', tuKhoa);
  if ($('f-danhmuc').value !== 'tat-ca') q.set('danhMuc', $('f-danhmuc').value);
  if ($('f-khoanggia').value) q.set('khoangGia', $('f-khoanggia').value);
  if ($('f-sapxep').value) q.set('sapXep', $('f-sapxep').value);
  if ($('f-conhang').checked) q.set('conHang', 'co');
  const chuoi = q.toString();
  return chuoi ? '?' + chuoi : '';
}

async function loadProducts() {
  $('product-list').textContent = 'Đang tải...';
  const { data } = await api('GET', '/api/products' + thamSoLoc());
  if (!data.length) {
    $('product-list').innerHTML = '<p data-testid="khong-co-ket-qua">Không tìm thấy sản phẩm phù hợp.</p>';
    return;
  }
  $('product-list').innerHTML =
    '<table><tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Số lượng</th><th></th></tr>' +
    data.map((p) =>
      `<tr data-testid="sp-${p.id}"><td>${p.name}</td>
       <td>${p.category === 'qua-luu-niem' ? 'Quà lưu niệm' : 'Đồ dùng học tập'}</td>
       <td>${money(p.price)}</td>
       <td class="${p.stock === 0 ? 'het-hang' : ''}">${p.stock === 0 ? 'Hết hàng' : p.stock}</td>
       <td><input type="text" value="1" id="qty-${p.id}" data-testid="qty-${p.id}"></td>
       <td><button data-testid="add-${p.id}" onclick="addToCart(${p.id})">Thêm vào giỏ</button></td></tr>`
    ).join('') + '</table>';
}

async function renderCart() {
  if (!token) return;
  const { data } = await api('GET', '/api/cart');
  if (!data.items || data.items.length === 0) {
    $('cart').textContent = 'Giỏ hàng trống.';
    return;
  }
  $('cart').innerHTML =
    '<table><tr><th>Sản phẩm</th><th>Đơn giá</th><th>SL</th><th>Thành tiền</th><th></th></tr>' +
    data.items.map((i) =>
      `<tr><td>${i.name}</td><td>${money(i.price)}</td><td>${i.qty}</td><td>${money(i.lineTotal)}</td>
       <td><button data-testid="remove-${i.productId}" onclick="removeItem(${i.productId})">Xóa</button></td></tr>`
    ).join('') +
    `</table><strong data-testid="subtotal">Tạm tính: ${money(data.subtotal)}</strong>`;
}

window.addToCart = async (id) => {
  if (!token) { alert('Bạn cần đăng nhập trước'); return; }
  const qty = $('qty-' + id).value;
  const { status, data } = await api('POST', '/api/cart', { productId: id, qty });
  if (status !== 200) alert(data.message || 'Có lỗi xảy ra');
  renderCart();
};

window.removeItem = async (id) => {
  await api('DELETE', '/api/cart/' + id);
  renderCart();
};

$('btn-register').onclick = async () => {
  const body = {
    fullName: $('reg-name').value,
    email: $('reg-email').value,
    age: $('reg-age').value,
    password: $('reg-password').value,
  };
  const { data } = await api('POST', '/api/register', body);
  if (data.ok) showMsg($('reg-msg'), data.message, true);
  else showMsg($('reg-msg'), (data.errors || ['Có lỗi xảy ra']).join('; '), false);
};

$('btn-login').onclick = async () => {
  const { data } = await api('POST', '/api/login', {
    email: $('login-email').value,
    password: $('login-password').value,
  });
  if (data.ok) {
    token = data.token;
    showMsg($('login-msg'), 'Đăng nhập thành công', true);
    $('user-bar').textContent = `Xin chào, ${data.user.fullName} (${data.user.type === 'VIP' ? 'Thành viên VIP' : 'Thành viên'})`;
    renderCart();
  } else {
    showMsg($('login-msg'), data.message, false);
  }
};

$('btn-fee').onclick = async () => {
  if (!token) { showMsg($('fee-msg'), 'Bạn cần đăng nhập', false); return; }
  const { status, data } = await api('POST', '/api/shipping-fee', { zone: $('zone').value });
  if (status === 200) {
    showMsg($('fee-msg'), `Tạm tính: ${money(data.subtotal)} | Phí vận chuyển: ${money(data.shippingFee)} | Tổng: ${money(data.total)}`, true);
  } else {
    showMsg($('fee-msg'), data.message, false);
  }
};

$('btn-order').onclick = async () => {
  if (!token) { showMsg($('fee-msg'), 'Bạn cần đăng nhập', false); return; }
  const { status, data } = await api('POST', '/api/orders', { zone: $('zone').value });
  if (status === 201) {
    showMsg($('fee-msg'), `Đặt hàng thành công. Mã đơn #${data.id}, tổng tiền ${money(data.total)}`, true);
    renderCart();
  } else {
    showMsg($('fee-msg'), data.message, false);
  }
};

$('btn-loc').onclick = () => loadProducts();
$('btn-xoabo-loc').onclick = () => {
  $('f-tukhoa').value = '';
  $('f-danhmuc').value = 'tat-ca';
  $('f-khoanggia').value = '';
  $('f-sapxep').value = '';
  $('f-conhang').checked = false;
  loadProducts();
};

loadProducts();
