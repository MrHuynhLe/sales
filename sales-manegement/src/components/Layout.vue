<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Header -->
    <header class="bg-primary text-white py-3">
      <div class="container-fluid">
        <h1 class="mb-0">Quản Lý Bán Hàng</h1>
      </div>
    </header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/products" active-class="active">Quản Lý Sản Phẩm</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/orders" active-class="active">Quản Lý Đơn Hàng</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/customers" active-class="active">Quản Lý Khách Hàng</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/statistics" active-class="active">Thống Kê</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="flex-grow-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-3 mt-auto">
      <div class="container-fluid text-center">
        <p class="mb-0">&copy; 2026 Quản Lý Bán Hàng. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>