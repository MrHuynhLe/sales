<template>
  <div class="container mt-4">
    <h2 class="mb-4">{{ isEditing ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới' }}</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="productName" class="form-label">Tên sản phẩm</label>
        <input type="text" class="form-control" id="productName" v-model="product.name" required>
        <div class="invalid-feedback">
          Vui lòng nhập tên sản phẩm.
        </div>
      </div>
      <div class="mb-3">
        <label for="productPrice" class="form-label">Giá</label>
        <input type="number" class="form-control" id="productPrice" v-model.number="product.price" min="0" step="0.01" required>
        <div class="invalid-feedback">
          Vui lòng nhập giá sản phẩm hợp lệ (>= 0).
        </div>
      </div>
      <div class="mb-3">
        <label for="productQuantity" class="form-label">Số lượng</label>
        <input type="number" class="form-control" id="productQuantity" v-model.number="product.quantity" min="0" required>
        <div class="invalid-feedback">
          Vui lòng nhập số lượng sản phẩm hợp lệ (>= 0).
        </div>
      </div>
      <div class="mb-3">
        <label for="productCategory" class="form-label">ID Danh mục</label>
        <input type="number" class="form-control" id="productCategory" v-model.number="product.category_id">
        <div class="form-text">
          (Tùy chọn) Nhập ID danh mục nếu có.
        </div>
      </div>
      <div class="mb-3">
        <label for="productImageUrl" class="form-label">URL Hình ảnh</label>
        <input type="text" class="form-control" id="productImageUrl" v-model="product.image_url">
      </div>
      <div class="mb-3">
        <label for="productDescription" class="form-label">Mô tả</label>
        <textarea class="form-control" id="productDescription" rows="3" v-model="product.description"></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'ProductList' }" class="btn btn-secondary me-2">Hủy</router-link>
        <button type="submit" class="btn btn-success">{{ isEditing ? 'Cập nhật' : 'Thêm mới' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductService from '../ProductService';

const route = useRoute();
const router = useRouter();

const product = ref({
  id: null,
  name: '',
  price: 0,
  quantity: 0,
  category_id: null,
  image_url: '',
  description: ''
});

const isEditing = ref(false);

const loadProduct = async (id) => {
  if (id) {
    isEditing.value = true;
    const existingProduct = await ProductService.getProductById(parseInt(id));
    if (existingProduct) {
      product.value = { ...existingProduct };
    } else {
      alert('Không tìm thấy sản phẩm!');
      router.push({ name: 'ProductList' });
    }
  } else {
    isEditing.value = false;
    product.value = { id: null, name: '', price: 0, quantity: 0, category_id: null, image_url: '', description: '' };
  }
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await ProductService.updateProduct(product.value.id, product.value);
      alert('Sản phẩm đã được cập nhật thành công!');
    } else {
      await ProductService.createProduct(product.value);
      alert('Sản phẩm đã được thêm mới thành công!');
    }
    router.push({ name: 'ProductList' }); 
  } catch (error) {
    console.error('Lỗi khi lưu sản phẩm:', error);
    alert('Đã xảy ra lỗi khi lưu sản phẩm.');
  }
};

onMounted(() => {
  loadProduct(route.params.id);
});

watch(() => route.params.id, (newId) => loadProduct(newId));
</script>