import type { Brand, Product } from '../types';

// API Service
export const api = {
  // Produtos
  async getProducts(page: number = 1, name?: string): Promise<{ data: Product[], total: number }> {
    const response = await fetch(`http://localhost:3000/api/products?name=${name || ''}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const data = await response.json();
    return {
      data: data,
      total: data.length 
    };
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    console.log("Enviando produto:", product);
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar produto');
    }

    return await response.json();
  },

  // Marcas
  async getBrands(): Promise<Brand[]> {
    const response = await fetch('http://localhost:3000/api/brands');
    if (!response.ok) {
      throw new Error('Erro ao buscar marcas');
    }
    return await response.json();
  },
}; 