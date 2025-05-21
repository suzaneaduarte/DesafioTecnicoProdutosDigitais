import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';
import { api } from '../../services/api';
import type { Product } from '../../types';
import { Modal } from '../../components/Modal';

const PageTitle = styled.h2`
  font-size: 2rem;
  color: var(--text);
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--section-spacing);
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 500px;
  margin-right: -0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.5;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  background-color: var(--surface);
  color: var(--text);
  transition: var(--transition-normal);

  &:hover {
    border-color: var(--primary-light);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-bg);
  }

  &::placeholder {
    color: var(--text-light);
  }
`;

const TableContainer = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow-x: auto;
  margin: 0 -0.5rem;

  @media (max-width: 768px) {
    border-radius: var(--radius-md);
    margin: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1.5rem 2.5rem;
  background-color: var(--surface);
  border-bottom: 2px solid var(--border);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;

  &:first-child {
    width: 110px;
  }

  &:last-child {
    text-align: center;
    width: 110px;
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
`;

const Td = styled.td`
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid var(--border-light);
  font-size: 1.1rem;
  color: var(--text);
  vertical-align: middle;

  &:first-child {
    width: 110px;
  }

  &:last-child {
    text-align: center;
    width: 110px;
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
`;

const Tr = styled.tr`
  transition: var(--transition-fast);

  &:hover {
    background-color: var(--primary-bg);
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 0.25rem;
  background-color: white;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: var(--section-spacing);
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 1rem 1.5rem;
  min-width: 3rem;
  border: 2px solid ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius-md);
  background-color: ${props => props.active ? 'var(--primary)' : 'var(--surface)'};
  color: ${props => props.active ? 'white' : 'var(--text)'};
  font-size: 1.1rem;
  font-weight: 500;
  transition: var(--transition-normal);

  &:hover:not(:disabled) {
    border-color: var(--primary);
    color: ${props => props.active ? 'white' : 'var(--primary)'};
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: var(--text-light);
  font-size: 1.2rem;
`;

const Price = styled.span`
  font-weight: 500;
  color: var(--primary);
`;

const DetailButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: var(--transition-normal);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--primary);
    background-color: var(--primary-bg);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProductHeader = styled.div`
  display: flex;
  gap: 2rem;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const ProductMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--text-light);
  font-size: 1.1rem;
`;

const ProductDescription = styled.p`
  color: var(--text);
  font-size: 1.1rem;
  line-height: 1.6;
`;

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Resetar para a página 1 quando o termo de busca mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getProducts(currentPage, debouncedSearchTerm);
        setProducts(response.data);
        setTotalItems(response.total);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setError('Erro ao carregar produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [currentPage, debouncedSearchTerm]);

  const totalPages = Math.ceil(totalItems / 4);

  return (
    <div>
      <PageHeader>
        <PageTitle>Lista de Produtos</PageTitle>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </PageHeader>

      {error ? (
        <LoadingState>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </LoadingState>
      ) : loading ? (
        <LoadingState>Carregando produtos...</LoadingState>
      ) : (
        <>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Produto</Th>
                  <Th>Nome</Th>
                  <Th>Marca</Th>
                  <Th>Preço</Th>
                  <Th>Detalhes</Th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <ProductImage 
                        src={product.image || 'https://via.placeholder.com/80'} 
                        alt={product.name}
                      />
                    </Td>
                    <Td>{product.name}</Td>
                    <Td>{product.brand?.name}</Td>
                    <Td>
                      <Price>R$ {product.price.toFixed(2)}</Price>
                    </Td>
                    <Td>
                      <DetailButton
                        onClick={() => setSelectedProduct(product)}
                        title="Ver detalhes"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </DetailButton>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          <PaginationContainer>
            <PageButton
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              ←
            </PageButton>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageButton
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </PageButton>
          </PaginationContainer>

          <Modal
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          >
            {selectedProduct && (
              <ProductDetails>
                <ProductHeader>
                  <ProductImage
                    src={selectedProduct.image || 'https://via.placeholder.com/80'}
                    alt={selectedProduct.name}
                  />
                  <ProductInfo>
                    <ProductName>{selectedProduct.name}</ProductName>
                    <ProductMeta>
                      <span>Marca: {selectedProduct.brand?.name}</span>
                      <span>•</span>
                      <Price>R$ {selectedProduct.price.toFixed(2)}</Price>
                    </ProductMeta>
                  </ProductInfo>
                </ProductHeader>
                {selectedProduct.description && (
                  <ProductDescription>
                    {selectedProduct.description}
                  </ProductDescription>
                )}
              </ProductDetails>
            )}
          </Modal>
        </>
      )}
    </div>
  );
} 