// @ts-nocheck
import express from 'express';
import { Product, products, brands, saveProducts } from '../database/mockDatabase';
import { randomUUID } from 'crypto';

const router = express.Router();

// Criar produto
router.post('/products', (req, res) => {
  const { name, price, description, image, brandId } = req.body;

  if (!name || !price || !brandId) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const alreadyExists = products.some(
    p => p.name === name && p.brandId === brandId
  );

  if (alreadyExists) {
    return res.status(409).json({ error: 'Produto com essa marca e nome já existe.' });
  }

  const newProduct: Product = {
    id: randomUUID(), 
    name,
    price,
    description,
    image,
    brandId,
  };

  products.push(newProduct);
  saveProducts();

  // Encontrar a marca para incluir no objeto de resposta
  const brand = brands.find(b => b.id === brandId);
  
  return res.status(201).json({
    message: 'Produto criado com sucesso',
    product: {
      ...newProduct,
      brand
    }
  });
});

// Listar produtos
router.get('/products', (req, res) => {
  const { name, brand, description, page = '1' } = req.query;
  const currentPage = parseInt(page as string) || 1;
  const itemsPerPage = 4; 

  let filteredProducts = products.map(product => {
    const productBrand = brands.find(b => b.id === product.brandId);
    return { ...product, brand: productBrand };
  });

  // Filtro por nome (busca geral que continua funcionando como antes)
  if (typeof name === 'string' && name.trim() !== '') {
    const searchTerm = name.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      // Busca por nome do produto
      product.name.toLowerCase().includes(searchTerm) || 
      // Busca por descrição (se existir)
      (product.description && product.description.toLowerCase().includes(searchTerm)) || 
      // Busca por marca
      (product.brand && product.brand.name.toLowerCase().includes(searchTerm))
    );
  }

  // Filtro específico por marca
  if (typeof brand === 'string' && brand.trim() !== '') {
    const brandTerm = brand.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.brand && product.brand.name.toLowerCase().includes(brandTerm)
    );
  }

  // Filtro específico por descrição
  if (typeof description === 'string' && description.trim() !== '') {
    const descTerm = description.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.description && product.description.toLowerCase().includes(descTerm)
    );
  }

  // Aplicar paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return res.status(200).json({
    data: paginatedProducts,
    total: filteredProducts.length
  });
});

// Listar marcas
router.get('/brands', (req, res) => {
  return res.status(200).json(brands);
});

export default router;