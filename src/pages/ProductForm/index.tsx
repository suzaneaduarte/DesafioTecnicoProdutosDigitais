import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import type { Brand } from '../../types';
import { api } from '../../services/api';

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  color: var(--text);
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const FormSection = styled.div`
  background-color: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
  width: 100%;
  margin: 0;
`;

const SectionTitle = styled.h3`
  color: var(--text);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border);
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  width: 100%;
  align-items: start;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const ImageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  ${props => props.fullWidth && `
    grid-column: 1 / -1;
  `}
`;

const Label = styled.label<{ required?: boolean }>`
  color: var(--text);
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::after {
    content: '*';
    color: var(--primary);
    margin-left: 0.25rem;
    display: ${props => props.required ? 'inline' : 'none'};
  }
`;

const baseInputStyles = `
  padding: 1rem 1.25rem;
  border: 2px solid var(--border);
  border-radius: 8px;
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

const Input = styled.input`
  ${baseInputStyles}
  width: 100%;
  box-sizing: border-box;

  &[type="file"] {
    display: none;
  }

  &[type="number"] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Select = styled.select`
  ${baseInputStyles}
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23EB043D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.25rem center;
  padding-right: 3rem;
  cursor: pointer;

  &:invalid {
    color: var(--text-light);
  }
`;

const TextArea = styled.textarea`
  ${baseInputStyles}
  width: 100%;
  box-sizing: border-box;
  min-height: 150px;
  resize: vertical;
`;

const ErrorMessage = styled.span`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: -0.25rem;
`;

const ImageUploadContainer = styled(FormGroup)`
  grid-column: 3;
  grid-row: span 3;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 68%;
  background-color: var(--background);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const ImagePreview = styled.div<{ hasImage: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed ${props => props.hasImage ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${props => props.hasImage ? 'white' : 'var(--background)'};
  transition: var(--transition-normal);
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
    background-color: var(--primary-bg);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }
`;

const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-light);
  padding: 1rem;
  text-align: center;

  svg {
    width: 32px;
    height: 32px;
    color: var(--primary);
    opacity: 0.5;
  }

  span {
    font-size: 0.875rem;
  }
`;

const ImageTip = styled.span`
  display: block;
  color: var(--text-light);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface FormData {
  name: string;
  price: number;
  description?: string;
  brandId: string;
  image?: string;
}

export function ProductForm() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      brandId: '',
    }
  });

  useEffect(() => {
    async function loadBrands() {
      try {
        const brandsData = await api.getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error('Erro ao carregar marcas:', error);
      }
    }

    loadBrands();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await api.createProduct({
        ...data,
        price: Number(data.price),
        image: imagePreview || undefined,
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <PageTitle>Novo Produto</PageTitle>

      <FormSection>
        <SectionTitle>Informações do Produto</SectionTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <MainContent>
            <FormGroup fullWidth>
              <Label htmlFor="name" required>Nome do Produto</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite o nome do produto"
                {...register('name', { required: 'Nome é obrigatório' })}
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="price" required>Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  {...register('price', {
                    required: 'Preço é obrigatório',
                    min: { value: 0.01, message: 'Preço deve ser maior que zero' },
                  })}
                />
                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="brandId" required>Marca</Label>
                <Select
                  id="brandId"
                  defaultValue=""
                  {...register('brandId', { required: 'Marca é obrigatória' })}
                >
                  <option value="" disabled>Selecione uma marca</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </Select>
                {errors.brandId && <ErrorMessage>{errors.brandId.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="description">Descrição</Label>
              <TextArea
                id="description"
                placeholder="Digite uma descrição para o produto"
                {...register('description')}
              />
            </FormGroup>
          </MainContent>

          <ImageContent>
            <FormGroup>
              <Label htmlFor="image">Imagem do Produto</Label>
              <ImageTip>Recomendado: Imagem com fundo transparente ou branco</ImageTip>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <ImagePreviewWrapper>
                <ImagePreview 
                  hasImage={!!imagePreview}
                  onClick={() => document.getElementById('image')?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <UploadPlaceholder>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Clique para selecionar uma imagem</span>
                    </UploadPlaceholder>
                  )}
                </ImagePreview>
              </ImagePreviewWrapper>
            </FormGroup>
          </ImageContent>

          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="6"/>
                    <line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/>
                    <line x1="18" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                  Salvando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Salvar Produto
                </>
              )}
            </Button>
          </ButtonContainer>
        </Form>
      </FormSection>
    </FormContainer>
  );
} 