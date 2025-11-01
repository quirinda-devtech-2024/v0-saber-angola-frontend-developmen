# 🏗️ ARCHITECTURE.md — Design do Sistema SaberAngola

## Visão Geral

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vercel)                        │
│              Next.js 14 + Tailwind + Shadcn                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              CLOUDFLARE WORKER (API Gateway)                 │
│   - JWT Validation (Supabase)                                │
│   - Request Routing                                          │
│   - Response Caching                                         │
│   - R2 Integration                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
    ┌────────┐    ┌──────────┐    ┌──────────┐
    │Backend │    │Supabase  │    │R2 Storage│
    │Django  │    │EdgeFn    │    │Cloudflare│
    │Render  │    │Auth      │    │          │
    └────────┘    └──────────┘    └──────────┘
\`\`\`

## Camadas

### 1. Apresentação (Frontend)
- Landing Page + Autenticação
- Dashboard do Utilizador
- Catálogo de Modelos
- Editor de Documentos
- Histórico e Gestão de Ficheiros

**Tech**: React 18, Tailwind CSS v4, Shadcn/UI, Framer Motion

### 2. API Gateway (Cloudflare Worker)
- Valida JWTs
- Roteia requisições
- Cacheia respostas frequentes
- Faz upload para R2

**Tech**: Cloudflare Workers, Hono.js (opcional)

### 3. Lógica de Negócio (Backend)
- Geração de PDFs
- Processamento de Pagamentos
- Filas de Tarefas (Celery)
- Validação Complexa

**Tech**: Django, Django REST Framework, Celery, Redis (Upstash)

### 4. Persistência
- **Utilizadores & Autenticação**: Supabase Auth
- **Dados Estruturados**: PostgreSQL (Supabase)
- **Ficheiros Gerados**: R2 (Cloudflare)
- **Fila de Tarefas**: Redis (Upstash)

## Fluxo de Geração de Documentos

\`\`\`
1. Utilizador enche formulário (Frontend)
   ↓
2. Frontend chama POST /api/documentos/gerar
   ↓
3. Worker valida JWT e roteia para backend
   ↓
4. Backend cria Task no Celery
   ↓
5. Celery Worker gera PDF + envia para R2
   ↓
6. Backend actualiza BD com status
   ↓
7. Frontend poll /api/status/<id> até completar
   ↓
8. Utilizador vê download link pronto
\`\`\`

## Autenticação & Autorização

\`\`\`
Frontend (login/signup)
  ↓
Supabase Auth (JWT gerado)
  ↓
Worker (valida JWT no header)
  ↓
Backend (recebe user_id do JWT)
  ↓
RLS Policies (PostgreSQL protege dados)
\`\`\`

## Deployment Strategy

| Serviço | Host | Trigger | Downtime |
|---------|------|---------|----------|
| Frontend | Vercel | Git push main | 0s (edge) |
| Worker | Cloudflare | Manual + CI | 0s (global) |
| Backend | Render | Git push main | ~30s |
| Database | Supabase | Manual | 0s (managed) |
| Cache | Upstash | Managed | 0s |

---

**Design finalizado em**: Novembro 2025
