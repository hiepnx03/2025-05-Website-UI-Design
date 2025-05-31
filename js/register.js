// Xử lý khi form được submit
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Kiểm tra mật khẩu trùng khớp
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu không trùng khớp! Vui lòng nhập lại.');
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }

    // Lấy thông tin từ form
    const userData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        password: password
    };

    // Lưu thông tin vào localStorage (trong thực tế sẽ gửi lên server)
    localStorage.setItem('userData', JSON.stringify(userData));

    // Thông báo thành công và chuyển hướng
    alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
    window.location.href = 'login.html';
});