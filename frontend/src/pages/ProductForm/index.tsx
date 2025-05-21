import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import type { Brand } from '../../types';
import { api } from '../../services/api';
import Select, { SingleValue } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 2.5rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 1.5rem;
  }
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  color: var(--text);
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const FormSection = styled.div`
  background-color: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
  width: 100%;
  margin: 0;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: var(--radius-md);
  }
`;

const SectionTitle = styled.h3`
  color: var(--text);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border);

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ImageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-height: 100%;
  justify-content: flex-start;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean; offsetTop?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  ${props => props.fullWidth && `
    grid-column: 1 / -1;
  `}
  ${props => props.offsetTop && `
    margin-top: 2rem;
  `}
`;

const Label = styled.label<{ required?: boolean }>`
  color: var(--text);
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;

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

const Input = styled.input<{ hasError?: boolean }>`
  ${baseInputStyles}
  width: 100%;
  box-sizing: border-box;
  border-color: ${props => props.hasError ? 'var(--error)' : 'var(--border)'};

  &:hover {
    border-color: ${props => props.hasError ? 'var(--error)' : 'var(--primary-light)'};
  }

  &:focus {
    border-color: ${props => props.hasError ? 'var(--error)' : 'var(--primary)'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.2)' : 'var(--primary-bg)'};
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }

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

const TextArea = styled.textarea`
  ${baseInputStyles}
  width: 100%;
  box-sizing: border-box;
  min-height: 172px;
  resize: vertical;

  @media (max-width: 768px) {
    min-height: 150px;
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: -0.25rem;
`;

const ImagePreviewWrapper = styled.div<{ useImageUrl: boolean }>`
  position: relative;
  width: 100%;
  background-color: var(--background);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-sizing: border-box;

  ${props => !props.useImageUrl && `
    margin-top: 2.2rem;
    height: calc(172px + 1.5rem + 50px);
  `}

  @media (max-width: 768px) {
    ${props => !props.useImageUrl && `
      margin-top: 0;
      height: 200px;
    `}
  }
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
    padding: 0.5rem;
  }
`;

const UploadPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  text-align: center;
  width: 100%;
  height: 100%;

  svg {
    width: 24px;
    height: 24px;
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
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }

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

const ToggleContainer = styled.div`
  display: flex;
  margin-bottom: 0;
  height: 50px;
  box-sizing: border-box;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 1rem 1.25rem;
  border: 2px solid var(--border);
  background: ${props => props.active ? 'var(--primary)' : 'var(--surface)'};
  color: ${props => props.active ? 'white' : 'var(--text)'};
  cursor: pointer;
  flex: 1;
  transition: all 0.2s ease;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
  
  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'var(--primary-light)'};
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }
`;

