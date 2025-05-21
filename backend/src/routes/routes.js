const express = require('express');
const router = express.Router();

// Endpoint para criação de produtos
router.post('/products', (req, res) => {
    // Lógica para criar um novo produto
    // Receber dados do produto do req.body
    // Salvar no banco de dados
    res.status(201).send('Produto criado com sucesso');
});

// Endpoint para listagem de produtos
router.get('/products', (req, res) => {
    // Lógica para listar produtos
    // Incluir lógica para substituir brandId por objeto Brand
    // Incluir lógica para filtrar por nome do produto
    res.status(200).send('Lista de produtos');
});

// Endpoint para listagem de marcas
router.get('/brands', (req, res) => {
    // Lógica para listar todas as marcas
    res.status(200).send('Lista de marcas');
});

module.exports = router;
