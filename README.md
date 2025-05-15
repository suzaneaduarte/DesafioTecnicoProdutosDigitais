# SuperSuzy — Sistema de Gestão de Produtos de Supermercado

Aplicação web desenvolvida em React + TypeScript que permite o cadastro, listagem e visualização de produtos de supermercado com dados mockados via localStorage.

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Styled-components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router DOM](https://reactrouter.com/)
- Armazenamento local via `localStorage`

## Funcionalidades

- Listagem de produtos com:
  - Busca por nome (com debounce)
  - Paginação
  - Visualização dos detalhes do produto em modal 

- Cadastro de novos produtos com:
  - Upload e preview de imagem
  - Validação de campos

- Simulação de API com `localStorage`

- Estilização consistente com tema visual

- Responsividade adequada para telas mobile

## Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/supersuzy.git
cd supersuzy
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:5173
```

## Estrutura de Pastas

```
src/
├── components/      # Componentes reutilizáveis (Layout, Modal)
├── pages/           # Páginas (ProductList, ProductForm)
├── services/        # API mockada com localStorage
├── styles/          # Estilos globais
├── types/           # Tipagens compartilhadas
└── hooks/           # Custom hooks (debounce)
```

## 👩‍💻 Desenvolvido por

Suzane Alves Duarte 