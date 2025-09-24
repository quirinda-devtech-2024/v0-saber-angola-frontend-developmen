# Estrutura Detalhada Frontend - SaberAngola (Next.js)

## 1. Estrutura Base do Projeto

### 1.1. Diretório Raiz
```
frontend/
├── .env
├── .env.development
├── .env.production
├── .eslintrc.js
├── .prettierrc
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── public/
    ├── favicon.ico
    ├── manifest.json
    ├── robots.txt
    └── assets/
        ├── images/
        ├── icons/
        └── fonts/
```

Justificativa: Configuração base do Next.js com TypeScript, TailwindCSS e ferramentas de desenvolvimento.

### 1.2. Componentes Base
```
src/components/
├── layout/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── UserMenu.tsx
│   │   ├── NotificationsDropdown.tsx
│   │   └── styles.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   ├── FooterLinks.tsx
│   │   └── styles.module.css
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── SidebarMenu.tsx
│   │   └── styles.module.css
│   └── MainLayout.tsx
├── common/
│   ├── buttons/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   └── LinkButton.tsx
│   ├── forms/
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── RadioGroup.tsx
│   │   └── FormWrapper.tsx
│   ├── feedback/
│   │   ├── Alert.tsx
│   │   ├── Toast.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   └── display/
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Avatar.tsx
│       └── Tabs.tsx
└── shared/
    ├── SEO.tsx
    ├── ErrorBoundary.tsx
    └── Providers.tsx
```

Justificativa: Componentes reutilizáveis organizados por função.

### 1.3. Módulos de Funcionalidades

#### 1.3.1. Módulo de Autenticação
```
src/modules/auth/
├── components/
│   ├── LoginForm/
│   │   ├── LoginForm.tsx
│   │   ├── validation.ts
│   │   └── styles.module.css
│   ├── RegisterForm/
│   │   ├── RegisterForm.tsx
│   │   ├── validation.ts
│   │   └── styles.module.css
│   └── ForgotPassword/
│       ├── ForgotPasswordForm.tsx
│       └── ResetPasswordForm.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useProtectedRoute.ts
├── services/
│   └── authService.ts
├── types/
│   └── auth.types.ts
└── utils/
    └── authUtils.ts
```

Justificativa: Gerenciamento completo de autenticação e autorização.

#### 1.3.2. Módulo de Documentos
```
src/modules/documents/
├── components/
│   ├── DocumentList/
│   │   ├── DocumentList.tsx
│   │   ├── DocumentCard.tsx
│   │   ├── DocumentFilter.tsx
│   │   └── styles.module.css
│   ├── DocumentForm/
│   │   ├── DocumentForm.tsx
│   │   ├── FormFields.tsx
│   │   └── validation.ts
│   ├── DocumentPreview/
│   │   ├── Preview.tsx
│   │   ├── Controls.tsx
│   │   └── styles.module.css
│   └── DocumentGeneration/
│       ├── GenerationForm.tsx
│       ├── OptionsPanel.tsx
│       └── ProgressBar.tsx
├── hooks/
│   ├── useDocument.ts
│   ├── useDocumentGeneration.ts
│   └── useDocumentValidation.ts
├── services/
│   └── documentService.ts
├── store/
│   ├── documentSlice.ts
│   └── selectors.ts
└── types/
    └── document.types.ts
```

Justificativa: Gerenciamento completo de documentos e templates.

#### 1.3.3. Módulo de Faturação
```
src/modules/billing/
├── components/
│   ├── Plans/
│   │   ├── PlanList.tsx
│   │   ├── PlanCard.tsx
│   │   └── PlanComparison.tsx
│   ├── Checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── PaymentMethods.tsx
│   │   └── Summary.tsx
│   └── Invoices/
│       ├── InvoiceList.tsx
│       ├── InvoiceDetail.tsx
│       └── InvoiceGeneration.tsx
├── hooks/
│   ├── useBilling.ts
│   └── useSubscription.ts
├── services/
│   └── billingService.ts
└── types/
    └── billing.types.ts
```

Justificativa: Gestão de pagamentos e assinaturas.

### 1.4. Pages e Rotas

```
src/app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
├── auth/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── reset-password/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── loading.tsx
├── documents/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── [id]/
│   │   ├── page.tsx
│   │   └── edit/
│   │       └── page.tsx
│   └── new/
│       └── page.tsx
├── billing/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── plans/
│   │   └── page.tsx
│   └── invoices/
│       └── page.tsx
└── studio/
    ├── layout.tsx
    ├── page.tsx
    └── [documentId]/
        └── page.tsx
```

Justificativa: Estrutura de rotas organizada e intuitiva.

### 1.5. Estado Global e Store

```
src/store/
├── index.ts
├── middleware.ts
├── features/
│   ├── auth/
│   │   ├── authSlice.ts
│   │   └── selectors.ts
│   ├── documents/
│   │   ├── documentsSlice.ts
│   │   └── selectors.ts
│   └── billing/
│       ├── billingSlice.ts
│       └── selectors.ts
└── hooks/
    └── store.hooks.ts
```

Justificativa: Gerenciamento de estado centralizado com Redux Toolkit.

### 1.6. Serviços e APIs

```
src/services/
├── api/
│   ├── axios.ts
│   ├── interceptors.ts
│   └── endpoints.ts
├── storage/
│   └── localStorage.ts
└── analytics/
    └── analytics.ts
```

Justificativa: Configuração e gestão de chamadas API.

### 1.7. Utilitários e Helpers

