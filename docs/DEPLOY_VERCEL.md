# Deploy na Vercel - SaberAngola

## 1. Configuração Inicial

### 1.1. Requisitos
- Conta na Vercel (login com GitHub)
- Repositório do projeto no GitHub
- Node.js versão LTS instalada
- Vercel CLI (opcional para desenvolvimento)

### 1.2. Estrutura de Arquivos Necessários
```
frontend/
├── .vercel/            # Gerado automaticamente
├── vercel.json         # Configuração do deploy
├── next.config.mjs     # Configuração do Next.js
├── package.json        # Dependências e scripts
└── public/            # Arquivos estáticos
```

### 1.3. Configuração do vercel.json
```json
{
  "version": 2,
  "buildCommand": "pnpm run build",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["fra1"],  // Frankfurt - mais próximo de Angola
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.saberangola.ao"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://api.saberangola.ao/api/$1"
    }
  ]
}
```

## 2. Preparação do Projeto

### 2.1. Otimizações para Produção

#### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Otimizado para deploy
  compress: true,        // Compressão Gzip
  poweredByHeader: false,// Remove X-Powered-By
  images: {
    domains: [
      'storage.saberangola.ao',
      'cdn.saberangola.ao'
    ],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizeCss: true,  // Minificação CSS
    turbo: true         // Compilação mais rápida
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

export default nextConfig
```

### 2.2. Variáveis de Ambiente

#### .env.production
```env
NEXT_PUBLIC_API_URL=https://api.saberangola.ao
NEXT_PUBLIC_STORAGE_URL=https://storage.saberangola.ao
NEXT_PUBLIC_CDN_URL=https://cdn.saberangola.ao
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXX-Y
```

### 2.3. Scripts de Build
```json
{
  "scripts": {
    "vercel-build": "pnpm run build",
    "build": "next build",
    "analyze": "ANALYZE=true next build",
    "postbuild": "next-sitemap"
  }
}
```

## 3. Processo de Deploy

### 3.1. Deploy Automático (CI/CD)

#### Configuração do GitHub Actions
```yaml
# .github/workflows/vercel-deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]  # Deploy automático na main
  pull_request:
    branches: [main]  # Preview deployments em PRs

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run tests
        run: pnpm test
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          vercel-args: '--prod'
```

### 3.2. Configuração de Domínios

#### DNS Records
```text
# Configuração no provedor DNS
saberangola.ao     CNAME   cname.vercel-dns.com
www.saberangola.ao CNAME   cname.vercel-dns.com
api.saberangola.ao A       <backend-ip>
cdn.saberangola.ao CNAME   cname.vercel-dns.com
```

## 4. Monitoramento e Performance

### 4.1. Analytics e Monitoramento

#### Vercel Analytics Setup
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 4.2. Métricas de Performance
- Core Web Vitals
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## 5. Cache e CDN

### 5.1. Configuração de Cache

#### Cache-Control Headers
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Cache público para recursos estáticos
  if (request.nextUrl.pathname.startsWith('/static/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Cache para API responses
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=600'
    );
  }

  return response;
}
```

### 5.2. Edge Functions
```typescript
// app/api/documents/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // Lógica executada na edge
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60',
    },
  });
}
```

## 6. Segurança

### 6.1. Headers de Segurança
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self' https: 'unsafe-inline'"
  );

  return response;
}
```

## 7. Escalabilidade

### 7.1. Auto-scaling
- Configuração automática baseada em tráfego
- Distribuição global via Edge Network
- Load balancing automático

### 7.2. Otimizações de Build
```json
{
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "builds": [
    {
      "src": "next.config.mjs",
      "use": "@vercel/next"
    }
  ]
}
```

## 8. Recuperação de Desastres

### 8.1. Backup e Rollback
- Versões anteriores mantidas
- Rollback com um clique
- Logs de deploy preservados

### 8.2. Monitoramento de Saúde
```typescript
// app/api/health/route.ts
export async function GET() {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  return new Response(JSON.stringify(healthcheck), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## 9. Workflows de Deploy

### 9.1. Ambiente de Desenvolvimento
1. Desenvolvimento local com `vercel dev`
2. Push para feature branch
3. Preview deployment automático
4. Testes e review
5. Merge para main

### 9.2. Ambiente de Produção
1. Merge para main dispara deploy
2. Testes automatizados
3. Build otimizado
4. Deploy para edge network
5. Verificações de saúde
6. Monitoramento contínuo

## 10. Checklist de Deploy

### 10.1. Pré-deploy
- [ ] Testes passando
- [ ] Variáveis de ambiente configuradas
- [ ] Otimizações de build ativadas
- [ ] Headers de segurança configurados
- [ ] Rotas API testadas

### 10.2. Pós-deploy
- [ ] Verificar métricas de performance
- [ ] Confirmar SSL/TLS
- [ ] Testar redirecionamentos
- [ ] Verificar integração com backend
- [ ] Monitorar logs de erro

## 11. Manutenção Contínua

### 11.1. Monitoramento Regular
- Revisão diária de métricas
- Análise de logs
- Verificação de performance
- Atualizações de dependências
- Backups regulares

### 11.2. Atualizações
- Patches de segurança
- Atualizações do Next.js
- Otimizações de performance
- Melhorias de configuração
- Atualizações de dependências