const AlignedUrlField = styled.div`
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const AlignedImageUpload = styled.div`
  margin-top: 2.625rem;

  input[type='file'] {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    margin-top: 0;
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
  const [useImageUrl, setUseImageUrl] = useState(false);
  const navigate = useNavigate();

  const brandOptions = brands.map(brand => ({
    value: brand.id,
    label: brand.name
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    defaultValues: {
      brandId: '',
    }
  });

  const imageUrl = watch('image');

  useEffect(() => {
    console.log("useEffect imageUrl:", useImageUrl, imageUrl);
    if (useImageUrl && imageUrl) {
      console.log("Definindo imagePreview a partir da URL:", imageUrl);
      setImagePreview(imageUrl);
    }
  }, [useImageUrl, imageUrl]);

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
    console.log("handleImageChange chamado", event.target.files);
    const file = event.target.files?.[0];
    if (file) {
      // Verificar se o arquivo é uma imagem
      if (!file.type.match('image.*')) {
        alert('Por favor, selecione uma imagem válida');
        return;
      }

      console.log("Arquivo selecionado:", file.name, file.type, file.size);
      const reader = new FileReader();
      const img = new Image();
      
      reader.onload = (event) => {
        console.log("FileReader onload");
        if (event.target?.result) {
          img.src = event.target.result as string;
          
          img.onload = () => {
            console.log("Image onload, dimensões:", img.width, img.height);
            // Redimensionar a imagem para evitar problemas de tamanho
            const maxWidth = 800;
            const maxHeight = 800;
            let width = img.width;
            let height = img.height;
            
            // Redimensionar proporcionalmente se necessário
            if (width > maxWidth || height > maxHeight) {
              if (width > height) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
              } else {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
              }
            }
            
            // Criar canvas para redimensionar
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            
            // Desenhar imagem redimensionada
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              
              // Converter para JPEG com qualidade reduzida (70%)
              const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
              console.log("Imagem redimensionada, tamanho da string:", resizedImage.length);
              setImagePreview(resizedImage);
            } else {
              console.error("Não foi possível obter o contexto 2D do canvas");
            }
          };
          
          img.onerror = () => {
            console.error("Erro ao carregar a imagem");
            alert("Erro ao carregar a imagem. Por favor, tente outra imagem.");
          };
        }
      };
      
      reader.onerror = (error) => {
        console.error("Erro ao ler o arquivo:", error);
        alert("Erro ao ler o arquivo. Por favor, tente novamente.");
      };
      
      reader.readAsDataURL(file);
    }
  };

  const toggleImageInputType = () => {
    setUseImageUrl(!useImageUrl);
    setImagePreview('');
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Formulário enviado com dados:", data);
      console.log("Estado do imagePreview:", imagePreview?.substring(0, 50) + "...");

      // Limitar o tamanho da string base64 da imagem
      let imageData = useImageUrl ? data.image : imagePreview;
      console.log("Utilizando imagem de:", useImageUrl ? "URL externa" : "Upload local");
      
      if (!imageData) {
        console.warn("Nenhuma imagem fornecida");
      }
      
      if (!useImageUrl && imagePreview && imagePreview.length > 1024 * 1024) {
        console.error("Imagem muito grande:", imagePreview.length, "bytes");
        alert('A imagem é muito grande. Por favor, use uma URL de imagem ou uma imagem menor.');
        setLoading(false);
        return;
      }

      console.log("Preparando para chamar api.createProduct");
      const produto = {
        ...data,
        price: Number(data.price),
        image: imageData || undefined,
      };
      console.log("Produto a ser enviado:", { ...produto, image: produto.image ? produto.image.substring(0, 50) + "..." : undefined });
      
      const result = await api.createProduct(produto);
      console.log("Produto criado com sucesso:", result);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploadClick = () => {
    console.log("handleImageUploadClick, useImageUrl:", useImageUrl);
    if (!useImageUrl) {
      const input = document.getElementById('image') as HTMLInputElement;
      if (input) {
        console.log("Clicando no input de imagem");
        input.click();
      } else {
        console.error("Input de imagem não encontrado");
      }
    }
  };

  return (
    <FormContainer>
      <PageTitle>Cadastrar Produto</PageTitle>
      <FormSection>
        <SectionTitle>Informações do Produto</SectionTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <MainContent>
            <FormGroup>
              <Label htmlFor="name" required>Nome do Produto</Label>
              <Input id="name" type="text" placeholder="Digite o nome do produto" hasError={!!errors.name} {...register('name', {
                required: 'Nome é obrigatório', minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
              })} />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="price" required>Preço</Label>
                <Input id="price" type="number" step="0.01" placeholder="0,00" hasError={!!errors.price} {...register('price', {
                  required: 'Preço é obrigatório', min: { value: 0.01, message: 'Deve ser maior que zero' }, validate: v => !isNaN(v) || 'Preço inválido'
                })} />
                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="brandId" required>Marca</Label>
                <Select<OptionType>
                  id="brandId"
                  options={brandOptions}
                  onChange={(option: SingleValue<OptionType>) => setValue('brandId', option?.value || '')}
                  placeholder="Selecione uma marca"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: '54px',
                      padding: '0.25rem 0.25rem',
                      fontSize: '1.1rem',
                      borderWidth: '2px',
                      borderRadius: '8px',
                      borderColor: errors.brandId ? 'var(--error)' : 'var(--border)',
                      backgroundColor: 'var(--surface)',
                      boxShadow: state.isFocused ? 
                        (errors.brandId ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : '0 0 0 3px var(--primary-bg)') : 
                        'none',
                      '&:hover': {
                        borderColor: errors.brandId ? 'var(--error)' : 'var(--primary-light)'
                      },
                      '@media (max-width: 768px)': {
                        fontSize: '1rem',
                        padding: '0.175rem 0.175rem',
                      }
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      padding: '0 1rem',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: 'var(--text)',
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: 'var(--text-light)',
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'var(--text)',
                    }),
                    indicatorSeparator: () => ({
                      display: 'none'
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: 'var(--primary)',
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: 'var(--surface)',
                      boxShadow: 'var(--shadow-md)',
                      border: '2px solid var(--primary-light)',
                      borderRadius: '8px',
                      marginTop: '4px',
                      overflow: 'hidden',
                      zIndex: 10,
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: '200px',
                      padding: '0',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      cursor: 'pointer',
                      padding: '0.75rem 1.25rem',
                      backgroundColor: state.isSelected 
                        ? 'var(--primary-bg)' 
                        : state.isFocused 
                          ? 'var(--background)' 
                          : undefined,
                      color: state.isSelected ? 'var(--primary)' : 'var(--text)',
                      '&:hover': {
                        backgroundColor: 'var(--primary-bg)',
                      },
                      '&:not(:last-child)': {
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'var(--border)',
                      }
                    }),
                  }}
                />
                <input 
                  type="hidden" 
                  {...register('brandId', { required: 'Marca é obrigatória' })} 
                />
                {errors.brandId && <ErrorMessage>{errors.brandId.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="description">Descrição</Label>
              <TextArea id="description" placeholder="Digite uma descrição para o produto" {...register('description')} />
            </FormGroup>
          </MainContent>

          <SideContent>
            <FormGroup>
              <Label>Imagem do Produto</Label>
              <ToggleContainer>
                <ToggleButton type="button" active={!useImageUrl} onClick={toggleImageInputType}>
                  Upload de arquivo
                </ToggleButton>
                <ToggleButton type="button" active={useImageUrl} onClick={toggleImageInputType}>
                  URL da imagem
                </ToggleButton>
              </ToggleContainer>
            </FormGroup>

            {!useImageUrl && (
              <>
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }}
                />
                <div onClick={() => document.getElementById('image')?.click()} style={{cursor: 'pointer'}}>
                  <ImagePreviewWrapper useImageUrl={useImageUrl}>
                    <ImagePreview hasImage={!!imagePreview}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" />
                      ) : (
                        <UploadPlaceholder>
                          <svg>...</svg>
                          <span>Clique para selecionar uma imagem</span>
                        </UploadPlaceholder>
                      )}
                    </ImagePreview>
                  </ImagePreviewWrapper>
                </div>
              </>
            )}
            
            {useImageUrl && (
              <>
                <FormGroup>
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input 
                    id="imageUrl" 
                    type="text" 
                    placeholder="Cole a URL da imagem aqui" 
                    {...register('image')} 
                  />
                </FormGroup>
                
                <ImagePreviewWrapper useImageUrl={useImageUrl}>
                  <ImagePreview hasImage={!!imagePreview}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" />
                    ) : (
                      <UploadPlaceholder>
                        <svg>...</svg>
                        <span>Prévia da imagem</span>
                      </UploadPlaceholder>
                    )}
                  </ImagePreview>
                </ImagePreviewWrapper>
              </>
            )}

            <ImageTip>
              {useImageUrl ? '' : 'Recomendado: Imagem com fundo transparente ou branco'}
            </ImageTip>
          </SideContent>
        </Form>

        <ButtonContainer>
          <Button type="submit" disabled={loading} onClick={handleSubmit(onSubmit)}>
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </Button>
        </ButtonContainer>
      </FormSection>
    </FormContainer>
  );
}