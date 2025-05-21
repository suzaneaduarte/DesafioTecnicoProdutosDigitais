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
  const { name, page = '1' } = req.query;
  const currentPage = parseInt(page as string) || 1;
  const itemsPerPage = 4; 

  let filteredProducts = products.map(product => {
    const brand = brands.find(b => b.id === product.brandId);
    return { ...product, brand };
  });

  if (typeof name === 'string') {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
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