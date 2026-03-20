import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export async function getProducts(params = {}) {
  const response = await api.get('/products', { params });
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function getFeaturedProducts() {
  const response = await api.get('/products/featured');
  return response.data;
}

export async function subscribeNewsletter(email) {
  const response = await api.post('/newsletter/subscribe', { email });
  return response.data;
}

export default api;
