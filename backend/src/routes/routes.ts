import express from 'express';
import { Product, products, brands } from '../database/mockDatabase';

const router = express.Router();

router.post('/products', (req, res) => {
  const { id, name, price, description, image, brandId } = req.body as Product;

  if (!id || !name || !price || !brandId) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const alreadyExists = products.some(
    p => p.name === name && p.brandId === brandId
  );

  if (alreadyExists) {
    return res.status(409).json({ error: 'Produto com essa marca e nome já existe.' });
  }

  const newProduct: Product = { id, name, price, description, image, brandId };
  products.push(newProduct);

  return res.status(201).json({
    message: 'Produto criado com sucesso',
    product: newProduct
  });
});

router.get('/products', (req, res) => {
  const { name } = req.query;

  let filteredProducts = products.map(product => {
    const brand = brands.find(b => b.id === product.brandId);
    return { ...product, brand };
  });

  if (name && typeof name === 'string') {
    filteredProducts = filteredProducts.filter(product =>
      product.name.includes(name)
    );
  }

  res.status(200).json(filteredProducts);
});

router.get('/brands', (req, res) => {
  res.status(200).json(brands);
});

export default router;
