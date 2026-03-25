import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '../views/ProductListView.vue'
import ProductFormView from '../views/ProductFormView.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductListView
  },
  {
    path: '/products/add',
    name: 'ProductAdd',
    component: ProductFormView
  },
  {
    path: '/products/edit/:id',
    name: 'ProductEdit',
    component: ProductFormView,
    props: true 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router