# SuperSuzy — Sistema de Gestão de Produtos de Supermercado

Aplicação web desenvolvida em React + TypeScript que permite o cadastro, listagem e visualização de produtos de supermercado com dados mockados via API.

## Stacks

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Styled-components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router DOM](https://reactrouter.com/)
- Backend Express simulando API RESTful
- Armazenamento via arquivo JSON (mock database)

## Funcionalidades

- Listagem de produtos com:
  - Busca por nome, descrição e marca
  - Paginação
  - Visualização dos detalhes do produto em modal 

- Cadastro de novos produtos com:
  - Upload e preview de imagem (local ou URL)
  - Validação de campos em tempo real
  - Feedback visual de erros
  - Redimensionamento automático de imagens
  - Tratamento de erros melhorado

- Arquitetura completa:
  - Frontend React com TypeScript
  - Backend Express com mock database
  - Comunicação via API RESTful

- Estilização consistente com tema visual

- Responsividade adequada para telas mobile

- Tratamento de erros:
  - Validação no frontend e backend
  - Mensagens de erro detalhadas
  - Feedback visual intuitivo

## Pré-Visualização das telas 

### Lista de Produtos

Nesta tela é possível visualizar todos os produtos cadastrados com seus respectivos nomes, marcas, preços e imagens. Também é possível filtrar produtos pelo nome, descrição e marca. Além de também ser possível navegar por diferentes páginas. 


### Cadastro de Produto

A tela de cadastro permite inserir nome, preço, marca, descrição e imagem do produto. Os campos obrigatórios possuem validações visuais em tempo real, mensagens de erro detalhadas e feedback imediato, garantindo uma experiência fluida e segura para o usuário.


## Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/suzaneaduarte/DesafioTecnicoProdutosDigitais.git
cd DesafioTecnicoProdutosDigitais
```

2. Execute o projeto com Docker Compose:

```bash
docker-compose up
```

3. Acesse no navegador:

```
http://localhost:5173
```

O Docker Compose irá construir e iniciar automaticamente tanto o backend quanto o frontend, eliminando a necessidade de instalar dependências ou executar serviços separadamente.

## Estrutura do Projeto

```
projeto/
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   │   ├── ProductList/  # Listagem de produtos
│   │   │   └── ProductForm/  # Formulário de cadastro com validação
│   │   ├── services/        # Serviços API
│   │   ├── hooks/           # Custom hooks
│   │   ├── styles/          # Estilos globais
│   │   └── types/           # Tipagens compartilhadas
│   └── public/
│
└── backend/
    ├── src/
    │   ├── routes/          # Rotas da API
    │   ├── database/        # Mock database com JSON
    │   └── index.ts         # Entrada da aplicação
```

## Testes da API  

Esta API foi testada usando o [Postman](https://www.postman.com/) e possui uma [coleção de testes](./ProdutosDigitaisAPI.postman_collection.json) configurada com variáveis e endpoints para facilitar o desenvolvimento.

### Variável de ambiente configurada

| Variável  | Valor                   |
| --------- | ----------------------- |
| `baseUrl` | `http://localhost:3000` |

Foi utilizado `{{baseUrl}}` nas requisições para facilitar a mudança entre ambientes.

### Endpoints Testados

#### `GET /api/products` — Buscar Produtos

* Retorna todos os produtos cadastrados no Banco de Dados. 

#### `GET /api/brands` — Buscar Marcas

* Lista todas as marcas cadastradas.

#### `GET /api/products?name=...` — Busca por nome 

* Testa o Filtro por Nome
* Exemplo de uso: `?name=sabonete`
* Retorna produtos cujo nome contenha **sabonete** como valor informado.

#### `GET /api/products?description=...` — Busca por Descrição

* Testa o Filtro por Descrição
* Exemplo de uso: `?description=finos`
* Retorna produtos cujo campo de descrição contenha **finos**. 

#### `GET /api/products?brand=...` — Busca por marca 

* Testa o Filtro por Marca
* Exemplo de uso: `?brand=Dove`
* Retorna produtos associados a uma marca pelo **nome** da marca.

#### `POST /api/products` — Criar Produto

* Adiciona um novo produto com os campos:

  * `name`, `price`, `brandId` (obrigatórios)
  * `description`, `image` (opcionais)

### Importar no Postman

Caso você deseje, é possível importar a coleção diretamente no Postman:

1. Clique em **Import** no Postman
2. Selecione o arquivo `ProdutosDigitaisAPI.postman_collection.json`
3. Todos os endpoints estarão organizados e prontos para uso

## 👩‍💻 Desenvolvido por

Suzane Alves Duarte 
