// Lấy user theo username
export async function getUserByUsername(username) {
	const response = await fetch(`http://localhost:8080/api/users?username=${username}`);
	if (!response.ok) {
		throw new Error('Sai tên đăng nhập hoặc mật khẩu');
	}
	return await response.json();
}

// Kiểm tra đăng nhập (username, password)
export async function login(username, password) {
	const user = await getUserByUsername(username);
	if (!user || user.password !== password) {
		throw new Error('Sai tên đăng nhập hoặc mật khẩu');
	}
	return user;
}

export async function getUserRoleById(id) {
	const response = await fetch(`http://localhost:8080/api/users/${id}/role`);
	if (!response.ok) {
		throw new Error('Không tìm thấy user hoặc lỗi server');
	}
	return await response.text(); 
}
