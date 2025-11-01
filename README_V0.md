# 📘 README_V0.md — Contexto para V0 AI

Este ficheiro contém **regras e contexto essencial** para o V0 trabalhar corretamente no SaberAngola.

## ✨ Acessos do V0

✅ **Pode editar**:
- `/frontend/**` — Tudo aqui é seu território
- Criar novas páginas, componentes, hooks
- Adicionar dependências (com cuidado)

❌ **Não pode editar**:
- `/backend/**` — Django fica para humanos
- `/worker/**` — Cloudflare fica para humanos
- `/infra/**` — Deployments ficam para humanos
- `/docs/**` — Documentação oficial

Ver `.v0ignore` para configuração técnica.

## 🎯 Objetivos Principais

1. **Landing Page Profissional** ✓ Completa
2. **Autenticação com Supabase** ✓ Em progresso
3. **Dashboard Utilizador** ✓ Em progresso
4. **Catálogo de Modelos** ✓ Em progresso
5. **Editor de Documentos** ⏳ Próximo

## 🔌 Integração Backend

### Como chamar o backend

**NUNCA fazer:**
\`\`\`typescript
// ❌ ERRADO — vai quebrar em produção
fetch('http://localhost:8000/api/...')
\`\`\`

**SEMPRE fazer:**
\`\`\`typescript
// ✅ CORRETO
import { api } from '@/lib/api';
await api.post('/documentos/gerar', { dados });
\`\`\`

O ficheiro `lib/api.ts` passa por `https://api.saberangola.com` (Cloudflare Worker).

## 📦 Dependências Permitidas

**Seguras e estáveis:**
- React & Next.js
- Tailwind CSS
- Shadcn/UI
- Framer Motion
- React Hook Form
- Zod
- SWR ou TanStack Query

**Evitar:**
- Libs experimentais (< v1.0)
- Múltiplas libs para mesma coisa
- CSS-in-JS (temos Tailwind)

## 🎨 Design System

### Cores
- **Primary**: Azul profissional (#2563EB)
- **Secondary**: Laranja destacado (#F97316)
- **Neutral**: Grays escala (#1F2937 a #F9FAFB)

Ver `app/globals.css` para tokens CSS.

### Tipografia
- **Headings**: Inter (700)
- **Body**: Inter (400)
- **Code**: Fira Code (400)

### Componentes
Use Shadcn/UI sempre. Ver `/components/ui/` para disponíveis.

## 🗂️ Estrutura de Ficheiros (Frontend)

\`\`\`
frontend/
├── app/                    # Pages (Next.js 13+ app router)
│   ├── page.tsx           # Landing / homepage
│   ├── auth/              # Login, signup, reset
│   ├── dashboard/         # Area protegida
│   ├── documentos/        # Catálogo & editor
│   ├── perfil/            # User settings
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

## 🔄 Fluxo de Desenvolvimento

1. Recebe pedido do utilizador
2. Lê ficheiros relevantes
3. Entende a estrutura
4. Cria/edita componentes
5. Testa no preview
6. Commit automático ao git

## 🐛 Debug

Se algo quebra:
1. Vê console errors no preview
2. Verifica imports
3. Valida TypeScript
4. Tenta recarregar página
5. Se persistir, avisa o utilizador

## 📊 Endpoints Disponíveis

Backend expõe via Worker em `api.saberangola.com`:

- `POST /api/auth/login` — Autenticação
- `POST /api/documentos/gerar` — Gera documento
- `GET /api/documentos/{id}` — Status
- `GET /api/planos` — Lista planos
- `POST /api/pagamentos` — Cria pagamento

Ver `docs/API_DESIGN.md` para especificação completa.

## ✅ Checklist Antes de Commitar

- [ ] Sem console.log() de debug
- [ ] TypeScript sem erros
- [ ] Responsive design (mobile first)
- [ ] Acessibilidade (alt text, ARIA)
- [ ] Performance (lazy loading, code splitting)
- [ ] Sem secrets no código

---

**Última atualização**: Novembro 2025
**V0 Version**: Latest
