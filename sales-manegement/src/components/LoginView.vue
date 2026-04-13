<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Tên đăng nhập:</label><br>
        <input v-model="username" id="username" required /><br>
      </div>
      <div>
        <label for="password">Mật khẩu:</label><br>
        <input v-model="password" id="password" type="password" required /><br>
      </div>
      <button type="submit">Đăng nhập</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { getUserRoleById } from '../UserService';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      try {
        const res = await fetch(`http://localhost:8080/api/users?username=${this.username}`);
        if (!res.ok) {
          this.error = 'Sai tên đăng nhập hoặc mật khẩu';
          return;
        }
        const user = await res.json();
        if (!user || user.password !== this.password) {
          this.error = 'Sai tên đăng nhập hoặc mật khẩu';
          return;
        }
        const role = await getUserRoleById(user.id);
        localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username, role }));
    if (role === 'ADMIN') {
  this.$router.push('/statistics'); 
} else {
  this.$router.push('/products'); 
}
      } catch (e) {
        this.error = 'Lỗi đăng nhập';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
