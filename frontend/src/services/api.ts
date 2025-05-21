import type { Brand, Product } from '../types';

// API Service
export const api = {
  // Produtos
  async getProducts(
    page: number = 1, 
    name?: string, 
    brand?: string, 
    description?: string
  ): Promise<{ data: Product[], total: number }> {
    // Construir URL com os parâmetros disponíveis
    let url = `http://localhost:3000/api/products?page=${page}`;
    
    if (name) url += `&name=${encodeURIComponent(name)}`;
    if (brand) url += `&brand=${encodeURIComponent(brand)}`;
    if (description) url += `&description=${encodeURIComponent(description)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const data = await response.json();
    return data; 
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

    const result = await response.json();
    return result.product; 
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