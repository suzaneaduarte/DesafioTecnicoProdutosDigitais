import { Router } from 'express';

/**
 * Este arquivo define o router para produtos.
 * No atual estado da aplicação, todas as rotas estão centralizadas em routes.ts
 * Este arquivo é mantido para possíveis expansões futuras.
 */

const router = Router();

// Rota de exemplo 
router.get('/', (req, res) => {
  res.json({ message: 'Products API endpoint' });
});

export default router;
