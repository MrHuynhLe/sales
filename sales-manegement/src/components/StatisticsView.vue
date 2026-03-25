<template>
  <div class="container-fluid mt-4">
    <h2>Thống Kê</h2>

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            Doanh Thu Theo Tháng
          </div>
          <div class="card-body">
            <canvas id="revenueChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            Sản Phẩm Bán Chạy
          </div>
          <div class="card-body">
            <canvas id="topProductsChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Tổng Doanh Thu</h5>
            <p class="card-text display-4">{{ formatCurrency(totalRevenue) }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Tổng Đơn Hàng</h5>
            <p class="card-text display-4">{{ totalOrders }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Tổng Khách Hàng</h5>
            <p class="card-text display-4">{{ totalCustomers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const totalRevenue = ref(0);
const totalOrders = ref(0);
const totalCustomers = ref(0);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

onMounted(() => {
  totalRevenue.value = 15000000;
  totalOrders.value = 150;
  totalCustomers.value = 50;
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
      datasets: [{
        label: 'Doanh Thu',
        data: [1200000, 1500000, 1800000, 2000000, 2200000, 2500000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  });

  const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
  new Chart(topProductsCtx, {
    type: 'bar',
    data: {
      labels: ['Sản phẩm A', 'Sản phẩm B', 'Sản phẩm C', 'Sản phẩm D', 'Sản phẩm E'],
      datasets: [{
        label: 'Số Lượng Bán',
        data: [50, 40, 35, 30, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    }
  });
});
</script>