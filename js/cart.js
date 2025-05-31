document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị giỏ hàng khi trang được tải
    displayCartItems();
    updateCartCount();
});

// Hiển thị các sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSummary = document.getElementById('cartSummary');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <img src="../images/empty-cart.png" alt="Giỏ hàng trống">
                    <h4 class="text-muted mb-3">Giỏ hàng của bạn đang trống</h4>
                    <a href="product.html" class="btn btn-dark">Tiếp tục mua sắm</a>
                </div>
            `;
        cartSummary.style.display = 'none';
        return;
    }

    cartSummary.style.display = 'block';
    let html = '';
    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
                <div class="cart-item d-flex align-items-center gap-3 mb-3">
                    <img src="${item.image}" class="img-fluid rounded" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h5 class="fw-bold mb-1">${item.name}</h5>
                        <p class="text-muted mb-0">${item.price.toLocaleString()}₫</p>
                    </div>
                    <div class="quantity-selector d-flex align-items-center">
                        <button class="quantity-btn btn btn-outline-secondary p-2" onclick="updateQuantity('${item.id}', -1)">
                            <i class="bi bi-dash-lg"></i>
                        </button>
                        <span class="fs-5 mx-2">${item.quantity}</span>
                        <button class="quantity-btn btn btn-outline-secondary p-2" onclick="updateQuantity('${item.id}', 1)">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                    <span class="fw-bold">${itemTotal.toLocaleString()}₫</span>
                    <button class="remove-btn ms-3" onclick="removeFromCart('${item.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
    });

    cartItemsContainer.innerHTML = html;
    document.getElementById('subtotal').textContent = `${subtotal.toLocaleString()}₫`;

    // Tính phí vận chuyển (ví dụ: miễn phí ship cho đơn > 500k)
    const shippingFee = subtotal > 500000 ? 0 : 30000;
    document.getElementById('shipping').textContent = shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString()}₫`;

    document.getElementById('total').textContent = `${(subtotal + shippingFee).toLocaleString()}₫`;
}

// Cập nhật số lượng sản phẩm
function updateQuantity(productId, change) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        // Đảm bảo số lượng không nhỏ hơn 1
        if (cart[itemIndex].quantity < 1) {
            cart[itemIndex].quantity = 1;
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);

    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
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