```
src/utils/
├── format/
│   ├── date.ts
│   ├── currency.ts
│   └── text.ts
├── validation/
│   ├── schemas.ts
│   └── rules.ts
├── helpers/
│   ├── array.ts
│   └── object.ts
└── constants/
    ├── routes.ts
    ├── config.ts
    └── types.ts
```

Justificativa: Funções utilitárias compartilhadas.

## 2. Componentes Principais

### 2.1. Studio de Documentos
```typescript
// src/modules/studio/components/DocumentStudio.tsx
export const DocumentStudio: React.FC<DocumentStudioProps> = ({
  documentId,
  template,
}) => {
  /**
   * Componente principal do studio de edição.
   * Permite personalização avançada de documentos.
   */
  return (
    <StudioLayout>
      <StudioToolbar />
      <StudioCanvas>
        <DocumentPreview />
        <EditingTools />
      </StudioCanvas>
      <StudioSidebar>
        <TemplateOptions />
        <StyleControls />
      </StudioSidebar>
    </StudioLayout>
  );
};
```

### 2.2. Geração de Documentos
```typescript
// src/modules/documents/components/DocumentGeneration/GenerationForm.tsx
export const GenerationForm: React.FC = () => {
  /**
   * Formulário principal para geração de documentos.
   * Suporta múltiplos tipos e templates.
   */
  return (
    <Form>
      <DocumentTypeSelector />
      <TemplateSelector />
      <FieldsSection />
      <PreviewSection />
      <GenerationOptions />
      <SubmitButton />
    </Form>
  );
};
```

### 2.3. Checkout e Pagamentos
```typescript
// src/modules/billing/components/Checkout/CheckoutForm.tsx
export const CheckoutForm: React.FC<CheckoutProps> = ({
  plan,
  price,
}) => {
  /**
   * Formulário de checkout para assinaturas e pagamentos.
   * Integração com Multicaixa Express.
   */
  return (
    <CheckoutContainer>
      <PlanSummary />
      <PaymentMethods />
      <BillingDetails />
      <PaymentButton />
    </CheckoutContainer>
  );
};
```

## 3. Hooks Personalizados

### 3.1. Gestão de Documentos
```typescript
// src/modules/documents/hooks/useDocument.ts
export const useDocument = (documentId: string) => {
  /**
   * Hook para gerenciar estado e operações de documentos.
   * Inclui cache e otimizações.
   */
  return {
    document,
    isLoading,
    error,
    updateDocument,
    deleteDocument,
    generateDocument,
  };
};
```

### 3.2. Autenticação
```typescript
// src/modules/auth/hooks/useAuth.ts
export const useAuth = () => {
  /**
   * Hook para gerenciar estado de autenticação.
   * Inclui refresh token e persistência.
   */
  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    resetPassword,
  };
};
```

## 4. Estilos e Tema

### 4.1. Configuração TailwindCSS
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... outras variações
        },
        // ... outras cores
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      // ... outras extensões
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### 4.2. Componentes Estilizados
```typescript
// src/components/ui/Button/Button.tsx
export const Button = styled.button`
  ${({ variant = 'primary' }) => variants[variant]}
  ${({ size = 'md' }) => sizes[size]}
  // ... outros estilos
`;
```

## 5. Otimizações e Performance

### 5.1. Carregamento Dinâmico
```typescript
// src/modules/documents/components/DocumentPreview.tsx
const DocumentViewer = dynamic(() => import('./Viewer'), {
  loading: () => <PreviewSkeleton />,
  ssr: false,
});
```

### 5.2. Memoização
```typescript
// src/modules/documents/components/DocumentList.tsx
export const DocumentList = memo(({ documents }) => {
  // Renderização otimizada de listas
  return documents.map(doc => (
    <DocumentCard key={doc.id} document={doc} />
  ));
});
```

## 6. Integração com Backend

### 6.1. Configuração Axios
```typescript
// src/services/api/axios.ts
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores
api.interceptors.request.use(addAuthToken);
api.interceptors.response.use(handleResponse, handleError);
```

### 6.2. Serviços de API
```typescript
// src/services/api/documents.ts
export const documentsApi = {
  async generate(data: GenerationData) {
    const response = await api.post('/documents/generate', data);
    return response.data;
  },
  
  async getDocument(id: string) {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },
  // ... outros métodos
};
```

## 7. Testes

### 7.1. Configuração de Testes
```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // ... outras configurações
};
```

### 7.2. Exemplos de Testes
```typescript
// src/modules/documents/components/__tests__/DocumentForm.test.tsx
describe('DocumentForm', () => {
  it('should validate required fields', () => {
    render(<DocumentForm />);
    // ... testes
  });

  it('should handle form submission', async () => {
    // ... testes
  });
});
```

## 8. Considerações de Implementação

### 8.1. Performance
- Lazy loading de componentes pesados
- Otimização de imagens
- Caching de dados
- Code splitting automático
- Prefetching de rotas

### 8.2. SEO
- Meta tags dinâmicas
- Sitemap automático
- Structured data
- Open Graph tags
- Twitter cards

### 8.3. Acessibilidade
- ARIA labels
- Navegação por teclado
- Contraste de cores
- Mensagens de erro
- Focus management

### 8.4. Segurança
- CSRF tokens
- XSS protection
- Content Security Policy
- Secure headers
- Input sanitization

## 9. Monitoramento e Analytics

### 9.1. Métricas
- Web vitals
- Tempo de carregamento
- Taxa de erro
- Interações do usuário
- Conversões

### 9.2. Error Tracking
- Error boundaries
- Logging de erros
- Monitoramento de performance
- Alertas automáticos

## 10. CI/CD

### 10.1. GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      # ... steps de deploy
```

### 10.2. Scripts de Build
```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "analyze": "ANALYZE=true next build"
  }
}
```
