# 🔧 SYSTEM_DESIGN.md — Decisões Técnicas

## Por que essa stack?

### Frontend: Next.js 14 + Vercel
- **Pro**: Deploy automático, Serverless functions, Analytics
- **Con**: Vendor lock-in (mitigado com code portability)

### Backend: Django + Render
- **Pro**: ORM robusto, comunidade grande, fácil de escalar
- **Con**: Overhead inicial (mitigado com Docker)

### API Gateway: Cloudflare Worker
- **Pro**: Latência ultra-baixa (edge computing), R2 integrado
- **Con**: Ambiente restrito (mitigado com lógica clara)

### Database: Supabase (PostgreSQL)
- **Pro**: Real-time subscriptions, Auth integrado, RLS policies
- **Con**: Costs com escala (mitigado com caching no Worker)

### Storage: R2
- **Pro**: $5/month S3-compatible, integrado com Worker
- **Con**: Vendor lock-in (fácil migrate para AWS S3)

## Trade-offs

| Decisão | Trade-off | Justificativa |
|---------|-----------|---------------|
| Monorepo | Complexidade inicial | Facilita colaboração, deploys sincronizados |
| Celery + Redis | Dependency extra | Permite tarefas long-running sem timeout |
| JWT no Worker | Duplicação de validação | Performance (não vai ao backend toda a vez) |
| RLS Policies | SQL complexo | Segurança no DB, não apenas app logic |

## Escalabilidade

\`\`\`
MVP (Hoje)
├── Frontend: 1 Vercel instance
├── Backend: 1 Render instance
├── Worker: 1 Cloudflare account
└── DB: Supabase starter ($25/month)

Growth (1000 users)
├── Frontend: ✓ Unchanged (Vercel auto-scales)
├── Backend: +1 Reserve instance
├── Worker: ✓ Unchanged (edge = unlimited)
└── DB: → Supabase pro ($150/month)

Scale (10k+ users)
├── Frontend: ✓ Unchanged
├── Backend: +Kubernetes cluster (optional)
├── Worker: ✓ Unchanged
└── DB: +read replicas
\`\`\`

---

**Decisões tomadas**: Novembro 2025
