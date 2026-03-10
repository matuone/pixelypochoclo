const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const articleService = {
  // Obtener todos los artículos
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/articles?${queryString}`);
    if (!response.ok) throw new Error('Error al obtener artículos');
    return response.json();
  },

  // Obtener artículo por ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/articles/by-id/${id}`);
    if (!response.ok) throw new Error('Artículo no encontrado');
    return response.json();
  },

  // Obtener artículo por slug
  getBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/articles/by-slug/${slug}`);
    if (!response.ok) throw new Error('Artículo no encontrado');
    return response.json();
  },

  // Obtener artículos por categoría
  getByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/articles/category/${category}?${queryString}`);
    if (!response.ok) throw new Error('Error al obtener artículos');
    return response.json();
  },

  // Crear artículo
  create: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      body: formData, // FormData se envía sin headers Content-Type
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear artículo');
    }
    return response.json();
  },

  // Actualizar artículo
  update: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar artículo');
    }
    return response.json();
  },

  // Eliminar artículo
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar artículo');
    }
    return response.json();
  },
};
