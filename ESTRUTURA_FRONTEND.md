# Estrutura do Frontend - SaberAngola (Next.js)

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Estrutura de Pastas](#2-estrutura-de-pastas)
3. [Componentes](#3-componentes)
4. [Páginas e Rotas](#4-páginas-e-rotas)
5. [Estado Global](#5-estado-global)
6. [Hooks Customizados](#6-hooks-customizados)
7. [Serviços e API](#7-serviços-e-api)
8. [Estilos e UI](#8-estilos-e-ui)
9. [Utilitários](#9-utilitários)
10. [Configurações](#10-configurações)

---

## 1. Visão Geral

### 1.1. Tecnologias Principais

- **Next.js 14**: Framework React com SSR/SSG
- **TypeScript**: Tipagem estática
- **TailwindCSS**: Estilização
- **Shadcn/ui**: Componentes base
- **Zustand**: Gerenciamento de estado
- **React Query**: Cache e gerenciamento de estado servidor
- **Axios**: Cliente HTTP
- **Jest + Testing Library**: Testes
- **ESLint + Prettier**: Linting e formatação

### 1.2. Arquitetura

```plaintext
[Pages/Components] → [Hooks] → [Services] → [API]
         ↓
    [Global State]
         ↓
  [UI Components]
```

---

## 2. Estrutura de Pastas

```plaintext
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   ├── atualizacoes/
│   ├── documentos/
│   ├── guia/
│   ├── modelos/
│   ├── perfil/
│   └── studio/
├── components/
│   ├── common/
│   ├── forms/
│   ├── layout/
│   ├── modals/
│   └── ui/
├── hooks/
│   ├── useAuth.ts
│   ├── useDocuments.ts
│   ├── usePayments.ts
│   └── useUser.ts
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── documents.ts
│   └── payments.ts
├── stores/
│   ├── authStore.ts
│   ├── documentStore.ts
│   └── uiStore.ts
├── styles/
│   ├── globals.css
│   └── components.css
├── types/
│   ├── api.ts
│   ├── documents.ts
│   └── user.ts
└── utils/
    ├── api.ts
    ├── date.ts
    ├── format.ts
    └── validation.ts
```

---

## 3. Componentes

### 3.1. Componentes de Layout

```typescript
// components/layout/Header.tsx
export function Header() {
  const { user } = useAuth();
  const { toggleTheme } = useTheme();

  return (
    <header className="bg-primary">
      <nav className="container mx-auto">
        <Logo />
        <MainMenu />
        {user ? (
          <UserMenu user={user} />
        ) : (
          <AuthButtons />
        )}
        <ThemeToggle onClick={toggleTheme} />
      </nav>
    </header>
  );
}

// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <FooterSection title="Sobre">
            <FooterLink href="/sobre">Nossa História</FooterLink>
            <FooterLink href="/contato">Contato</FooterLink>
          </FooterSection>
          {/* Mais seções */}
        </div>
      </div>
    </footer>
  );
}
```

### 3.2. Componentes de Formulário

```typescript
// components/forms/DocumentForm.tsx
interface DocumentFormProps {
  onSubmit: (data: DocumentFormData) => Promise<void>;
  initialData?: Document;
}

export function DocumentForm({ onSubmit, initialData }: DocumentFormProps) {
  const form = useForm<DocumentFormData>({
    defaultValues: initialData,
    resolver: zodResolver(documentSchema)
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Outros campos */}
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
```

### 3.3. Componentes de UI

```typescript
// components/ui/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// components/ui/DataTable.tsx
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
}

export function DataTable<T>({ data, columns, loading }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (loading) return <TableSkeleton />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* Renderização das linhas */}
        </TableBody>
      </Table>
    </div>
  );
}
```

---

## 4. Páginas e Rotas

### 4.1. Estrutura de App Router

```typescript
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

// app/documentos/page.tsx
export default async function DocumentosPage() {
  return (
    <div className="container mx-auto">
      <h1>Documentos</h1>
      <DocumentList />
    </div>
  );
}

// app/documentos/[id]/page.tsx
export default async function DocumentoDetalhesPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto">
      <DocumentViewer id={params.id} />
    </div>
  );
}
```

### 4.2. Loading e Error States

```typescript
// app/documentos/loading.tsx
export default function Loading() {
  return <DocumentsSkeleton />;
}

// app/documentos/error.tsx
export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto">
      <ErrorDisplay
        error={error}
        resetError={reset}
      />
    </div>
  );
}
```

---

## 5. Estado Global

### 5.1. Store de Autenticação

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const response = await authService.login(credentials);
    set({
      user: response.user,
      isAuthenticated: true
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false
    });
  },
  updateUser: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null
    }));
  }
}));
```

### 5.2. Store de UI

```typescript
// stores/uiStore.ts
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    })),
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen
    }))
}));
```

---

## 6. Hooks Customizados

### 6.1. Hook de Autenticação

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const { user, login, logout } = useAuthStore();
  const router = useRouter();

  const loginWithRedirect = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao fazer login');
    }
  };

  const logoutWithRedirect = () => {
    logout();
    router.push('/');
  };

  return {
    user,
    isAuthenticated: !!user,
    login: loginWithRedirect,
    logout: logoutWithRedirect
  };
}
```

