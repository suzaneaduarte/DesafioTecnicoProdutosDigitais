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
  brand?: Brand;
} 