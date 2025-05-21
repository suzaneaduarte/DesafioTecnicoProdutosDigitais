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
  - Busca por nome (com debounce)
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

- Tratamento de erros avançado:
  - Validação no frontend e backend
  - Mensagens de erro detalhadas
  - Feedback visual intuitivo

## Pré-Visualização das telas 

### Lista de Produtos

Nesta tela é possível visualizar todos os produtos cadastrados com seus respectivos nomes, marcas, preços e imagens. Também é possível filtrar produtos pelo nome e navegar por diferentes páginas. 

![lista-produtos](https://github.com/user-attachments/assets/257ba98a-9849-429f-b5ba-47cdc2eead47)

### Cadastro de Produto

A tela de cadastro permite inserir nome, preço, marca, descrição e imagem do produto. Os campos obrigatórios possuem validações visuais em tempo real, mensagens de erro detalhadas e feedback imediato, garantindo uma experiência fluida e segura para o usuário.

![cadastro-produtos](https://github.com/user-attachments/assets/e66813d3-90ad-4845-b2f2-12027fe4c858)

### Simulação de Delay / Carregamento

Para simular o comportamento de uma API real, o sistema introduz um pequeno delay no carregamento dos dados. Durante esse tempo, um estado de "loading" é exibido de forma clara ao usuário.

![load-tratamento-dados](https://github.com/user-attachments/assets/394b4594-e854-4d39-926d-42a377aed23b)

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

## 👩‍💻 Desenvolvido por

Suzane Alves Duarte 
