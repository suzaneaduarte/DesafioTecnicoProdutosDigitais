# SuperSuzy — Sistema de Gestão de Produtos de Supermercado

Aplicação web desenvolvida em React + TypeScript que permite o cadastro, listagem e visualização de produtos de supermercado com dados mockados via localStorage.

## Stacks

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

- Tratamento de erros

## Pré-Visualização das telas 

### Lista de Produtos

Nesta tela é possível visualizar todos os produtos cadastrados com seus respectivos nomes, marcas, preços e imagens. Também é possível filtrar produtos pelo nome e navegar por diferentes páginas. 

![lista-produtos](https://github.com/user-attachments/assets/257ba98a-9849-429f-b5ba-47cdc2eead47)

### Cadastro de Produto

A tela de cadastro permite inserir nome, preço, marca, descrição e imagem do produto. Os campos obrigatórios possuem validações visuais, garantindo uma experiência fluida e segura para o usuário.

![cadastro-produtos](https://github.com/user-attachments/assets/e66813d3-90ad-4845-b2f2-12027fe4c858)

### Simulação de Delay / Carregamento

Para simular o comportamento de uma API real, o sistema introduz um pequeno delay no carregamento dos dados. Durante esse tempo, um estado de "loading" é exibido de forma clara ao usuário.

![load-tratamento-dados](https://github.com/user-attachments/assets/394b4594-e854-4d39-926d-42a377aed23b)

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
