# SaberAngola - Plataforma de Geração de Documentos Acadêmicos

Uma plataforma moderna para estudantes universitários angolanos criarem documentos acadêmicos profissionais de forma rápida e eficiente.

## 📋 Estrutura do Projeto (Monorepo)

Este é um **monorepo** com 3 serviços principais:

\`\`\`
saberangola/
├── frontend/        # Next.js (Vercel) — V0 trabalha aqui ✨
├── backend/         # Django (Render) — APIs privadas
├── worker/          # Cloudflare Worker — API Gateway
├── infra/           # Automação e deploys
└── docs/            # Documentação oficial
\`\`\`

**V0 só tem acesso ao `/frontend`**. Veja `.v0ignore` para detalhes.

## 🚀 Funcionalidades

- **Landing Page**: Apresentação profissional da plataforma com FAQ interativo
- **Autenticação**: Login/Signup com Supabase Auth
- **Modelos**: Biblioteca de templates acadêmicos (monografias, TFC, CVs, cartas formais)
- **Documentos**: Formulário dinâmico de preenchimento para geração de PDFs
- **Studio**: Editor premium para personalização avançada
- **Dashboard**: Gestão de conta, histórico e pagamentos
- **Perfil**: Configurações, planos e métodos de pagamento
- **Guia do Usuário**: Tutoriais e documentação

## 🛠️ Tecnologias

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, React 18, Tailwind CSS v4, Shadcn/UI |
| Backend | Django 4.2, Django REST Framework, Celery |
| Gateway | Cloudflare Workers |
| Database | PostgreSQL (Supabase) |
| Storage | R2 (Cloudflare) |
| Auth | Supabase Auth (JWT) |
| Cache | Redis (Upstash) |

## 📦 Quick Start

### Frontend

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
\`\`\`

Acesso em `http://localhost:3000`

### Backend (local simulation)
\`\`\`bash
# Requer Python 3.11+
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`

### Worker (local simulation)
\`\`\`bash
cd worker
npm install
npm run dev
\`\`\`

Acesso em `http://localhost:8787`

## 🔌 Integração com Backend

**NUNCA fazer:**
\`\`\`typescript
// ❌ ERRADO
fetch('http://localhost:8000/api/...')
\`\`\`

**SEMPRE fazer:**
\`\`\`typescript
// ✅ CORRETO
import { api } from '@/lib/api';
await api.post('/documentos/gerar', { dados });
\`\`\`

O ficheiro `lib/api.ts` passa por `https://api.saberangola.com` (Cloudflare Worker).

## 🌐 Deploy

O projeto está otimizado para deploy na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente necessárias
3. Deploy automático a cada push para `main`

### Variáveis de Ambiente

\`\`\`env
# Frontend (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_KEY=...
NEXT_PUBLIC_API_URL=https://api.saberangola.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

## 📁 Estrutura do Frontend

\`\`\`
frontend/
├── app/                    # Pages (Next.js 13+ app router)
│   ├── page.tsx           # Landing / homepage
│   ├── auth/              # Login, signup, reset
│   ├── dashboard/         # Area protegida
│   ├── documentos/        # Catálogo & editor
│   ├── perfil/            # User settings
│   ├── modelos/           # Biblioteca de modelos
│   ├── guia/              # Tutoriais
│   └── layout.tsx         # Root layout
│
├── components/            # Componentes React
│   ├── ui/                # Shadcn components
│   ├── landing/           # Landing page sections
│   ├── modelos/           # Document models
│   └── navigation/        # Header, footer
│
├── hooks/                 # Custom hooks
│   ├── useAuth.ts         # Auth state
│   ├── useDocuments.ts    # Documents state
│   └── usePayment.ts      # Payment state
│
├── lib/                   # Utilities
│   ├── api.ts             # API calls
│   ├── supabaseClient.ts  # Supabase setup
│   ├── storage.ts         # File uploads
│   └── authGuard.tsx      # Protected routes
│
├── types/                 # TypeScript types
├── services/              # Business logic
├── public/                # Static files
└── styles/                # CSS global
\`\`\`

## 🎨 Design System

- **Cores**: Azul profissional (#2563EB), Laranja destacado (#F97316), Grays neutros
- **Tipografia**: Inter (headings & body), Fira Code (código)
- **Componentes**: Sistema consistente com Shadcn/UI
- **Responsividade**: Mobile-first design
- **Animações**: Framer Motion para transições suaves

## 📚 Documentação

- **[PROJECT_RULES.md](./docs/PROJECT_RULES.md)** — Regras obrigatórias do projeto
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — Design do sistema com diagramas
- **[API_DESIGN.md](./docs/API_DESIGN.md)** — Especificação de endpoints
- **[SYSTEM_DESIGN.md](./docs/SYSTEM_DESIGN.md)** — Decisões técnicas
- **[README_V0.md](./README_V0.md)** — Contexto específico para V0 AI

## 🔐 Segurança

- JWT validation no Worker
- RLS policies no Supabase
- Secrets no `.env.local` (never committed)
- HTTPS everywhere

## ✅ Checklist de Desenvolvimento

- [ ] Sem console.log() de debug
- [ ] TypeScript sem erros
- [ ] Responsive design (mobile first)
- [ ] Acessibilidade (alt text, ARIA)
- [ ] Performance (lazy loading, code splitting)
- [ ] Sem secrets no código

## 👥 Contribuindo

1. Leia [PROJECT_RULES.md](./docs/PROJECT_RULES.md)
2. Crie branch: `git checkout -b feature/frontend/<name>`
3. Commit com descrição clara
4. Push e abra PR

## 📞 Suporte

- Issues no GitHub
- Documentação em `/docs`
- Contato: support@saberangola.com

## 📄 Licença

© 2025-2025 SaberAngola. Todos os direitos reservados.
