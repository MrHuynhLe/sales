const API_BASE_URL = 'http://localhost:8080/api';

export default {
  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  },

  async getOrderById(id) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch order');
    }
    return await response.json();
  },

  async createOrder(order) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  },

  async updateOrder(id, order) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update order');
    }
    return await response.json();
  },

  async deleteOrder(id) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};