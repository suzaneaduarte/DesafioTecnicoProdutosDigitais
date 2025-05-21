import express, { Request, Response, Router } from 'express';
import { Product, products, brands, saveProducts } from '../database/mockDatabase';
import { randomUUID } from 'crypto';

const router: Router = express.Router();

// Criar produto
router.post('/products', (req: Request, res: Response) => {
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

  return res.status(201).json({
    message: 'Produto criado com sucesso',
    product: newProduct
  });
});

// Listar produtos
router.get('/products', (req: Request, res: Response) => {
  const { name } = req.query;

  let filteredProducts = products.map(product => {
    const brand = brands.find(b => b.id === product.brandId);
    return { ...product, brand };
  });

  if (typeof name === 'string') {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return res.status(200).json(filteredProducts);
});

// Listar marcas
router.get('/brands', (_req: Request, res: Response) => {
  return res.status(200).json(brands);
});

export default router;