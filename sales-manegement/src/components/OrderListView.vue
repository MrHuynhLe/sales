<template>
  <div class="container-fluid mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Quản Lý Đơn Hàng</h2>
      <button class="btn btn-primary" @click="openCreateOrderModal()">
        <i class="bi bi-plus-circle me-2"></i>Thêm Đơn Hàng
      </button>
    </div>

    <div v-if="orders.length === 0" class="alert alert-info" role="alert">
      Chưa có đơn hàng nào.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Khách Hàng</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Ngày Tạo</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.code }}</td>
            <td>{{ order.customer ? order.customer.name : 'N/A' }}</td>
            <td>{{ formatCurrency(order.total_amount) }}</td>
            <td>
              <span class="badge" :class="getStatusClass(order.status)">{{ order.status }}</span>
            </td>
            <td>{{ formatDate(order.created_at) }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" @click="viewOrder(order)">Xem</button>
              <button class="btn btn-sm btn-warning me-2" @click="openEditOrderModal(order)">Sửa</button>
              <button class="btn btn-sm btn-danger" @click="deleteOrder(order)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for Add/Edit Order -->
    <div class="modal fade" :class="{ 'show d-block': showAddOrderModal }" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingOrder ? 'Sửa Đơn Hàng' : 'Thêm Đơn Hàng' }}</h5>
            <button type="button" class="btn-close" @click="showAddOrderModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveOrder">
              <div class="mb-3">
                <label class="form-label">Mã đơn</label>
                <input class="form-control" v-model="orderForm.code" required />
              </div>
              <div class="mb-3">
                <label class="form-label">ID khách hàng</label>
                <input type="number" class="form-control" v-model.number="orderForm.customer_id" required />
              </div>
              <div class="row g-2 mb-3">
                <div class="col">
                  <label class="form-label">Tổng tiền</label>
                  <input type="number" class="form-control" v-model.number="orderForm.total_amount" min="0" step="0.01" required />
                </div>
                <div class="col">
                  <label class="form-label">Giảm giá</label>
                  <input type="number" class="form-control" v-model.number="orderForm.discount_amount" min="0" step="0.01" />
                </div>
                <div class="col">
                  <label class="form-label">Phí ship</label>
                  <input type="number" class="form-control" v-model.number="orderForm.shipping_fee" min="0" step="0.01" />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Trạng thái</label>
                <select class="form-select" v-model="orderForm.status">
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Ghi chú</label>
                <textarea class="form-control" v-model="orderForm.note"></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" @click="showAddOrderModal = false">Hủy</button>
                <button type="submit" class="btn btn-success">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OrderService from '../OrderService';

const orders = ref([]);
const showAddOrderModal = ref(false);
const orderForm = ref({ id: null, code: '', customer_id: null, total_amount: 0, discount_amount: 0, shipping_fee: 0, status: 'PENDING', note: '' });
const editingOrder = ref(false);

const fetchOrders = async () => {
  try {
    orders.value = await OrderService.getAllOrders();
  } catch (error) {
    console.error('Lỗi khi tải đơn hàng:', error);
    orders.value = [];
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const getStatusClass = (status) => {
  switch (status) {
    case 'PENDING': return 'bg-warning';
    case 'PAID': return 'bg-success';
    case 'CANCELLED': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

const openCreateOrderModal = () => {
  editingOrder.value = false;
  orderForm.value = { id: null, code: '', customer_id: null, total_amount: 0, discount_amount: 0, shipping_fee: 0, status: 'PENDING', note: '' };
  showAddOrderModal.value = true;
};

const openEditOrderModal = (order) => {
  editingOrder.value = true;
  orderForm.value = { ...order, customer_id: order.customer?.id ?? order.customer_id };
  showAddOrderModal.value = true;
};

const saveOrder = async () => {
  try {
    if (editingOrder.value) {
      await OrderService.updateOrder(orderForm.value.id, orderForm.value);
      alert('Đơn hàng đã được cập nhật.');
    } else {
      await OrderService.createOrder(orderForm.value);
      alert('Đơn hàng đã được tạo.');
    }
    showAddOrderModal.value = false;
    fetchOrders();
  } catch (error) {
    console.error('Lỗi khi lưu đơn hàng:', error);
    alert('Không thể lưu đơn hàng.');
  }
};

const deleteOrder = async (order) => {
  if (!confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${order.code}?`)) return;
  try {
    await OrderService.deleteOrder(order.id);
    fetchOrders();
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    alert('Không thể xóa đơn hàng.');
  }
};

onMounted(fetchOrders);
</script>