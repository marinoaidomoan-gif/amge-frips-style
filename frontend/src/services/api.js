const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const ASSET_URL = API_URL.replace('/api', '');

export const getProducts = async (category) => {
  const query = category ? `?category=${category}` : '';
  const res = await fetch(`${API_URL}/products${query}`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
};

export const loginAdmin = async (username, password) => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Connexion échouée.');
  }
  return res.json();
};

export const createProduct = async (formData, token) => {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Erreur lors de la création.');
  return res.json();
};

export const updateProduct = async (id, formData, token) => {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Erreur lors de la modification.');
  return res.json();
};

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression.');
};