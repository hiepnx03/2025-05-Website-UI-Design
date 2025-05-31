// Giỏ hàng
document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo giỏ hàng nếu chưa có
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }

    // Cập nhật số lượng trên icon giỏ hàng
    updateCartCount();

    // Xử lý sự kiện thêm vào giỏ hàng
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseInt(this.dataset.price),
                image: this.dataset.image,
                quantity: 1
            };

            addToCart(product);
        });
    });

    // Xử lý mở modal giỏ hàng
    document.getElementById('cartIcon')?.addEventListener('click', function () {
        displayCart();
    });

    // Xử lý thanh toán
    document.getElementById('checkoutBtn')?.addEventListener('click', function () {
        alert('Chức năng thanh toán sẽ được thực hiện sau!');
    });
});

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Hiển thị thông báo
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

// Cập nhật số lượng trên icon giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Hiển thị giỏ hàng trong modal
function displayCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center py-3">Giỏ hàng trống</p>';
        cartTotal.textContent = '0₫';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
        <div class="row mb-3 align-items-center border-bottom pb-3">
          <div class="col-md-2">
            <img src="${item.image}" class="img-fluid" alt="${item.name}">
          </div>
          <div class="col-md-5">
            <h6>${item.name}</h6>
            <p class="mb-0">${item.price.toLocaleString()}₫</p>
          </div>
          <div class="col-md-3">
            <div class="input-group">
              <button class="btn btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
              <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" data-id="${item.id}">
              <button class="btn btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="col-md-2 text-end">
            <p class="fw-bold mb-0">${itemTotal.toLocaleString()}₫</p>
            <button class="btn btn-link text-danger remove-item" data-id="${item.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = `${total.toLocaleString()}₫`;

    // Xử lý tăng/giảm số lượng
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function () {
            updateQuantity(this.dataset.id, 1);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function () {
            updateQuantity(this.dataset.id, -1);
        });
    });

    // Xử lý xóa sản phẩm
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            removeFromCart(this.dataset.id);
        });
    });
}

// Cập nhật số lượng sản phẩm
function updateQuantity(productId, change) {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity < 1) {
            item.quantity = 1;
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== productId);

    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}



// Toggle between grid and list view
document.getElementById('gridView').addEventListener('click', function() {
    document.getElementById('productGridView').classList.remove('d-none');
    document.getElementById('productListView').classList.add('d-none');
    this.classList.add('active');
    document.getElementById('listView').classList.remove('active');
});

document.getElementById('listView').addEventListener('click', function() {
    document.getElementById('productGridView').classList.add('d-none');
    document.getElementById('productListView').classList.remove('d-none');
    this.classList.add('active');
    document.getElementById('gridView').classList.remove('active');
});

// Color filter selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        this.classList.toggle('border');
        this.classList.toggle('border-3');
        this.classList.toggle('border-dark');
    });
});