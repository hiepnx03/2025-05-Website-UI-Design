// Form validation for terms checkbox
document.getElementById('placeOrderBtn').addEventListener('click', function(e) {
    if (!document.getElementById('termsCheck').checked) {
        e.preventDefault();
        alert('Vui lòng đồng ý với Điều khoản dịch vụ');
    } else {
        // Submit order logic would go here
        alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi.');
        window.location.href = 'index.html';
    }
});

// Lấy dữ liệu đơn hàng từ sessionStorage (nếu có)
document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(sessionStorage.getItem('currentOrder'));
    if (orderData) {
        // Cập nhật thông tin đơn hàng từ dữ liệu lưu trữ
        // (Cần thêm logic xử lý hiển thị dữ liệu thực tế)
    }
});