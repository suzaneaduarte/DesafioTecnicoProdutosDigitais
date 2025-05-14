import { v4 as uuidv4 } from 'uuid';
import type { Brand, Product } from '../types';

// Chaves para o localStorage
const STORAGE_KEYS = {
  BRANDS: 'supermarket_brands',
  PRODUCTS: 'supermarket_products',
};

// Mock inicial de marcas
const initialBrands: Brand[] = [
  { id: uuidv4(), name: 'Nestlé' },
  { id: uuidv4(), name: 'Coca-Cola' },
  { id: uuidv4(), name: 'Franuí' },
  { id: uuidv4(), name: 'Micos' },
  { id: uuidv4(), name: 'Sadia' },
];

// Mock inicial de produtos
const initialProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Chocolate ao Leite Classic',
    price: 5.99,
    description: 'Chocolate ao leite Nestlé Classic 90g',
    brandId: initialBrands[0].id, 
    image: '/chocolate-nestle.jpg',
  },
  {
    id: uuidv4(),
    name: 'Coca-Cola Original 2L',
    price: 7.18,
    description: 'Refrigerante Coca-Cola sabor original 2L',
    brandId: initialBrands[1].id,
    image: '/refri-cola.png',
  },
  {
    id: uuidv4(),
    name: 'Franuí',
    price: 29.57,
    description: 'Framboesas banhadas em chocolate branco',
    brandId: initialBrands[2].id,
    image: '/franui.jpg',
  },
    {
      id: uuidv4(),
      name: 'Micos de Galinha O melhor salgadinho do mundo',
      price: 1.69,
      description: 'Salgadinho de galinha levemente crocante com toques suaves de galinha caipira',
      brandId: initialBrands[3].id,
      image: '/micos-galinha.png',
    },
    {
      id: uuidv4(),
      name: 'Nuggets de frango crocante',
      price: 8.79,
      description: 'Nuggets de frango crocante',
      brandId: initialBrands[4].id,
      image: '/nurguet.png',
    },
];

// Funções auxiliares para localStorage
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    if (!stored) {
      storage.set(key, defaultValue);
      return defaultValue;
    }
    return JSON.parse(stored);
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

// Inicialização dos dados
const getBrands = (): Brand[] => storage.get(STORAGE_KEYS.BRANDS, initialBrands);
const getProducts = (): Product[] => storage.get(STORAGE_KEYS.PRODUCTS, initialProducts);

// Simulando delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service
export const api = {
  // Produtos
  async getProducts(page: number = 1, name?: string): Promise<{ data: Product[], total: number }> {
    await delay(1000);
    const itemsPerPage = 4;
    const allProducts = getProducts();
    const brands = getBrands();
    
    let filteredProducts = [...allProducts];
    
    if (name) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    return {
      data: paginatedProducts.map(product => ({
        ...product,
        brand: brands.find(b => b.id === product.brandId)
      })),
      total: filteredProducts.length
    };
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await delay(1000);
    const allProducts = getProducts();
    
    const existingProduct = allProducts.find(
      p => p.name === product.name && p.brandId === product.brandId
    );

    if (existingProduct) {
      throw new Error('Já existe um produto com este nome para esta marca.');
    }

    const newProduct = {
      ...product,
      id: uuidv4(),
    };

    allProducts.push(newProduct);
    storage.set(STORAGE_KEYS.PRODUCTS, allProducts);
    
    return newProduct;
  },

  // Marcas
  async getBrands(): Promise<Brand[]> {
    await delay(500);
    return getBrands();
  },
}; 