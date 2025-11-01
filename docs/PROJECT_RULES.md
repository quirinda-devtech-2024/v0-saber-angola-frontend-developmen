# 📋 PROJECT_RULES.md — Regras Obrigatórias do SaberAngola

## 1. Estrutura do Repositório

Este é um **monorepo** com três serviços principais:

- **`/frontend`** → Next.js na Vercel (V0 trabalha aqui)
- **`/backend`** → Django no Render (APIs privadas)
- **`/worker`** → Cloudflare Worker (API Gateway)

## 2. Fluxo de Dados

\`\`\`
Frontend (Next.js) 
  ↓ (HTTPS)
API Gateway (Cloudflare Worker)
  ↓
Backend (Django + Celery)
  ↓
R2 (Storage) + Supabase (DB)
\`\`\`

## 3. Responsabilidades

### Frontend (`/frontend`)
- ✅ UI/UX com React + Tailwind + Shadcn
- ✅ Autenticação com Supabase
- ✅ Integração com Worker via `lib/api.ts`
- ✅ Hooks para estado compartilhado (useAuth, useDocuments, usePayment)
- ❌ Nunca chamar backend diretamente
- ❌ Nunca expor secrets no código

### Worker (`/worker`)
- ✅ Roteador de requisições
- ✅ Autenticação via JWT (Supabase)
- ✅ Cache estratégico
- ✅ Upload/Download com R2
- ❌ Nunca conter lógica de negócio pesada

### Backend (`/backend`)
- ✅ Geração de documentos (PDF)
- ✅ Processamento de pagamentos
- ✅ Filas de tarefas (Celery)
- ✅ Validação de dados
- ❌ Nunca expor ao frontend diretamente

## 4. Variáveis de Ambiente

### Frontend (`.env.local`)
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_KEY=...
NEXT_PUBLIC_API_URL=https://api.saberangola.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### Worker (`wrangler.toml`)
\`\`\`
BACKEND_URL=https://backend.render.com
SUPABASE_URL=...
R2_BUCKET=...
\`\`\`

### Backend (`settings.py`)
\`\`\`
ALLOWED_HOSTS=["backend.render.com"]
CELERY_BROKER_URL=redis://upstash...
DATABASE_URL=postgresql://...
\`\`\`

## 5. Integração V0 + Backend

### Não fazer:
\`\`\`typescript
// ❌ ERRADO
const response = await fetch('https://backend.com/api/...');
\`\`\`

### Fazer:
\`\`\`typescript
// ✅ CORRETO
import { api } from '@/lib/api';
const response = await api.post('/documentos/gerar', { ...dados });
\`\`\`

## 6. Deploy

- **Frontend**: Vercel (automático com cada push a `main`)
- **Backend**: Render (automático com cada push a `main`)
- **Worker**: Cloudflare (manual ou com CI/CD)

## 7. Comunicação entre Devs e IA

- Use `/frontend/README_V0.md` para contexto do V0
- Use `/docs/api_design.md` para design de APIs
- Use `/docs/system_design.md` para decisões arquiteturais

---

**Última atualização**: Novembro 2025
