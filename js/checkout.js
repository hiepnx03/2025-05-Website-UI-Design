    // Hiển thị thông tin đơn hàng khi trang được tải
    document.addEventListener('DOMContentLoaded', function() {
    displayOrderSummary();
    updateCartCount();

    // Xử lý chọn tỉnh/thành phố
    document.getElementById('city').addEventListener('change', function() {
    const districts = {
    'hanoi': ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy'],
    'hcm': ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 10'],
    'danang': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu']
};

    const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';

    if (this.value && districts[this.value]) {
    districts[this.value].forEach(district => {
    districtSelect.innerHTML += `<option value="${district.toLowerCase().replace(' ', '')}">${district}</option>`;
});
}
});
});

    // Hiển thị thông tin đơn hàng
    function displayOrderSummary() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');

    if (cartItems.length === 0) {
    orderItemsContainer.innerHTML = '<p class="text-center py-3">Không có sản phẩm nào trong giỏ hàng</p>';
    return;
}

    let html = '';
    let subtotal = 0;

    cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    html += `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.price.toLocaleString()}₫ × ${item.quantity}</small>
                    </div>
                    <span class="fw-bold">${itemTotal.toLocaleString()}₫</span>
                </div>
            `;
});

    orderItemsContainer.innerHTML = html;

    // Tính toán tổng tiền
    const shippingFee = subtotal > 500000 ? 0 : 30000;
    const discount = subtotal > 1000000 ? 100000 : 0;
    const total = subtotal + shippingFee - discount;

    document.getElementById('orderSubtotal').textContent = `${subtotal.toLocaleString()}₫`;
    document.getElementById('orderShipping').textContent = shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString()}₫`;
    document.getElementById('orderDiscount').textContent = `-${discount.toLocaleString()}₫`;
    document.getElementById('orderTotal').textContent = `${total.toLocaleString()}₫`;
}

    // Chọn phương thức thanh toán
    function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('active');
    });

    document.getElementById(method).parentElement.classList.add('active');
    document.getElementById(method).checked = true;
}

    // Gửi đơn hàng
    function submitOrder() {
    const form = document.getElementById('checkoutForm');
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
}

    if (!form.checkValidity()) {
    form.reportValidity();
    return;
}

    // Lấy thông tin từ form
    const orderData = {
    customer: {
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    district: document.getElementById('district').value,
    note: document.getElementById('note').value
},
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').id,
    items: cartItems,
    subtotal: parseInt(document.getElementById('orderSubtotal').textContent.replace(/[^\d]/g, '')),
    shipping: parseInt(document.getElementById('orderShipping').textContent === 'Miễn phí' ? '0' : document.getElementById('orderShipping').textContent.replace(/[^\d]/g, '')),
    discount: parseInt(document.getElementById('orderDiscount').textContent.replace(/[^\d]/g, '')),
    total: parseInt(document.getElementById('orderTotal').textContent.replace(/[^\d]/g, ''))
};

    // Lưu đơn hàng vào sessionStorage (trong thực tế sẽ gửi lên server)
    sessionStorage.setItem('currentOrder', JSON.stringify(orderData));

    // Chuyển hướng đến trang xác nhận đơn hàng
    window.location.href = 'order-confirmation.html';
}

    // Cập nhật số lượng trên icon giỏ hàng
    function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}
}

    document.addEventListener('DOMContentLoaded', function() {
        const header = document.getElementById('header-container');
        if (header) {
            header.innerHTML += `
        <div class="position-fixed top-0 end-0 m-3" style="z-index: 1000;">
          <a href="cart.html" class="btn btn-outline-dark position-relative">
            <i class="bi bi-cart"></i>
            <span class="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">0</span>
          </a>
        </div>
      `;
        }
    });