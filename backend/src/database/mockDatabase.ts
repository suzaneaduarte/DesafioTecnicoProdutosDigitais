import fs from 'fs';
import path from 'path';

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  brandId: string;
}

const productsFile = path.resolve(__dirname, 'products.json');
const brandsFile = path.resolve(__dirname, 'brands.json');

function load<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function save<T>(filePath: string, data: T[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export const products: Product[] = load<Product>(productsFile);
export const brands: Brand[] = load<Brand>(brandsFile);

export function saveProducts(): void {
  save<Product>(productsFile, products);
}
  