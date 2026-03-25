// src/services/ProductService.js

/**
 * @typedef {import('../models/ProductModel').Product} Product
 */

const API_BASE_URL = 'http://localhost:8080/api';

export default {
  /**
   * Lấy tất cả sản phẩm.
   * @returns {Promise<Product[]>}
   */
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Lấy sản phẩm theo ID.
   * @param {number} id
   * @returns {Promise<Product | undefined>}
   */
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return undefined;
        }
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Tạo sản phẩm mới.
   * @param {Omit<Product, 'id' | 'created_at'>} productData
   * @returns {Promise<Product>}
   */
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Cập nhật sản phẩm.
   * @param {number} id
   * @param {Partial<Product>} productData
   * @returns {Promise<Product | null>}
   */
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to update product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};