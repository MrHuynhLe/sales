<template>
  <div class="container-fluid mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Quản Lý Khách Hàng</h2>
      <button class="btn btn-primary" @click="openCreateCustomerModal()">
        <i class="bi bi-plus-circle me-2"></i>Thêm Khách Hàng
      </button>
    </div>

    <div v-if="customers.length === 0" class="alert alert-info" role="alert">
      Chưa có khách hàng nào.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
            <th>Địa Chỉ</th>
            <th>Ngày Tạo</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ formatDate(customer.created_at) }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" @click="viewCustomer(customer)">Xem</button>
              <button class="btn btn-sm btn-warning me-2" @click="openEditCustomerModal(customer)">Sửa</button>
              <button class="btn btn-sm btn-danger" @click="deleteCustomer(customer)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for Add/Edit Customer -->
    <div class="modal fade" :class="{ 'show d-block': showAddCustomerModal }" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingCustomer ? 'Sửa Khách Hàng' : 'Thêm Khách Hàng' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCustomer">
              <div class="mb-3">
                <label class="form-label">Tên</label>
                <input type="text" class="form-control" v-model="customerForm.name" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Số Điện Thoại</label>
                <input type="tel" class="form-control" v-model="customerForm.phone">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="customerForm.email">
              </div>
              <div class="mb-3">
                <label class="form-label">Địa Chỉ</label>
                <textarea class="form-control" v-model="customerForm.address"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">{{ editingCustomer ? 'Cập Nhật' : 'Thêm' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomerService from '../CustomerService';

const customers = ref([]);
const showAddCustomerModal = ref(false);
const editingCustomer = ref(false);
const customerForm = ref({ id: null, name: '', phone: '', email: '', address: '' });

const fetchCustomers = async () => {
  try {
    customers.value = await CustomerService.getAllCustomers();
  } catch (error) {
    console.error('Lỗi khi tải khách hàng:', error);
    customers.value = [];
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const openCreateCustomerModal = () => {
  editingCustomer.value = false;
  customerForm.value = { id: null, name: '', phone: '', email: '', address: '' };
  showAddCustomerModal.value = true;
};

const openEditCustomerModal = (customer) => {
  editingCustomer.value = true;
  customerForm.value = { ...customer };
  showAddCustomerModal.value = true;
};

const deleteCustomer = async (customer) => {
  if (!confirm(`Bạn có chắc chắn muốn xóa khách hàng ${customer.name}?`)) return;
  try {
    await CustomerService.deleteCustomer(customer.id);
    await fetchCustomers();
  } catch (error) {
    console.error('Lỗi khi xóa khách hàng:', error);
    alert('Không thể xóa khách hàng.');
  }
};

const viewCustomer = (customer) => {
  alert(`Thông tin khách hàng:\nTên: ${customer.name}\nĐiện thoại: ${customer.phone || '-'}\nEmail: ${customer.email || '-'}\nĐịa chỉ: ${customer.address || '-'}`);
};

const saveCustomer = async () => {
  try {
    if (editingCustomer.value) {
      await CustomerService.updateCustomer(customerForm.value.id, customerForm.value);
      alert('Cập nhật khách hàng thành công.');
    } else {
      await CustomerService.createCustomer(customerForm.value);
      alert('Thêm khách hàng thành công.');
    }
    showAddCustomerModal.value = false;
    await fetchCustomers();
  } catch (error) {
    console.error('Lỗi khi lưu khách hàng:', error);
    alert('Không thể lưu khách hàng.');
  }
};

const closeModal = () => {
  showAddCustomerModal.value = false;
  editingCustomer.value = false;
  customerForm.value = { id: null, name: '', phone: '', email: '', address: '' };
};

onMounted(fetchCustomers);
</script>