### 6.2. Hook de Documentos

```typescript
// hooks/useDocuments.ts
export function useDocuments() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['documents'],
    queryFn: documentsService.list
  });

  const createMutation = useMutation({
    mutationFn: documentsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['documents']);
      toast.success('Documento criado');
    }
  });

  return {
    documents: data,
    isLoading,
    error,
    createDocument: createMutation.mutate
  };
}
```

---

## 7. Serviços e API

### 7.1. Cliente HTTP

```typescript
// services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
});

// Interceptor para tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch {
        // Logout se refresh falhar
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);
```

### 7.2. Serviços

```typescript
// services/documents.ts
export const documentsService = {
  list: async () => {
    const { data } = await api.get<Document[]>('/documents');
    return data;
  },

  create: async (document: CreateDocumentDTO) => {
    const { data } = await api.post<Document>('/documents', document);
    return data;
  },

  update: async (id: string, document: UpdateDocumentDTO) => {
    const { data } = await api.put<Document>(`/documents/${id}`, document);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/documents/${id}`);
  }
};
```

---

## 8. Estilos e UI

### 8.1. Configuração do Tailwind

```typescript
// tailwind.config.ts
import { type Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0070f3",
          dark: "#0761d1",
        },
        // ... mais cores
      },
      // ... outras extensões
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
```

### 8.2. Componentes Base

```typescript
// components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // ... mais variantes
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

---

## 9. Utilitários

### 9.1. Formatação e Validação

```typescript
// utils/format.ts
export const formatters = {
  currency: (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(value);
  },
  
  date: (date: string | Date) => {
    return new Intl.DateTimeFormat('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  }
};

// utils/validation.ts
export const schemas = {
  document: z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10),
    type: z.enum(['pdf', 'docx', 'xlsx'])
  }),
  
  user: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)/)
  })
};
```

### 9.2. Helpers

```typescript
// utils/api.ts
export const apiHelpers = {
  handleError: (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || 'Erro na requisição',
        status: error.response?.status
      };
    }
    return {
      message: 'Erro desconhecido',
      status: 500
    };
  },
  
  buildQueryString: (params: Record<string, any>) => {
    return Object.entries(params)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  }
};
```

---

## 10. Configurações

### 10.1. Next.js Config

```typescript
// next.config.mjs
import { env } from "./env.mjs"

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      'saberangola-assets.s3.amazonaws.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/documentos',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },
}

export default config
```

### 10.2. Configuração de Environment

```typescript
// env.mjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
})
```

---

Este documento fornece uma visão detalhada da estrutura do frontend do SaberAngola, incluindo organização de código, componentes, hooks, serviços, e configurações. Use como referência para manter a consistência e boas práticas no desenvolvimento frontend.