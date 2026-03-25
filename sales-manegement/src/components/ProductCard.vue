<template>
  <div class="card h-100 shadow-sm">
    <img :src="product.image_url || 'https://via.placeholder.com/150'" class="card-img-top" :alt="product.name">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text text-muted flex-grow-1">{{ product.description || 'Không có mô tả.' }}</p>
      <div class="d-flex justify-content-between align-items-center mt-auto">
        <span class="fw-bold text-primary">{{ formatCurrency(product.price) }}</span>
        <span class="badge bg-secondary">SL: {{ product.quantity }}</span>
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <router-link :to="{ name: 'ProductEdit', params: { id: product.id } }" class="btn btn-sm btn-outline-primary me-2">
          Sửa
        </router-link>
        <button @click="$emit('delete-product', product.id)" class="btn btn-sm btn-outline-danger">
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete-product']);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>