// src/services/CategoryService.js

const API_BASE_URL = 'http://localhost:8080/api';

export default {

  async getAllCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },


  async getCategoryById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return undefined;
        }
        throw new Error('Failed to fetch category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

 
  async createCategory(categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

 
  async updateCategory(id, categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to update category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },


  async deleteCategory(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};