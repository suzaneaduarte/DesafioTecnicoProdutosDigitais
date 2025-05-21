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
  
  export const brands: Brand[] = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Samsung' }
  ];
  
  export const products: Product[] = [
    {
        id: '1',
        name: 'iPhone 13',
        price: 999.99,
        brandId: '1'
    },
    {
        id: '2',
        name: 'Galaxy S21',
        price: 799.99,
        brandId: '2'
    }
  ];
  