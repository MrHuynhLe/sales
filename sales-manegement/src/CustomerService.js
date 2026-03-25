const API_BASE_URL = 'http://localhost:8080/api';

export default {
  async getAllCustomers() {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return await response.json();
  },

  async getCustomerById(id) {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch customer');
    }
    return await response.json();
  },

  async createCustomer(customer) {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (!response.ok) throw new Error('Failed to create customer');
    return await response.json();
  },

  async updateCustomer(id, customer) {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update customer');
    }
    return await response.json();
  },

  async deleteCustomer(id) {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};