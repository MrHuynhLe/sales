import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '../components/ProductListView.vue'
import ProductFormView from '../components/ProductFormView.vue'
import OrderListView from '../components/OrderListView.vue'
import CustomerListView from '../components/CustomerListView.vue'
import StatisticsView from '../components/StatisticsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductListView
  },
  {
    path: '/products/add',
    name: 'ProductAdd',
    component: ProductFormView
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductFormView,
    props: true
  },
  {
    path: '/orders',
    name: 'OrderList',
    component: OrderListView
  },
  {
    path: '/customers',
    name: 'CustomerList',
    component: CustomerListView
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: StatisticsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router