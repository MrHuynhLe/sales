<template>
  <div class="container-fluid mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Quản lý Sản phẩm</h2>
      <router-link :to="{ name: 'ProductAdd' }" class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i>Thêm sản phẩm
      </router-link>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <input type="text" class="form-control" placeholder="Tìm kiếm sản phẩm..." v-model="searchText" @input="applyFilter" />
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="alert alert-info" role="alert">
      Không có sản phẩm phù hợp.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>SL</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="product.id">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="text-center" style="width: 80px;"><img :src="product.image_url || 'https://via.placeholder.com/50'" class="img-fluid" style="max-height: 50px;" /></td>
            <td>{{ product.name }}</td>
            <td>{{ product.description || 'Không có mô tả.' }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td><span class="badge bg-secondary">{{ product.quantity ?? 0 }}</span></td>
            <td>{{ product.category_name || product.category_id || 'N/A' }}</td>
            <td>
              <router-link :to="{ name: 'ProductEdit', params: { id: product.id } }" class="btn btn-sm btn-outline-primary me-1">Sửa</router-link>
              <button @click="handleDeleteProduct(product.id)" class="btn btn-sm btn-outline-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-end align-items-center mt-2" v-if="pages > 1">
      <nav>
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Trước</button>
          </li>
          <li class="page-item" v-for="n in pages" :class="{ active: n === currentPage }" :key="n">
            <button class="page-link" @click="changePage(n)">{{ n }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === pages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Tiếp</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductService from '../ProductService';

const products = ref([]);
const searchText = ref('');
const pageSize = ref(10);
const currentPage = ref(1);

const fetchProducts = async () => {
  try {
    products.value = await ProductService.getAllProducts();
    currentPage.value = 1;
  } catch (error) {
    console.error('Lỗi khi tải danh sách sản phẩm:', error);
    alert('Không thể tải danh sách sản phẩm.');
  }
};

const filteredProducts = computed(() => {
  const text = searchText.value.trim().toLowerCase();
  if (!text) return products.value;
  return products.value.filter((p) =>
    p.name?.toLowerCase().includes(text) ||
    p.description?.toLowerCase().includes(text) ||
    String(p.category_id ?? '').toLowerCase().includes(text)
  );
});

const pages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize.value)));
const paginatedProducts = computed(() => {
  const begin = (currentPage.value - 1) * pageSize.value;
  return filteredProducts.value.slice(begin, begin + pageSize.value);
});

const changePage = (page) => {
  if (page < 1 || page > pages.value) return;
  currentPage.value = page;
};

const applyFilter = () => {
  currentPage.value = 1;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const handleDeleteProduct = async (productId) => {
  if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
    try {
      const success = await ProductService.deleteProduct(productId);
      if (success) {
        alert('Sản phẩm đã được xóa thành công!');
        fetchProducts();
      } else {
        alert('Không tìm thấy sản phẩm để xóa.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      alert('Đã xảy ra lỗi khi xóa sản phẩm.');
    }
  }
};

onMounted(fetchProducts);
</script>